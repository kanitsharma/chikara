import { compose } from 'ramda';
import { select } from 'redux-most';
import { fromPromise, merge, of } from 'most';
import { Map, Chain, Action, Concat } from '../../futils/curried';
import actionSpreader from '../../futils/actionSpreader';
import fetch from 'node-fetch';

const Latest = 'https://mangaflux-api.herokuapp.com/latest/0/20';
const Popular = 'https://mangaflux-api.herokuapp.com/list/0/20';

const fetchManga = url => fetch(url).then(res => res.json());

const manga$ = a =>
  compose(
    Map(Action(a)),
    fromPromise,
    fetchManga
  );

const latest$ = manga$('FETCHED_LATEST');
const popular$ = manga$('FETCHED_POPULAR');

const sendAction$ = (l, p) =>
  compose(
    Concat(of(actionSpreader('LOADER_ON'))),
    Concat(merge(popular$(p), latest$(l))),
    _ => of(actionSpreader('LOADER_OFF'))
  );

const fetchData = compose(
  Chain(sendAction$(Latest, Popular)),
  select('FETCH_INIT')
);

export default fetchData;
