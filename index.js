const express = require('express');

//* Instantiate express app
const app = express();

//* Define server port
const PORT = 4000;

//* Start listening to the request on the defined port
app.get('/', (request, response) => {
  response.send('Express + Typescript Server');
});


app.listen(PORT, () => {
  console.log(`Server Running at: http://localhost:${PORT}`);
});
