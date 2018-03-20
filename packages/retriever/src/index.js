import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import { binder as B } from '@elementary/proper';

import routes from './routes';
import serverConfig from './config';
import responseFactory from './factories/response';
import requestFactory from './factories/request';
import connectDB from './factories/connectdb';

// Initialize the Express App
const app = new Express();

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

connectDB(config.mongo, app).then((appWithDb) => {
  B()
    .add(responseFactory)
    .add(requestFactory)
    .invoke(app)
    .use(routes);

  appWithDb.listen(serverConfig.port, (error) => {
    if (error) {
      console.log('Something Went Wrong');
      return;
    }
    console.log(`Server running at ${serverConfig.port}`);
  });
});

export default app;
