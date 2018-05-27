import requestPromise from 'request-promise';

const MANGAINFOURL = 'https://www.mangaeden.com/api/manga/';
const CHAPTERURL = 'https://www.mangaeden.com/api/chapter/';
const MANGALISTURL = 'https://www.mangaeden.com/api/list/0/';

const requestFactory = app => app.use((req, res, next) => {
  res.requestManga = url => requestPromise(MANGAINFOURL + url).then(x => JSON.parse(x));
  res.requestChapter = url => requestPromise(CHAPTERURL + url).then(x => JSON.parse(x));
  res.requestMangaList = _ => requestPromise(MANGALISTURL).then(JSON.parse);
  next();
});

export default requestFactory;
