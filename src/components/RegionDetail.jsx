import { useParams } from '@solidjs/router';
import Navigation from './Navigation';

const RegionDetail = () => {
  const params = useParams();

  return (
    <div>
      <Navigation />
      <h1>{decodeURIComponent(params.name)} Region</h1>
      <p>Fish details TBD</p>
    </div>
  );
};

export default RegionDetail;
