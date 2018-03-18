import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import { binder } from '@elementary/proper';

import upgradeAppWithMongoose from './bootstrap/mongoose';
import upgradeAppWithResponse from './bootstrap/response';

import routes from './routes';
import serverConfig from './config';
// Initialize the Express App
const app = new Express();

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

binder()
  .add(upgradeAppWithMongoose)
  .add(upgradeAppWithResponse).invoke(app)
  .use(routes);

// start app
app.connectThenListen(serverConfig.port, (error) => {
  if (error) {
    console.log('Something Went Wrong, Precisely:', error.message);
    return;
  }
  console.log(`Server running at ${serverConfig.port}`);
});

export default app;
