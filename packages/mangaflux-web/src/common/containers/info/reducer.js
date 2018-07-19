import reducer from '../../futils/createreducer';

const ACTION_HANDLERS = {
  SET_INFO_ID: (s, a) => ({ ...s, currentId: a.payload })
};

const initialState = {
  currentId: null
};

export default reducer(initialState, ACTION_HANDLERS);
