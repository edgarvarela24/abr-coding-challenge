import { fetchFishData } from '../services/api';
import {
  calculateRegionStats,
  groupFishByRegion,
} from '../utils/dataProcessing';
import Navigation from './Navigation';
import { createMemo, createResource } from 'solid-js';
import { A } from '@solidjs/router';

const Home = () => {
  const [fishData] = createResource(fetchFishData);
  const regionStats = createMemo(() => {
    if (!fishData()) return [];
    const grouped = groupFishByRegion(fishData());
    return calculateRegionStats(grouped);
  });
  return (
    <div>
      <Navigation />
      <main>
        <h1>Select a Region</h1>
        <p>
          Choose the best region for ABR headquarters based on fish nutrition
        </p>

        <Show when={!fishData.loading} fallback={<div>Loading...</div>}>
          <div class="regions-grid">
            <For each={regionStats()}>
              {(region) => (
                <A
                  href={`/region/${encodeURIComponent(region.name)}`}
                  class="region-card"
                >
                  <h2>{region.name}</h2>
                  <p>Average Calories: {region.avgCalories.toFixed(1)}</p>
                  <p>Average Fat: {region.avgFat.toFixed(2)}g</p>
                  <p>{region.fishCount} fish species</p>
                </A>
              )}
            </For>
          </div>
        </Show>
      </main>
    </div>
  );
};

export default Home;
