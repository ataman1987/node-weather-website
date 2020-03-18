const weatherForm = document.querySelector("form"); //Łapiemy form
const search = document.querySelector("input"); //Łapiemy input, zebyśmy późmniej mogli pobrac jego wartość
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageTwo.textContent = "";

weatherForm.addEventListener("submit", e => {
  e.preventDefault(); // zapobiega przed refreshem strony po submitcie forma

  const location = search.value;

  const weatherUrl = `/weather?address=${location}`;
  messageOne.textContent = "Fetching data in progress ...";
  messageTwo.textContent = "";

  fetch(weatherUrl).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
