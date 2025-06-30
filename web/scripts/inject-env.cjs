try {
  console.log("Starting inject-env.js");

  const fs = require("fs");
  const path = require("path");

  const DOMAIN = process.env.DOMAIN || "localhost";
  const SUBDOMAIN = process.env.RABBIT_WS_SUBDOMAIN || "mqtt";
  const MQTTURL = `${SUBDOMAIN}.${DOMAIN}`;

  console.log("Environment variables:", { DOMAIN, SUBDOMAIN, MQTTURL });

  const env = {
    DOMAIN,
    SUBDOMAIN,
    MQTTURL,
  };

  const output = `window.RUNTIME_ENV = ${JSON.stringify(env, null, 2)};`;

  const outputPath = path.resolve("/app/public/runtime-env.js");
  console.log("Writing runtime-env.js to:", outputPath);

  // Make sure the directory exists before writing
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    console.log(`Directory does not exist, creating: ${dir}`);
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(outputPath, output);
  console.log("✅ Injected runtime-env.js successfully.");
} catch (error) {
  console.error("❌ Error in inject-env.js:", error);
  process.exit(1);
}
