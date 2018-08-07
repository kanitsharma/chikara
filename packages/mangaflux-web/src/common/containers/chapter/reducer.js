import reducer from '../../futils/createreducer';

const ACTION_HANDLERS = {
  FETCHED_CHAPTER: (s, a) => ({
    ...s,
    images: [...a.payload.images].reverse(),
  }),
};

const initialState = {
  images: [],
};

export default reducer(initialState, ACTION_HANDLERS);
