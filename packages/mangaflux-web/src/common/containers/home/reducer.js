import createReducer from '../../futils/createreducer';

const initialState = {
  latest: [],
  baseImg: 'http://cdn.mangaeden.com/mangasimg/',
  showLoader: true,
};

const actionHandlers = {
  LATEST: (s, a) => ({ ...s, latest: a.payload, showLoader: false }),
};

export default createReducer(initialState, actionHandlers);
