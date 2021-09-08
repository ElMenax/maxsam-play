const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const parseBeers = (beers, weather) => {
  return beers
    .filter((b) =>
      weather.weather_state_abbr === 'hc' ? b.abv >= 6 : b.abv < 6
    )
    .map((item) => ({
      id: item.id,
      name: item.name,
      image: item.image_url,
      alcohol: item.abv,
    }));
};

app.get('/beers', (req, res) => {
  const beersPromise = axios.get('https://api.punkapi.com/v2/beers');

  const weatherPriomise = axios.get(
    'https://www.metaweather.com/api/location/906057/'
  );

  Promise.all([beersPromise, weatherPriomise]).then(
    ([beersPayload, weatherPayload]) => {
      const beers = beersPayload.data;
      const weather = weatherPayload.data.consolidated_weather[0];

      return res.json(parseBeers(beers, weather));
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
