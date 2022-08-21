<script lang="ts">
  import { onMount } from "svelte";
  import { scaleLinear } from "d3-scale";
  import { select } from "d3-selection";

  export let data: Array<Object>;

  const height = 400;
  const margin = 40;

  let width = 450;

  $: xScale = scaleLinear()
    .domain([0, 25])
    .range([margin, width - margin]);

  $: yScale = scaleLinear()
    .domain([0, 25])
    .range([height - margin, margin]);

  //$: radiusScale = scaleLinear().range([2, 10]);

  const reveal = (node, { duration }) => {
    const radius = select(node).attr("r");
    return {
      duration,
      tick: (t) => select(node).attr("r", t * radius),
    };
  };

  onMount(() => {
    //drawChart();
    //window.addEventListener("resize", drawChart);
  });
</script>

<div class="scatter-plot max-w-lg " bind:clientWidth={width}>
  {#if width}
    <svg {width} {height}>
      {#each data as d}
        <circle
          cx={xScale(d.inputs[0])}
          cy={yScale(d.inputs[1])}
          r={5}
          fill={d.expectedOutputs[0] > 0 ? "red" : "blue"}
          in:reveal={{ duration: 1000 }}
        />
      {/each}
    </svg>
  {/if}
</div>
