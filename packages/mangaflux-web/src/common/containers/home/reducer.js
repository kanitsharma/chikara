import createReducer from '../../futils/createreducer';

const initialState = {
  latest: [],
};

const actionHandlers = {
  LATEST: (s, a) => ({ ...s, latest: a.payload }),
};

export default createReducer(initialState, actionHandlers);
