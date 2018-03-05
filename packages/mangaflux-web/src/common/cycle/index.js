import { combineCycles } from 'redux-cycles';

import homeCycle from '../containers/home/cycle'

export default combineCycles(
  homeCycle,
);
