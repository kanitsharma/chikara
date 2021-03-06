import { compose, identity, __ as _, toLower } from "ramda";
import { select } from "redux-most";
import { fromPromise } from "most";
import { Chain, Action, Debounce } from "../../futils/curried";
import actionSpreader from "../../futils/actionSpreader";

const Search = "https://mangaflux-api-yrqjezvkxz.now.sh/search";

const fetchManga = url => action =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      keywords: action.payload
        .trim()
        .split(" ")
        .map(toLower)
    })
  })
    .then(res => res.json())
    .then(Action("FETCHED_MANGA"))
    .catch(_ => actionSpreader("NOT_FOUND"));

const manga$ = compose(
  fromPromise,
  fetchManga(Search)
);

const fetchData = compose(
  Chain(manga$),
  Debounce(500),
  select("SEARCH_MANGA")
);

export default fetchData;
