const getListFromDB = (start, limit) =>
  new Promise((resolve, reject) => {
    const list = global.db.collection("list");
    const cursor = list.find(
      {},
      {
        data: { $slice: [parseInt(start), parseInt(limit)] },
        "data.t": 1,
        "data.im": 1,
        "data.i": 1,
        "data.h": 1,
        "data.ld": 1
      }
    );
    resolve(cursor.next());
  });

module.exports = getListFromDB;
