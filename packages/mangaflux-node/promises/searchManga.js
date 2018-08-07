const searchManga = keys =>
  new Promise(resolve => {
    const cursor = global.db.collection("detailedList").find(
      { title_kw: keys },
      {
        title: 1,
        description: 1,
        categories: 1,
        image: 1,
        author: 1,
        status: 1
      }
    );
    resolve(cursor.next());
  });

module.exports = { searchManga };
