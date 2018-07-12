import { curry } from 'ramda';
import { map, chain, concat } from 'most';
import actionSpreader from '../futils/actionSpreader';

export const cmap = curry(map);
export const cchain = curry(chain);
export const action = curry(actionSpreader);
export const cconcat = curry(concat);
