<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import Slider from "./lib/Slider.svelte";
  import Chart from "./lib/Chart.svelte";
  import { weight1, weight2, data } from "./store";
</script>

<main class="max-w-screen-xl m-auto">
  <div class="inline-flex">
    <Chart data={$data.temp_data} />
    <div>
      <Slider value={$weight1} />
      <Slider value={$weight2} />
    </div>
  </div>
</main>
