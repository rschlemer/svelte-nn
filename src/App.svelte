<script lang="ts">
  import { weight1, weight2, data } from "./store";
  import Slider from "./charts/Slider.svelte";
  import Chart from "./charts/Chart.svelte";
  import LineChart from "./charts/LineChart.svelte";
  import AreaChart from "./charts/AreaChart.svelte";
</script>

<main class="max-w-screen-xl m-auto">
  <div class="inline-flex">
    <AreaChart />
    <!-- <Chart data={$data.temp_data} /> -->
    <div>
      <!-- <Slider value={$weight1} /> -->
      <!-- <Slider value={$weight2} /> -->
    </div>
  </div>
  <!-- <LineChart /> -->
</main>
