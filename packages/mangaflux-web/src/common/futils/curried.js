import { curry } from "ramda";
import { map, chain } from "most";
import actionSpreader from "../futils/actionSpreader";

export const cmap = curry(map);
export const cchain = curry(chain);
export const action = curry(actionSpreader);
