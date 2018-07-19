import { curry } from 'ramda';
import { map, chain, concat } from 'most';
import actionSpreader from '../futils/actionSpreader';

export const Map = curry(map);
export const Chain = curry(chain);
export const Action = curry(actionSpreader);
export const Concat = curry(concat);
