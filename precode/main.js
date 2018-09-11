
//js file in case I can't do it in Python
const fetch = require('node-fetch')
const key = "827cb0f86be6d0f872e35b6151c99e6c";

const getUrl = (lat, lng) =>
  `https://api.darksky.net/forecast/${key}/${lat},${lng}`;

fetch(getUrl(37.8267, -122.4233), { credentials: "same-origin" })
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.log(err));
