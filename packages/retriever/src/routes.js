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
    // const savedCats = await Promise.all(uniqCat.map(x => savingPromise(new Category({ t: x }))));
    // res.create(savedCats).success().send();
    res.create('Done 🦑').success().send();
  } catch (e) {
    res.create().internalerror().send();
  }
});

router.route('/fillartists').get(async (req, res) => {
  const cursor = res.db().collection('list')
    .find(
      {},
    );
  const response = await cursor.next().then(x => x.data.map(y => y.i));
  fs.appendFileSync('artists.chikara', `${response.join('\n')}`);
  console.log('Got DB Response');
  console.log(response.length);
  // const manga = await res.requestManga(response[0]);
  // const reducedResponse = () => response.shrink(30).reduce((acc, x, i) => acc.then(_ =>
  //   Promise.all(x.map((y) => {
  //     console.log('Getting Info for', y);
  //     return res.requestManga(y).then(xx => xx.artist);
  //   })).then((ay) => {
  //     console.log('Saving Artists', ay);
  //     return fs.appendFileSync('artists.chikara', `\n${ay.join('\n')}`);
  //   })).then(___ => wait(100)).then(___ => console.log('Round', (i + 1) * 30)),
  // Promise.resolve());

  try {
    res.create('Done 🦑').success().send();
  } catch (e) {
    console.log(e);
    res.create().internalerror().send();
  }
});

router.route('/manga/:mangaId').get(async (req, res) => {
  const response = await res.requestManga(req.params.mangaId);
  res.create(response).success().send();
});

export default router;
