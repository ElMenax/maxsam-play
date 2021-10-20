import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css';
import BeerList from './components/BeerList';
import { BeerOfTheDay } from './components/BeerOfTheDay';
import BeerContext from './context/beers';
import { useBeerApi } from './hooks/beer-api';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

const BeerApp = () => {
  const { data, loading, error } = useBeerApi();

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error while fetching beers...</div>;

  return (
    <BeerContext.Provider value={data.beers}>
      <BeerList />
      <BeerOfTheDay />
    </BeerContext.Provider>
  );
};

function App() {
  return (
    <ApolloProvider client={client}>
      <BeerApp />
    </ApolloProvider>
  );
}

export default App;
