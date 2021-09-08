import { useEffect, useState } from 'react';

export const useBeerApi = () => {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    const fetchMyBeers = async () => {
      return await fetch('http://localhost:3001/beers');
    };

    fetchMyBeers()
      .then((payload) => payload.json())
      .then(
        (payload) => setBeers(payload),
        (error) => console.log('Something went wrong')
      );
  }, []);

  return { beers };
};
