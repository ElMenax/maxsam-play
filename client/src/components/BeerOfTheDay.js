import React from 'react';
import { useBeerByWeatherApi } from '../hooks/beer-of-the-day-api';

export const BeerOfTheDay = () => {
  const { beerOfTheDay, loading, error } = useBeerByWeatherApi();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error while fetching beer of the day...</div>;

  return (
    <div>
      <h2>Today we suggest you this beer:</h2>
      <p>Name: {beerOfTheDay.name}</p>
      <p>Alcohol level: {beerOfTheDay.alcohol}</p>
      <img src={beerOfTheDay.image.url} alt="beer" height="300px" />
    </div>
  );
};
