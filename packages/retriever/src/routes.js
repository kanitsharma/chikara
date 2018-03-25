import { Router } from 'express';
import { flatMap, binder as B } from '@elementary/proper';
import { uniq2, savingPromise, wait } from './utils';
import Category from './schemas/category';

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
  try {
    const savedCats = await Promise.all(uniqCat.map(x => savingPromise(new Category({ t: x }))));
    res.create(savedCats).success().send();
  } catch (e) {
    res.create().internalerror().send();
  }
});

router.route('/fillartists').get(async (req, res) => {
  // const cursor = res.db().collection('list')
  //   .find(
  //     {},
  //   );
  // const response = await cursor.next().then(x => x.data.map(y => y.i));
  // // const manga = await res.requestManga(response);
  // const reducedResponse = await Promise.all(response.shrink(10).map(async (x) => {
  //   try {
  //     console.log('Fetching for ', ...x);
  //     await wait(10000);
  //     // const lowerPromises = await Promise.all(x.map(y => res.requestManga(y)));
  //     return x;
  //   } catch (e) {
  //     console.log('Failed for ', ...x);
  //     return x;
  //   }
  // }));
  await Promise.all([1, 2, 3, 4, 5].map(async (x) => {
    await wait(10000);
    console.log(x);
    return x;
  }));

  try {
    res.create('Yay').success().send();
  } catch (e) {
    res.create().internalerror().send();
  }
});

export default router;
