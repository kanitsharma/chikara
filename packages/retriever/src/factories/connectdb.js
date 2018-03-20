import { MongoClient } from 'mongodb';

const connectDB = (url, app) => (
  new Promise((resolve, reject) => (
    MongoClient.connect(url, (err, db) => {
      if (err) {
        reject(err);
      }
      console.log('connected');
      app.use((req, res, next) => {
        res.db = () => db;
        next();
      });
      resolve(app);
    })
  ))
);

export default connectDB;
