const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/bee2bc0e83b50fcb05ff942b4cd2fb08/${latitude},${longitude}?lang=pl&units=si`;

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback("Unable to connecto to weather service", undefined);
    } else if (body.error) {
      callback("Unable to connecto to weather service", undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} Aktualnie temperatura to ${body.currently.temperature} stopni Celsjusza. Ciśnienie atmosferyczne wynosi ${body.currently.pressure} hPa. Prawdopodobieństwo wystąpienia opadów wynosi ${body.currently.precipProbability}%. Prędkość wiatru ${body.currently.windSpeed} m/s`
        // console.log(body.daily.data[0])
      );
    }
  });
};

module.exports = forecast;
