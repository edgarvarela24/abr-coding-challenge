import { useParams } from '@solidjs/router';
import Navigation from './Navigation';

const RegionDetail = ({ fishData }) => {
  const params = useParams();

  return (
    <div>
      <Navigation fishData={fishData} />
      <h1>{decodeURIComponent(params.name)} Region</h1>
      <p>Fish details TBD</p>
    </div>
  );
};

export default RegionDetail;
