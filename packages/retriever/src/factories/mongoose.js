import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const upgradeAppWithMongoose = (app) => {
  // eslint-disable-next-line
  app.connectThenListen = (port, errorCB) => mongoose.connect(config.mongo)
    .then(() => {
      app.listen(port, errorCB);
    }, errorCB);
  return app;
};

export default upgradeAppWithMongoose;
