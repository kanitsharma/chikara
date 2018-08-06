import reducer from '../../futils/createreducer';

const ACTION_HANDLERS = {
  FETCHED_MANGA: (s, a) => ({ ...s, fetchedManga: a.payload }),
};

const initialState = {
  fetchedManga: null,
};

export default reducer(initialState, ACTION_HANDLERS);
