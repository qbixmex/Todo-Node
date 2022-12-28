const express = require('express');

//* Instantiate express app
const app = express();

//* Define server port
const PORT = 4000;

//* Create root endpoint
app.get('/', (request, response) => {
  response.send('Express + Typescript Server');
});

//* Start listening to the request on the defined port
app.listen(PORT, () => {
  console.log(`Server Running at: http://localhost:${PORT}`);
});
