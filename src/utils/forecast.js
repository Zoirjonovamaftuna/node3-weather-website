const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "https://api.darksky.net/forecast/a671a3ae1ee876a42ae43116dfa5c73b/" +
        latitude +
        "," +
        longitude +
        "?units=si";

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location service!", undefined);
        } else if (body.error) {
            callback(
                "Unable to find forecast for this location. Try another search",
                undefined
            );
        } else {
            callback(
                undefined,
                body.daily.data[0].summary +
                " It is currently " +
                body.currently.temperature +
                " degrees out. This high is " +
                body.daily.data[0].temperatureMax +
                " with a low of " +
                body.daily.data[0].temperatureMin +
                ". There is a " +
                body.currently.precipProbability +
                "% chance of rain. Humidity: " +
                body.daily.data[0].humidity
            );
        }
    });
};

module.exports = forecast;