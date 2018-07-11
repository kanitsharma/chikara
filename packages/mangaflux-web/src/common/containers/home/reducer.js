import reducer from "../../futils/createreducer";

const ACTION_HANDLERS = {
  FETCHED_INIT: (s, a) => ({ ...s, mangaList: a.payload.manga })
};

const initialState = {
  mangaList: []
};

export default reducer(initialState, ACTION_HANDLERS);
