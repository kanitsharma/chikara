import { compose, tap, always, curryN, __ } from 'ramda';
import { select } from 'redux-most';
import { fromPromise, merge, of, concat } from 'most';
import { Map, Chain, Action } from '../../futils/curried';
import actionSpreader from '../../futils/actionSpreader';
import fetch from 'node-fetch';

const InfoAPI = 'https://www.mangaeden.com/api/manga/';
const Merge = curryN(2, merge);
const Concat = curryN(2, concat);

const fetchInfo = ({ payload }) =>
  fetch(InfoAPI + payload).then(res => res.json());

const info$ = compose(
  Map(Action('FETCHED_INFO')),
  fromPromise,
  fetchInfo
);

const sendAction$ = compose(
  Concat(__, of(actionSpreader('LOADER_OFF'))),
  Merge(__, of(actionSpreader('LOADER_ON'))),
  info$
);

const fetchData = compose(
  Chain(sendAction$),
  select('SET_INFO_ID')
);

export default fetchData;
