import { compose, __, always } from "ramda";
import { select } from "redux-most";
import { fromPromise, of } from "most";
import { Map, Chain, Action, Concat, Merge } from "../../futils/curried";
import actionSpreader from "../../futils/actionSpreader";

const Latest = "https://mangaflux-api-yrqjezvkxz.now.sh/latest/0/20";
const Popular = "https://mangaflux-api-yrqjezvkxz.now.sh/list/0/20";

const fetchManga = url => fetch(url).then(res => res.json());

const createAction$ = a => of(actionSpreader(a));

const manga$ = a =>
  compose(
    Map(Action(a)),
    fromPromise,
    fetchManga
  );

const latest$ = manga$("FETCHED_LATEST");
const popular$ = manga$("FETCHED_POPULAR");

const sendAction$ = (l, p) =>
  compose(
    Concat(__, createAction$("LOADER_OFF")),
    Merge(latest$(l)),
    Concat(__, popular$(p)),
    always(createAction$("LOADER_ON"))
  );

const fetchData = compose(
  Chain(sendAction$(Latest, Popular)),
  select("FETCH_INIT")
);

export default fetchData;
