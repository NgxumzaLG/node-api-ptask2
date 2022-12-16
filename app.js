const express = require('express');
const serverless = require('serverless-http');
const path = require('path');
const dotenv = require('dotenv');

const indexRouter = require('./routes/');
const regionsRouter = require('./routes/regions');

dotenv.config();
const app = express();
const port = process.env.PORT || '3000';

app.set('port', port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/regions', regionsRouter);

if (process.env.ENVIRONMENT === 'lambdaFunction') {
   module.exports.handler = serverless(app);
} else {
   app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
   });
}
