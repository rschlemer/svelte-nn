<script lang="ts">
  import { weight1, weight2, data } from "./store";
  import Slider from "./lib/Slider.svelte";
  import Chart from "./lib/Chart.svelte";
  import LineChart from "./lib/LineChart.svelte";
</script>

<main class="max-w-screen-xl m-auto">
  <div class="inline-flex">
    <Chart data={$data.temp_data} />
    <div>
      <Slider value={$weight1} />
      <Slider value={$weight2} />
    </div>
  </div>
  <LineChart />
</main>
