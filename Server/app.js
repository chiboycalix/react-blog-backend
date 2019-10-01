import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import logger from './Utils/logger';
import routes from './Routes';

dotenv.config();

mongoose.connect(
  `mongodb+srv://igwechinonso:${process.env.MONOGODB_ATLAS_PASSWORD}@firstcluster-q2wpy.mongodb.net/test?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
);

const db = mongoose.connection;
db.on('error', () => {
  logger.error({
    level: 'error',
    message: 'database error',
  });
});
db.once('open', () => {
  logger.log({
    level: 'info',
    message: 'successfully connected to db',
  });
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/v1', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.log({
    level: 'info',
    message: `app listening on port ${PORT}`,
  });
});
