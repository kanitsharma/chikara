import { curry, curryN } from 'ramda';
import { map, chain, concat, merge, until, debounce } from 'most';
import actionSpreader from '../futils/actionSpreader';

export const Map = curry(map);
export const Chain = curry(chain);
export const Action = curry(actionSpreader);
export const Concat = curry(concat);
export const Merge = curryN(2, merge);
export const Until = curryN(2, until);
export const Debounce = curryN(2, debounce);
