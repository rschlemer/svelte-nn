<script lang="ts">
  import { weight_1_1, weight_2_1, weight_1_2, weight_2_2 } from "./store";
  import Slider from "./charts/Slider.svelte";
  import Chart from "./charts/Chart.svelte";
  import LineChart from "./charts/LineChart.svelte";
  import AreaChart from "./charts/AreaChart.svelte";

  $: temp = $weight_2_1;
</script>

<main class="max-w-screen-xl m-auto">
  <div class="inline-flex">
    <AreaChart />
    <!-- <Chart data={$data.temp_data} /> -->
    <div>
      <Slider value={$weight_1_1} store={weight_1_1} />
      <Slider value={$weight_2_1} store={weight_2_1} />
      <!-- <Slider value={$weight_1_2} /> -->
      <!-- <Slider value={$weight_2_2} /> -->
    </div>
  </div>
  <!-- <LineChart /> -->
</main>
