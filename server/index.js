const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const axios = require('axios');
const cors = require('cors');
const { graphql, buildSchema } = require('graphql');
const camelize = require('camelize');

const app = express();
const port = 3001;

app.use(cors());

const schema = buildSchema(`
  type BeerImage {
    url: String
  }
  type Beer {
    name: String
    id: Int
    image: BeerImage
    alcohol: Float
  }
  type Weather {
    weatherStateName: String,
    applicableDate: String,
    theTemp: Float,
    predictability: Int
  }
  type Query {
    beers: [Beer]
    beer(id: Int!): Beer
    weather: Weather
    beersByWeather: [Beer]
    weatherForecast(offset: Int): Weather
  }
`);

const root = {
  beers: async () => {
    const beers = await getBeers();
    return beers;
  },
  beer: async ({ id }) => {
    const beers = await getBeers();
    return beers.find((b) => b.id === id);
  },
  weather: async () => {
    const weather = await getWeathers();

    return weather[0];
  },
  weatherForecast: async ({ offset }) => {
    if (offset < 0 || offset >= 5) {
      return null;
    }
    const weather = await getWeathers();

    return weather[offset];
  },
  beersByWeather: async () => {
    const beers = await getBeers();
    const weather = await getWeathers();

    return beers.filter((b) => {
      if (['hr', 't', 'h', 'hc'].includes(weather.weatherStateAbbr))
        return b.alcohol >= 7;
      return b.alcohol < 7;
    });
  },
};

const getBeers = () => {
  const beersPromise = axios.get('https://api.punkapi.com/v2/beers');

  return beersPromise.then(({ data }) => {
    return data.map((item) => ({
      id: item.id,
      name: item.name,
      image: { url: item.image_url },
      alcohol: item.abv,
    }));
  });
};

const getWeathers = () => {
  const weatherPriomise = axios.get(
    'https://www.metaweather.com/api/location/906057/'
  );

  return weatherPriomise.then(({ data }) => {
    return camelize(data).consolidatedWeather;
  });
};

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

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

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
