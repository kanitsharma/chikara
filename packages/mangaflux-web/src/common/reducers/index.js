import { combineReducers } from 'redux';
import home from '../containers/home/reducer';
import info from '../containers/info/reducer';
import browse from '../containers/browse/reducer';

const rootReducer = combineReducers({
  home,
  info,
  browse,
});

export default rootReducer;
