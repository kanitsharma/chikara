import { combineEpics } from "redux-most";
import homeEpic from "../containers/home/epic";

const rootEpic = combineEpics([homeEpic]);

export default rootEpic;
