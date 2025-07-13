import { A } from '@solidjs/router';
import { For, Show, createMemo } from 'solid-js';
import { getUniqueRegions } from '../utils/dataProcessing';

const Navigation = ({ fishData }) => {
  const regions = createMemo(() => {
    if (!fishData()) return [];
    return getUniqueRegions(fishData()).sort();
  });

  return (
    <nav>
      <A href="/">Home</A>
      <Show when={!fishData.loading}>
        <For each={regions()}>
          {(region) => (
            <A href={`/region/${encodeURIComponent(region)}`}>{region}</A>
          )}
        </For>
      </Show>
    </nav>
  );
};

export default Navigation;
