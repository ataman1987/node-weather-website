const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/bee2bc0e83b50fcb05ff942b4cd2fb08/${latitude},${longitude}?lang=pl`;

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback("Unable to connecto to weather service", undefined);
    } else if (body.error) {
      callback("Unable to connecto to weather service", undefined);
    } else {
      callback(
        undefined,
        `Average tem is ${body.daily.data[0].summary} It is currenlty ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
