const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const { logger } = require('./common/logger');
const DB = require('./common/db');
const User = require('./resources/users/user.model');
process.on('uncaughtException', err => {
  logger.error(`Ooops: ${err.stack}`);
});

process.on('unhandledRejection', err => {
  logger.error(`Ooops UnhandledRejection : ${err.stack}`);
});

const app = require('./app');
mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connection
  .on('error', () => logger.error('MongooseError'))
  .once('open', async () => {
    logger.info('Connected to Mongo BD');

    await mongoose.connection.collections.users.drop(() =>
      logger.info('user collection dropped')
    );

    await DB.addEntity(User, {
      login: 'admin',
      name: 'admin',
      password: 'admin'
    });

    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  });
