const { PORT } = require('./common/config');
const { errLogger } = require('./common/logger');

process.on('uncaughtException', err => {
  errLogger.error(`Ooops: ${err.message}`);
});

process.on('unhandledRejection', err => {
  errLogger.error(`Ooops UnhandledRejection : ${err}`);
});

const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
