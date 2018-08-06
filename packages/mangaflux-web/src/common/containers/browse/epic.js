import { compose, __, identity } from 'ramda';
import { select } from 'redux-most';
import { fromPromise } from 'most';
import fetch from 'node-fetch';
import { Chain, Action } from '../../futils/curried';

const Search = 'https://mangaflux-api-sxvermmfzn.now.sh/search';

const debounce = (func, wait) => {
  let timeout;
  return args =>
    new Promise(resolve => {
      clearTimeout(timeout);
      timeout = setTimeout(() => resolve(func(args)), wait);
    });
};

const fetchManga = url => action =>
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({ keywords: action.payload.split(' ') }),
  })
    .then(res => res.json())
    .then(Action('FETCHED_MANGA'))
    .catch(identity);

const manga$ = compose(
  fromPromise,
  debounce(fetchManga(Search), 500),
);

const fetchData = compose(
  Chain(manga$),
  select('SEARCH_MANGA'),
);

export default fetchData;
