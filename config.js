import Firebase from 'firebase';
let config = {
    apiKey: "API-KEY",
    authDomain: "AUTHENTICATION-DOMAIN",
    databaseURL: "DATABASE-URL",
    projectId: "PROJECT-ID",
    storageBucket: "STORAGE-BUCKET",
    messagingSenderId: "MESSAGE-SENDER-ID",
};
let app = Firebase.initializeApp(config);
export const db = app.database();
