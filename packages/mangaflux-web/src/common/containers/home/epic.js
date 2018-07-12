import { compose } from 'ramda';
import { select } from 'redux-most';
import { fromPromise, merge, of } from 'most';
import { cmap, cchain, action, cconcat } from '../../futils/curried';
import actionSpreader from '../../futils/actionSpreader';

const Latest = 'https://mangaflux-api.herokuapp.com/latest/0/20';
const Popular = 'https://mangaflux-api.herokuapp.com/list/0/20';

const fetchManga = url => fetch(url).then(res => res.json());

const manga$ = a =>
  compose(
    cmap(action(a)),
    fromPromise,
    fetchManga
  );

const latest$ = manga$('FETCHED_LATEST');
const popular$ = manga$('FETCHED_POPULAR');

const sendAction$ = (l, p) =>
  compose(
    cconcat(of(actionSpreader('LOADER_ON'))),
    cconcat(merge(popular$(p), latest$(l))),
    _ => of(actionSpreader('LOADER_OFF'))
  );

const fetchData = compose(
  cchain(sendAction$(Latest, Popular)),
  select('FETCH_INIT')
);

export default fetchData;
