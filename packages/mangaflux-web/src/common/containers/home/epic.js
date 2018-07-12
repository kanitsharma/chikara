import { compose } from 'ramda';
import { select } from 'redux-most';
import { fromPromise, zip } from 'most';
import { cmap, cchain, action } from '../../futils/curried';

const Latest = 'https://mangaflux-api.herokuapp.com/latest/0/20';
const Popular = 'https://mangaflux-api.herokuapp.com/list/0/20';

const fetchManga = url => fetch(url).then(res => res.json());

const manga$ = compose(
  fromPromise,
  fetchManga
);

const zipData = (x, y) => ({ latest: x, popular: y });

const fetchData = compose(
  cmap(action('FETCHED_INIT')),
  cchain(_ => zip(zipData, manga$(Latest), manga$(Popular))),
  select('FETCH_INIT')
);

export default fetchData;
