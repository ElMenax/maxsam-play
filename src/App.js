import './App.css';
import { useBeerApi } from './hooks/beer-api';
import BeerContext from './context/beers';
import BeerList from './components/BeerList';

function App() {
  const { beers } = useBeerApi();

  return (
    <BeerContext.Provider value={beers}>
      <BeerList />
    </BeerContext.Provider>
  );
}

export default App;
