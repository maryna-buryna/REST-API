const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const { logger } = require('./common/logger');

process.on('uncaughtException', err => {
  logger.error(`Ooops: ${err.stack}`);
});

process.on('unhandledRejection', err => {
  logger.error(`Ooops UnhandledRejection : ${err}`);
});

const app = require('./app');
mongoose.connect(MONGO_CONNECTION_STRING, {});

mongoose.connection
  .on('error', () => logger.error('MongooseError'))
  .once('open', () => {
    logger.info('Connected to Mongo BD');
    app.listen(PORT, () =>
      logger.info(`App is running on http://localhost:${PORT}`)
    );
  });

//   mongoose.connection.collections['users'].drop( function(err) {
//     console.log('collection dropped');
// });

// mongoose.connection.collections['tasks'].drop( function(err) {
//   console.log('collection dropped');
// });

// mongoose.connection.collections['boards'].drop( function(err) {
//   console.log('collection dropped');
// });
