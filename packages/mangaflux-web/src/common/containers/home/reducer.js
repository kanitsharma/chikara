import reducer from '../../futils/createreducer';

const ACTION_HANDLERS = {
  FETCHED_LATEST: (s, a) => ({
    ...s,
    latestList: a.payload.data,
    showLoader: false
  }),
  FETCHED_POPULAR: (s, a) => ({
    ...s,
    popularList: a.payload.data,
    showLoader: false
  }),
  LOADER_OFF: (s, _a) => ({ ...s, showLoader: false }),
  LOADER_ON: (s, _a) => ({ ...s, showLoader: true })
};

const initialState = {
  latestList: [],
  popularList: [],
  showLoader: false
};

export default reducer(initialState, ACTION_HANDLERS);
