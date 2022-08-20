<script lang="ts">
  import * as d3 from "d3";
  import { onMount } from "svelte";
  import { DataPoint } from "../scripts/layer.ts";

  export let data: Array<Object>;
  /*
  let chart;

  // Initialize a SVG area. (no width so can be responsive)
  const Svg = d3.select(chart).append("svg").attr("height", 200);

  // Add X axis.
  const x = d3.scaleLinear().domain([0, 10]);
  const xAxis = Svg.append("g").attr("transform", "translate(0,150)");

  // add data points as circles
  const dataPoints = Svg.selectAll("circles")
    .data(data)
    .enter()
    .append("circle")
    .style("fill", "#69b2b3")
    .attr("r", 10)
    .attr("cy", 10);

  function drawChart() {
    // get the current width of the div where the chart appear, and attribute it to Svg
    let currentWidth = parseInt(d3.select(chart).style("width"), 10);
    Svg.attr("width", currentWidth);

    console.log(d3.select(chart));

    // Update the X scale and Axis
    x.range([20, currentWidth - 20]);
    xAxis.call(d3.axisBottom(x));

    // Add the last information needed for the circles: their X position
    dataPoints.attr("cx", function (d) {
      return x(d);
    });
    
  }*/
  import { scaleLinear, scaleLog, scaleSqrt } from "d3-scale";
  import { extent } from "d3-array";
  import { select } from "d3-selection";

  //  import Axis from "./Axis.svelte";

  //export let data;

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
