import { compose } from "ramda";
import { select } from "redux-most";

// someEpic is a new function which is still awaiting one argument, the action$
const someEpic = compose(select("Test"));

export default someEpic;
