import { Route } from '@solidjs/router';
import Home from './components/Home';
import RegionDetail from './components/RegionDetail';

function App() {
  return (
    <>
      <Route path="/" component={Home} />
      <Route path="/region/:name" component={RegionDetail} />
    </>
  );
}

export default App;
