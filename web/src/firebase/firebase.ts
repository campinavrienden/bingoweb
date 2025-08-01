// Import the functions you need from the SDKs you need
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBmjq0ZGhsjC_ha8XmEZrSzhmO6x4jW3m8",
    authDomain: "bingoweb-466208.firebaseapp.com",
    projectId: "bingoweb-466208",
    storageBucket: "bingoweb-466208.firebasestorage.app",
    messagingSenderId: "922256518024",
    appId: "1:922256518024:web:1a7c20ae89524813c2283d"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);

const appcheck = initializeAppCheck(firebaseapp, {
    provider: new ReCaptchaV3Provider('6Ld8S5IrAAAAADOrGHY131Guduj-6wNEVSXyaOVS'),
    isTokenAutoRefreshEnabled: true,
});

export function useFirebase() {
    return { firebaseapp, appcheck };
}