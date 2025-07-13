import { Route } from '@solidjs/router';
import { createResource } from 'solid-js';
import Home from './components/Home';
import RegionDetail from './components/RegionDetail';
import { fetchFishData } from './services/api';

function App() {
  const [fishData] = createResource(fetchFishData);

  return (
    <>
      <Route path="/" component={() => <Home fishData={fishData} />} />
      <Route
        path="/region/:name"
        component={() => <RegionDetail fishData={fishData} />}
      />
    </>
  );
}

export default App;
