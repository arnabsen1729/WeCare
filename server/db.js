require('dotenv').config();
const firebase = require('firebase');
const sendHTMLMail = require('./email');

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DB_URL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGE,
    messagingSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.APP_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

getDataFirebase = (doc) => {
    return {
        temperature: doc.temperature,
        humidity: doc.humidity,
        pressure: doc.pressure,
        altitude: doc.altitude,
        email: doc.email,
        latitude: doc.latitude,
        longitude: doc.longitude,
    };
};

const deviceData = async (device) => {
    const resp = await db
        .collection('mlh-data')
        .where('device_id', '==', device.device_id)
        .get();
    if (resp.empty) {
        db.collection('mlh-data')
            .add({
                device_id: device.device_id,
                temperature: device.temperature,
                humidity: device.humidity,
                pressure: device.pressure,
                altitude: device.altitude,
            })
            .then((resp) => {
                console.log('Device data added with ID: ', resp.id);
            })
            .catch((err) => {
                console.log('Error: ', err);
            });
    } else {
        resp.forEach(async (document) => {
            db.collection('mlh-data')
                .doc(document.id)
                .update({
                    temperature: device.temperature,
                    humidity: device.humidity,
                    pressure: device.pressure,
                    altitude: device.altitude,
                })
                .then(() => {
                    console.log("Device data updated! ");
                });
            if (document.data().hasOwnProperty('latitude')) {
                let docVal = document.data();
                let finalData = {
                    temperature: device.temperature,
                    humidity: device.humidity,
                    pressure: device.pressure,
                    altitude: device.altitude,
                    email: docVal.email,
                    latitude: docVal.latitude,
                    longitude: docVal.longitude,
                };
                sendHTMLMail(finalData);
                console.log('SEND MAIL....');
                db.collection('mlh-data')
                    .doc(document.id)
                    .delete()
                    .then((res) => {
                        console.log('Data removed!!');
                    })
                    .catch((err) => {
                        console.log('Error: ', err);
                    });
            }
        });
    }
};

const userData = async (user) => {
    const resp = await db
        .collection('mlh-data')
        .where('device_id', '==', user.device_id)
        .get();
    if (resp.empty) {
        db.collection('mlh-data')
            .add({
                device_id: user.device_id,
                latitude: user.latitude,
                longitude: user.longitude,
                email: user.email,
            })
            .then((resp) => {
                console.log('User data added with ID: ', resp.id);
            })
            .catch((err) => {
                console.log('Error: ', err);
            });
    } else {
        resp.forEach(async (document) => {
            db.collection('mlh-data')
                .doc(document.id)
                .update({
                    latitude: user.latitude,
                    longitude: user.longitude,
                    email: user.email,
                })
                .then(() => {
                    console.log("User data updated! ");
                });
            if (document.data().hasOwnProperty('temperature')) {
                let docVal = document.data();
                let finalData = {
                    temperature: docVal.temperature,
                    humidity: docVal.humidity,
                    pressure: docVal.pressure,
                    altitude: docVal.altitude,
                    email: user.email,
                    latitude: user.latitude,
                    longitude: user.longitude,
                };
                sendHTMLMail(finalData);
                console.log('SEND MAIL....');
                db.collection('mlh-data')
                    .doc(document.id)
                    .delete()
                    .then((res) => {
                        console.log('Data removed!!');
                    })
                    .catch((err) => {
                        console.log('Error: ', err);
                    });
            }
        });
    }
};

module.exports = { deviceData, userData };
