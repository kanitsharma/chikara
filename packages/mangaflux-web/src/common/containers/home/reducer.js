import reducer from "../../futils/createreducer";

const ACTION_HANDLERS = {
  FETCHED_INIT: (s, a) => ({
    ...s,
    mangaList: a.payload.data,
    showLoader: false
  }),
  LOADER_OFF: (s, a) => ({ ...s, showLoader: false }),
  LOADER_ON: (s, a) => ({ ...s, showLoader: true })
};

const initialState = {
  mangaList: [],
  showLoader: true
};

export default reducer(initialState, ACTION_HANDLERS);
