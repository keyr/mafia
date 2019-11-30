import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyAZFDlrfAAQGv9TTiIY_E6WdBXxccwjhh0",
    authDomain: "mafia-37f83.firebaseapp.com",
    databaseURL: "https://mafia-37f83.firebaseio.com",
    projectId: "mafia-37f83",
    storageBucket: "mafia-37f83.appspot.com",
    messagingSenderId: "34413760531",
};
let app = Firebase.initializeApp(config);
export const db = app.database();