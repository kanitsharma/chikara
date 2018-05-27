import { Router } from 'express';
import fs from 'fs';
import { flatMap, binder as B } from '@elementary/proper';
import { uniq2, savingPromise, wait } from './utils';
import Category from './schemas/category';
// import Artist from './schemas/artist';

const router = new Router();

router.route('/list/:start/:limit').get(async (req, res) => {
  const cursor = res.db().collection('list')
    .find(
      {},
      { data: { $slice: [parseInt(req.params.start, 10), parseInt(req.params.limit, 10)] } },
    );
  const response = await cursor.next();
  res.create(response).success().send();
});

router.route('/latest').get(async (req, res) => {
  const cursor = res.db().collection('latest')
    .find(
      {},
    );
  const response = await cursor.next();
  res.create(response).success().send();
});

router.route('/manga/:mangaId').get(async (req, res) => {
  const response = await res.requestManga(req.params.mangaId);
  res.create(response).success().send();
});

router.route('/chapter/:chapterId').get(async (req, res) => {
  const response = await res.requestChapter(req.params.chapterId);
  console.log(response);
  res.create(response).success().send();
});

router.route('/fillcat').get(async (req, res) => {
  const cursor = res.db().collection('list')
    .find(
      {},
    );
  const response = B()
    .add(flatMap(x => x)).invoke(await cursor.next().then(x => x.data.map(y => y.c)));
  const uniqCat = uniq2(response, []);
  fs.appendFileSync('categories.chikara', `${uniqCat.join('\n')}`);
  try {
    const savedCats = await Promise.all(uniqCat.map(x => savingPromise(new Category({ t: x }))));
    res.create(savedCats).success().send();
    res.create('Done 🦑').success().send();
  } catch (e) {
    res.create().internalerror().send();
  }
});

router.route('/fillartists').get(async (req, res) => {
  const cursor = res.db().collection('list')
    .find(
      {},
      { 'data.i': 1 }
    )
  const response = await cursor.next()
    .then(x => x.data.map(y => y.i))

  const updateArtists = async (from = 0, to = 100) => {
    const mangaArtistsPromises = response
      .slice(from, to)
      .map(async x => await res.requestManga(x).then(x => x.artist).catch(console.log))

    const mangaArtistList = await Promise.all(mangaArtistsPromises)

    console.log('Saving artists', mangaArtistList)
    fs.appendFileSync('artists.chikara', `${mangaArtistList.join('\n')}`)

    wait(5000).then(updateArtists(to, to + 100))
  }

  await updateArtists()

  try {
    res.create('Done 🦑').success().send();
  } catch (e) {
    console.log(e);
    res.create().internalerror().send();
  }
});

router.route('/updateMangaList').get(async (req, res) => {
  const idList = fs.readFileSync('mangas.chikara', 'utf-8')
    .toString()
    .split('\n')
    .map(x => x.replace('\r', ''))

  const mangaList = await res.requestMangaList().then(x => x.manga)

  const idListFiltered = mangaList
    .map(x => x.i)
    .filter(x => !idList.includes(x))

  fs.appendFileSync('mangas.chikara', `${idListFiltered.join('\n')}`)

  try {
    res.create('Done 🦑').success().send();
  } catch (e) {
    console.log(e);
    res.create().internalerror().send();
  }
});

router.route('/fillmangas').get(async (req, res) => {
  const idList = fs.readFileSync('mangas.chikara', 'utf-8')
    .toString()
    .split('\n')
    .map(x => x.replace('\r', ''))

  const updateManga = async (from = 0, to = 150) => {
    console.log(from, to)
    const mangasPromises = idList
      .slice(from, to)
      .map(async x => await res.requestManga(x)
        .then(x => res.db().collection('detailedList').insert(x))
        .catch(_ => process.exit())
      )

    const mangaList = await Promise.all(mangasPromises)

    updateManga(to, to + 150)
  }
  
  const lastno = await res.db().collection('detailedList').count()
  updateManga(lastno, lastno + 150)

  try {
    res.create('Done 🦑').success().send();
  } catch (e) {
    console.log(e);
    res.create().internalerror().send();
  }
});


export default router;
