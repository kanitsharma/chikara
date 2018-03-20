if (process.env.NODE_ENV === 'development') {
  require('./scripts/start');
}

if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line import/no-unresolved
  require('./build/main');
}
