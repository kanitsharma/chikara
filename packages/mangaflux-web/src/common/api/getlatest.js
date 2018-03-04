const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const fetchLatest = callback => {
  // Rather than immediately returning, we delay our code with a timeout to simulate asynchronous behavior
  fetch('https://mangaflux-api.herokuapp.com/latest/0/20')
    .then(res => res.json())
    .then(res => callback(res))

  // In the case of a real world API call, you'll normally run into a Promise like this:
  // API.getUser().then(user => callback(user))
};
