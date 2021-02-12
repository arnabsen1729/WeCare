const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const axios = require('axios');
const { wrap } = require('module');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

getMapImageURL = (lon, lat) => {
    console.log(
        `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lon},${lat},15.25,0,60/800x800?access_token=pk.eyJ1Ijoibmlja2ZpdHoiLCJhIjoiY2p3d2g3N2F5MDZ4azQwcG12dWticDB0diJ9.qnQV5QgYN_eDwg4uUdbO6Q`
    );
    return `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${lon},${lat},15.25,0,60/800x800?access_token=pk.eyJ1Ijoibmlja2ZpdHoiLCJhIjoiY2p3d2g3N2F5MDZ4azQwcG12dWticDB0diJ9.qnQV5QgYN_eDwg4uUdbO6Q`;
};

getGoogleImage = (lon, lat) => {
    return `https://google.com/maps/?q=${lat},${lon}`;
};

getWeatherData = (lon, lat) => {
    const path = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`;
    console.log(path);
    return new Promise(function (resolve, reject) {
        axios.get(path).then(
            (response) => {
                var result = response.data;
                resolve(result);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

sendHTMLMail = async (data) => {
    var weatherData = await getWeatherData(data.longitude, data.latitude);
    let html = fs.readFileSync('email.html', { encoding: 'utf8', flag: 'r' });
    html = html.replace(
        '{{locationImageUrl}}',
        getMapImageURL(data.longitude, data.latitude)
    );
    html = html.replace(
        '{{locationUrl}}',
        getGoogleImage(data.longitude, data.latitude)
    );
    html = html.replace('{{temperature}}', data.temperature);
    html = html.replace('{{humidity}}', data.humidity);
    html = html.replace('{{pressure}}', data.pressure);
    html = html.replace('{{altitude}}', data.altitude);
    html = html.replace('{{weather}}', weatherData.weather[0].description);
    // const msg = {
    //     to: data.email,
    //     from: 'noreply.wecareu@gmail.com', // Change to your verified sender
    //     subject: 'Collected Data from WeCare',
    //     html: html,
    // };
    data.email.forEach(element => {
        const msg = {
            to: element,
            from: 'noreply.wecareu@gmail.com', // Change to your verified sender
            subject: 'Collected Data from WeCare',
            html: html,
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent');
            })
            .catch((error) => {
                console.error(error);
            });
    });

};

// const data = {
//     temperature: 50,
//     humidity: 30,
//     pressure: 1002,
//     altitude: 55,
//     email: ['ghoshrajdeep2000@gmail.com','arnabsen1729@gmail.com'],
// };
module.exports = sendHTMLMail;
