import reducer from '../../futils/createreducer';

const ACTION_HANDLERS = {
  FETCHED_MANGA: (s, a) => ({
    ...s,
    fetchedManga: a.payload,
    smallLoader: false,
    notFound: false,
  }),
  SHOW_SMALL_LOADER: (s, a) => ({ ...s, smallLoader: true, notFound: false }),
  NOT_FOUND: (s, a) => ({ ...s, smallLoader: false, notFound: true }),
  SEARCH_MANGA: (s, a) => ({
    ...s,
    notFound: false,
    smallLoader: true,
    fetchedManga: null,
  }),
};

const initialState = {
  fetchedManga: null,
  smallLoader: false,
  notFound: false,
};

export default reducer(initialState, ACTION_HANDLERS);
