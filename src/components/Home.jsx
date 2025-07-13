import {
  calculateRegionStats,
  groupFishByRegion,
} from '../utils/dataProcessing';
import { createMemo } from 'solid-js';
import Navigation from './Navigation';

const Home = ({ fishData }) => {
  const regionStats = createMemo(() => {
    if (!fishData()) return [];
    const grouped = groupFishByRegion(fishData());
    return calculateRegionStats(grouped);
  });
  return (
    <div>
      <Navigation fishData={fishData} />
      <main>
        <h1>Select a Region</h1>
        <p>
          Choose the best region for ABR headquarters based on fish nutrition
        </p>

        <Show when={!fishData.loading} fallback={<div>Loading...</div>}>
          <div class="regions-grid">
            <For each={regionStats()}>
              {(region) => (
                <div class="region-item">
                  <h2>{region.name}</h2>
                  <p>Average Calories: {region.avgCalories.toFixed(1)}</p>
                  <p>Average Fat: {region.avgFat.toFixed(2)}g</p>
                  <p>{region.fishCount} fish species</p>
                </div>
              )}
            </For>
          </div>
        </Show>
      </main>
    </div>
  );
};

export default Home;
