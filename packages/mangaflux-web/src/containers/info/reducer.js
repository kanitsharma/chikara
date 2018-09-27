import reducer from '../../futils/createreducer';

const ACTION_HANDLERS = {
  FETCHED_INFO: (s, a) => ({ ...s, currentInfo: a.payload }),
};

const initialState = {
  currentInfo: {},
};

export default reducer(initialState, ACTION_HANDLERS);
