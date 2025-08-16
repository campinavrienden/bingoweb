import * as express from 'express';
import * as mqtt from 'mqtt';
import { onInit } from 'firebase-functions/v2/core';
import * as admin from 'firebase-admin';
// import { applicationDefault } from 'firebase-admin/app'
import { getAppCheck } from 'firebase-admin/app-check';
import * as functions from 'firebase-functions';

try {
  if (!admin.apps.length) {
    admin.initializeApp(); // No args needed in Cloud Functions
    console.log('Firebase Admin initialized');
  }
  //admin.initializeApp({ credential: applicationDefault() });
} catch (e: any) {
  console.error('Firebase Admin initialization error', e);
}
const recordPath = 'bingo/current'; // Define the path to your single record

const app = express.default();
const mqttUrl = 'wss://mqtt.campinavrienden.be/ws';
const client = mqtt.connect(mqttUrl);
const topic = 'bingo';

client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

client.on('error', (err: Error) => {
  console.error('MQTT connection error:', err);
});

interface IBingo {
  max: number;
  values: number[];
}

const rtdb = admin.database();
const initialize = async () => {
  console.log("admin.firestore() succeeded");
  const docRef = await rtdb.ref(recordPath).once('value');
  console.log("RTDB docRef created");
  console.log('Project ID:', admin.app().options.projectId); // usually correct
  console.log('Database URL:', admin.app().options.databaseURL ?? 'Not set');
  try {
    const record = await docRef.val();
    console.log("Record exists?", record != null);
  }
  catch (err) {
    console.error("Error accessing Firestore:", err);
  }
}

const setDBValue = async (value: IBingo) => {
  try {
    await rtdb.ref(recordPath).set(value);
  }
  catch (err) {
    console.error("Error setting database value:", err);
  }
}

const getDBValue = async (): Promise<IBingo | null> => {
  try {
    return (await rtdb.ref(recordPath).once('value')).val();
  }
  catch (err) {
    console.error("Error setting database value:", err);
    return null;
  }
}

const sliceAPIPrefix = (req: express.Request, _: express.Response, next: express.NextFunction) => {
  const normalizedPath = req.path.replace(/^\/api/, "") || "/";
  req.url = normalizedPath;
  next();
}

const validateRequest = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.method === 'GET' && (req.path === '/' || req.path === '')) {
    return next();
  }

  const appCheckToken = req.header('X-Firebase-AppCheck');

  if (!appCheckToken) {
    res.status(401).send(`Missing App Check token on path '${req.path}'`);
    return; // ✅ explicitly return
  }

  try {
    await getAppCheck().verifyToken(appCheckToken);
    return next(); // ✅ pass control forward
  } catch (err) {
    console.error('App Check validation failed:', err);
    res.status(403).send('Invalid App Check token');
    return; // ✅ stop here
  }
}

const publish = async (record: IBingo) => {
  client.publish(topic, JSON.stringify(record), { retain: true }, (err) => {
    if (err) {
      console.error('Failed to publish message to MQTT:', err);
    } else {
      console.log(`Published updated record to topic ${topic}`);
    }
  });
}

// Helper function to get the record, creating with default values if it doesn't exist
// const getOrCreateRecord = async (): Promise<IBingo> => {
//   const docRef = db.doc(recordPath);
//   const doc = await docRef.get();

//   if (!doc.exists) {
//     const defaultRecord: IBingo = { max: -1, values: [] }; // Default values with type annotation
//     await docRef.set(defaultRecord);
//     return defaultRecord;
//   } else {
//     return doc.data() as IBingo; // Cast to IBingo type
//   }
// };

app.use(sliceAPIPrefix);
app.use(validateRequest);

app.get('/', (_: express.Request, res: express.Response) => {
  res.status(200).send('Hello from Bingo!');
})

app.get('', (_: express.Request, res: express.Response) => {
  res.status(200).send('Hello from Bingo!');
})

app.post('/bingo/start/:max', async (req: express.Request, res: express.Response) => {
  const max = parseInt(req.params.max, 10);

  if (isNaN(max) || max <= 0) {
    return res.status(400).send('Invalid max value');
  }
  const record: IBingo = { max: max, values: [] };
  await setDBValue(record)
  await publish({ max: max, values: [] })
  return res.status(200).send(`Bingo game started for maximum of ${record.max}`);
});

app.post('/bingo/stop', async (req: express.Request, res: express.Response) => {
  const record: IBingo = { max: -1, values: [] };
  await setDBValue(record)
  await publish({ max: -1, values: [] });
  res.status(200).send(`Bingo game stopped`);
});

app.post('/bingo/draw', async (_: express.Request, res: express.Response) => {
  try {
    const record = await getDBValue();

    if (record == null) {
      res.status(404).send('Record not found');
      return;
    }
    if(record.values === undefined) {
      record.values = [];
    }
    // Implement your draw logic here.
    // This is a placeholder.
    // For example, drawing a random number not already in values:
    const availableNumbers = Array.from({ length: record.max }, (_, i) => i + 1)
      .filter(num => !record.values.includes(num));

    if (availableNumbers.length === 0) {
      res.status(409).send('All numbers have been drawn');
      return;
    }

    const drawnNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
    record.values.push(drawnNumber);
    setDBValue(record);
    await publish({ max: record.max, values: record.values })
    res.status(200).json(record);
  } catch (error) {
    console.error('Error drawing number:', error);
    res.status(500).send('Error drawing number');
  }
});

onInit(initialize);

exports.api = functions.https.onRequest({
  region: 'us-central1'
}, app);
