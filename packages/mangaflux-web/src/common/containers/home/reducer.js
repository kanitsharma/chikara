import reducer from '../../futils/createreducer';

const ACTION_HANDLERS = {
  FETCHED_INIT: (s, a) => ({
    ...s,
    latestList: a.payload.latest.data,
    popularList: a.payload.popular.data,
    showLoader: false
  }),
  LOADER_OFF: (s, _a) => ({ ...s, showLoader: false }),
  LOADER_ON: (s, _a) => ({ ...s, showLoader: true })
};

const initialState = {
  latestList: [],
  popularList: [],
  showLoader: true
};

export default reducer(initialState, ACTION_HANDLERS);
