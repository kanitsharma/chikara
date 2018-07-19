import { combineReducers } from 'redux';
import home from '../containers/home/reducer';
import info from '../containers/info/reducer';

const rootReducer = combineReducers({
  home,
  info
});

export default rootReducer;
