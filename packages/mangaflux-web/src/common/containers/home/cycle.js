export default (sources) => {
  const request$ = sources.ACTION
    .filter(action => action.type === 'FETCH_LATEST')
    .map(_ => ({
      url: 'https://mangaflux-api.herokuapp.com/latest/0/10',
      category: 'latestMangas',
    }));

  const action$ = sources.HTTP
    .select('latestMangas')
    .flatten()
    .map(res => res.body.data)
    .map(x => ({ type: 'LATEST', payload: x }));

  return {
    ACTION: action$,
    HTTP: request$,
  }
}
