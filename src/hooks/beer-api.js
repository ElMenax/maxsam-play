import { useEffect, useState } from 'react';

export const useBeerApi = () => {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    const fetchMyBeers = async () => {
      return await fetch('https://api.punkapi.com/v2/beers');
    };

    fetchMyBeers()
      .then((payload) => payload.json())
      .then(
        (payload) => {
          setBeers(
            payload.map((item) => ({
              id: item.id,
              name: item.name,
              image: item.image_url,
            }))
          );
        },
        (error) => console.log('Something went wrong')
      );
  }, []);

  return { beers };
};