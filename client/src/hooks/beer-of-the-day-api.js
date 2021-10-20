import { gql, useQuery } from '@apollo/client';

const BEERS_BY_WEATHER = gql`
  query {
    beersByWeather {
      id
      name
      alcohol
      image {
        url
      }
    }
  }
`;

export const useBeerByWeatherApi = () => {
  const { loading, error, data } = useQuery(BEERS_BY_WEATHER);

  const beerOfTheDay = data
    ? data.beersByWeather[
        Math.floor(Math.random() * data.beersByWeather.length)
      ]
    : undefined;

  return { beerOfTheDay, loading, error };
};
