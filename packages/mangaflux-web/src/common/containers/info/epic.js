import { compose, tap, always, curryN } from 'ramda';
import { select } from 'redux-most';
import { fromPromise, merge, of, concat } from 'most';
import { Map, Chain, Action, Concat } from '../../futils/curried';
import actionSpreader from '../../futils/actionSpreader';
import fetch from 'node-fetch';

const InfoAPI = 'https://www.mangaeden.com/api/manga/';
const Merge = curryN(2, merge);

const fetchInfo = ({ payload }) =>
  fetch(InfoAPI + payload).then(res => res.json());

const info$ = compose(
  Map(Action('FETCHED_INFO')),
  fromPromise,
  fetchInfo
);

const sendAction$ = x =>
  compose(
    Merge(of(actionSpreader('LOADER_ON'))),
    Concat(info$(x)),
    always(of(actionSpreader('LOADER_OFF')))
  )();

const fetchData = compose(
  Chain(sendAction$),
  select('SET_INFO_ID')
);

export default fetchData;
