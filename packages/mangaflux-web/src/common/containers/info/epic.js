import { compose, __ } from 'ramda';
import { select } from 'redux-most';
import { fromPromise, of } from 'most';
import fetch from 'node-fetch';
import { Map, Chain, Action, Merge, Concat } from '../../futils/curried';
import actionSpreader from '../../futils/actionSpreader';

const InfoAPI = 'https://www.mangaeden.com/api/manga/';

const fetchInfo = ({ payload }) =>
  fetch(InfoAPI + payload).then(res => res.json());

const info$ = compose(
  Map(Action('FETCHED_INFO')),
  fromPromise,
  fetchInfo,
);

const sendAction$ = compose(
  Concat(__, of(actionSpreader('LOADER_OFF'))),
  Merge(__, of(actionSpreader('LOADER_ON'))),
  info$,
);

const fetchData = compose(
  Chain(sendAction$),
  select('SET_INFO_ID'),
);

export default fetchData;
