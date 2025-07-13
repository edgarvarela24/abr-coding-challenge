import { useParams } from '@solidjs/router';
import Navigation from './Navigation';
import { For, Show, createMemo } from 'solid-js';
import {
  getFishByRegion,
  calculateAverageCalories,
  calculateAverageFat,
} from '../utils/dataProcessing';

const RegionDetail = ({ fishData }) => {
  const params = useParams();
  const regionName = createMemo(() => decodeURIComponent(params.name));
  const regionFish = createMemo(() => {
    if (!fishData()) {
      return [];
    }
    return getFishByRegion(fishData(), regionName());
  });
  const avgCalories = createMemo(() => calculateAverageCalories(regionFish()));
  const avgFat = createMemo(() => calculateAverageFat(regionFish()));

  return (
    <div>
      <Navigation fishData={fishData} />
      <main>
        <h1>{regionName()}</h1>

        <Show when={!fishData.loading} fallback={<div>Loading...</div>}>
          <div class="region-summary">
            <p>Average Calories: {avgCalories().toFixed(1)} per serving</p>
            <p>Average Fat: {avgFat().toFixed(2)}g per serving</p>
          </div>

          <div class="fish-list">
            <For each={regionFish()}>
              {(fish) => (
                <div class="fish-item">
                  <Show when={fish.SpeciesIllustrationPhoto}>
                    <img
                      src={fish.SpeciesIllustrationPhoto.src}
                      alt={fish.SpeciesIllustrationPhoto.alt}
                    />
                  </Show>
                  <div class="fish-details">
                    <h3>{fish.SpeciesName}</h3>
                    <p>Calories: {fish.Calories || 'N/A'} per serving</p>
                    <p>Fat: {fish.FatTotal || 'N/A'}</p>
                    <Show when={fish.Taste}>
                      <div innerHTML={fish.Taste}></div>
                    </Show>
                  </div>
                </div>
              )}
            </For>
          </div>
        </Show>
      </main>
    </div>
  );
};

export default RegionDetail;
