import { compose } from "ramda";
import { select } from "redux-most";
import { fromPromise } from "most";
import { cmap, cchain, action } from "../../futils/curried";

const fetchManga = ({ payload }) =>
  fetch("https://www.mangaeden.com/api/list/0/").then(res => res.json());

const fetchData = compose(
  cmap(action("FETCHED_INIT")),
  cchain(fromPromise),
  cmap(fetchManga),
  select("FETCH_INIT")
);

export default fetchData;
