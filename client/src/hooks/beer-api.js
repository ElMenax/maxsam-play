import { gql, useQuery } from '@apollo/client';

const BEERS = gql`
  query {
    beers {
      id
      name
      alcohol
      image {
        url
      }
    }
  }
`;

export const useBeerApi = () => {
  const { loading, error, data } = useQuery(BEERS);

  return { data, loading, error };
};
