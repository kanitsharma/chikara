import { combineReducers } from 'redux';
import home from '../containers/home/reducer'

const rootReducer = combineReducers({
  home,
});

export default rootReducer;
