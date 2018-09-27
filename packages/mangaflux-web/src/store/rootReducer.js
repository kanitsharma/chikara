import { combineReducers } from 'redux';
import home from '../containers/home/reducer';
import info from '../containers/info/reducer';
import browse from '../containers/browse/reducer';
import chapter from '../containers/chapter/reducer';

const rootReducer = combineReducers({
  home,
  info,
  browse,
  chapter,
});

export default rootReducer;
