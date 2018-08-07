import { compose, __ } from 'ramda';
import { select } from 'redux-most';
import { fromPromise, of } from 'most';
import fetch from 'node-fetch';
import { Map, Chain, Action, Merge, Concat } from '../../futils/curried';
import actionSpreader from '../../futils/actionSpreader';

const InfoAPI = 'https://mangaflux-api-yrqjezvkxz.now.sh/chapter/';

const fetchInfo = ({ payload }) =>
  fetch(InfoAPI + payload).then(res => res.json());

const chapter$ = compose(
  Map(Action('FETCHED_CHAPTER')),
  fromPromise,
  fetchInfo,
);

const sendAction$ = compose(
  Concat(__, of(actionSpreader('LOADER_OFF'))),
  Merge(__, of(actionSpreader('LOADER_ON'))),
  chapter$,
);

const fetchData = compose(
  Chain(sendAction$),
  select('FETCH_CHAPTER'),
);

export default fetchData;
