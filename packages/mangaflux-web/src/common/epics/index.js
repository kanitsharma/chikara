import { combineEpics } from 'redux-most';
import homeEpic from '../containers/home/epic';
import infoEpic from '../containers/info/epic';

const rootEpic = combineEpics([homeEpic, infoEpic]);

export default rootEpic;
