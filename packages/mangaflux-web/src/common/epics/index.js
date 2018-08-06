import { combineEpics } from 'redux-most';
import homeEpic from '../containers/home/epic';
import infoEpic from '../containers/info/epic';
import browseEpic from '../containers/browse/epic';

const rootEpic = combineEpics([homeEpic, infoEpic, browseEpic]);

export default rootEpic;
