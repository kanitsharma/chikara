import { combineEpics } from 'redux-most';
import homeEpic from '../containers/home/epic';
import infoEpic from '../containers/info/epic';
import browseEpic from '../containers/browse/epic';
import chapterEpic from '../containers/chapter/epic';

const rootEpic = combineEpics([homeEpic, infoEpic, browseEpic, chapterEpic]);

export default rootEpic;
