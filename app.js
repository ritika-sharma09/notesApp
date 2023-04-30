const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const myReqLogger = require('./Utilities/requestLogger');
const route = require('./Routes/routing');

const port = process.env.PORT || 3000;
const app = express();
app.use(bodyparser.json());
app.use(myReqLogger);
app.use('/', route);

mongoose
  .connect('mongodb://localhost:27017/IntellectNotes', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) => {
    console.log('err:', err);
  });

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
