import reducer from '../../futils/createreducer';

const ACTION_HANDLERS = {
  SET_INFO_ID: (s, a) => ({ ...s, currentId: a.payload }),
  FETCHED_INFO: (s, a) => ({ ...s, currentInfo: a.payload }),
};

const initialState = {
  currentId: null,
  currentInfo: {},
};

export default reducer(initialState, ACTION_HANDLERS);
