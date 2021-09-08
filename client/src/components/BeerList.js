import React, { useContext, useReducer, useEffect } from 'react';
import BeerContext from '../context/beers';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, [action.payload]: state[action.payload] + 1 };
    case 'decrement':
      return { ...state, [action.payload]: state[action.payload] - 1 };
    case 'load':
      return action.payload.reduce(
        (acc, beer) => ({
          ...acc,
          [beer.id]: 0,
        }),
        {}
      );
    default:
      throw new Error();
  }
}

const BeerList = () => {
  const beers = useContext(BeerContext);

  const [beerCountState, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    dispatch({ type: 'load', payload: beers });
  }, [beers]);

  const handleOnClick = ({ type, beerId }) => {
    if (type === 'increment') {
      return dispatch({ type: 'increment', payload: beerId });
    } else if (type === 'decrement' && beerCountState[beerId] > 0) {
      return dispatch({ type: 'decrement', payload: beerId });
    } else {
      return () => {};
    }
  };

  return (
    <ul>
      {beers.map((beer) => (
        <li
          key={beer.id}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            marginBottom: '10px',
          }}
        >
          <div>{beer.name}</div>
          <div style={{ marginLeft: '10px' }}>
            <button
              onClick={() =>
                handleOnClick({ type: 'decrement', beerId: beer.id })
              }
            >
              -
            </button>
            {beerCountState[beer.id]}
            <button
              onClick={() =>
                handleOnClick({ type: 'increment', beerId: beer.id })
              }
            >
              +
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BeerList;
