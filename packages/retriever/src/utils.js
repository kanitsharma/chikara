export const uniq = (oldArray, uniqArray) => {
  if (oldArray.length) {
    return uniq(
      oldArray.slice(1),
      uniqArray.concat(uniqArray.includes(oldArray[0]) ? [] : oldArray[0]),
    );
  }
  return uniqArray;
};

export const uniq2 = (arr) => {
  const arr2 = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr2.includes(arr[i])) {
      continue; // eslint-disable-line
    }
    arr2.push(arr[i]);
  }
  return arr2;
};

export const savingPromise = model => (model ? new Promise((resolve, reject) => {
  model.save((err, success) => {
    if (err) {
      reject(err);
    }
    resolve(success);
  });
}) : Promise.resolve());

export const findExistingOrSavePromise = (query, model) => model.find(query, callback);

export const wait = ms => new Promise(resolve => setTimeout(() => {
  resolve();
}, ms));

export default x => x;
