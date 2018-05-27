import { Router } from 'express';
import fs from 'fs';
import { flatMap, binder as B } from '@elementary/proper';
import { uniq2, savingPromise, wait } from './utils';
import Category from './schemas/category';
import Artist from './schemas/artist';
import Manga from './schemas/manga';
import Chapter from './schemas/chapter';
import Image from './schemas/image';

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
  const categories = await res.db().collection('detailedList').distinct('categories').then(x => x.filter(y => y.length > 0))

  const categoriesPromises = categories.map(async x => await savingPromise(new Category({ t: x })))
  await Promise.all(categoriesPromises)

  try {
    res.create('Done 🦑').success().send();
  } catch (e) {
    res.create().internalerror().send();
  }
});

router.route('/fillartists').get(async (req, res) => {
  const artists = await res.db().collection('detailedList').distinct('artist').then(x => x.filter(y => y.length > 0))

  const artistsPromises = artists.map(async x => await savingPromise(new Artist({ name: x })))
  await Promise.all(artistsPromises)

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

router.route('/fillMangasWithSchema').get(async (req, res) => {
  // const idList = fs.readFileSync('mangas.chikara', 'utf-8')
  // .toString()
  // .split('\n')
  // .map(x => x.replace('\r', ''))

  const mangas = await res.db().collection('detailedList').find().limit(1).toArray()

  mangas.forEach(async x => {
    const listData = await res.db().collection('list').find({}, { data: { $elemMatch: { t: x.title } } }).next().then(x => x.data[0])
    const mangasPromises = await savingPromise(new Manga({
      a: listData.a,
      t: x.title,
      artist: new Artist({ name: x.artist }),
      cat: x.categories.map(y => new Category({ t: y })),
      created: x.created,
      description: x.description,
      hits: x.hits,
      image: x.image,
      directImage: x.imageURL,
      chapters: await Promise.all(
        x.chapters.map(async y => {
          const Images = await res.requestChapter(y[3])
          return new Chapter({
            images: Images.images.map(z => new Image({
              hash: z[1],
              height: z[3],
              width: z[2]
            })),
            releaseDate: y[1]
          })
        })
      ),
      lastChapterDate: x.last_chapter_date,
      released: x.released,
      id: listData.i
    }))    
  })

  try {
    res.create('Done 🦑').success().send();
  } catch (e) {
    console.log(e);
    res.create().internalerror().send();
  }
});


export default router;
