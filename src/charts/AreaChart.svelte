<script>
    import { scaleLinear } from "d3-scale";
    import { area, line } from "d3-shape";
    import Axis from "./Axis.svelte";
    import ScatterPlot from "./ScatterPlot.svelte";
    import temp_data from "../assets/data_test.json";
    import { lineData } from "../store";

    let data = temp_data.temp_data;

    const margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
    };

    let width = 700;
    let height = 400;

    // Calculate inner height & width based on margin
    let innerHeight = height - margin.top - margin.bottom;
    let innerWidth = width - margin.left - margin.right;

    $: xScale = scaleLinear()
        .domain([0, 25])
        .range([margin.left, innerWidth + margin.left]);
    $: yScale = scaleLinear()
        .domain([0, 25])
        .range([innerHeight + margin.top, margin.top]);

    $: path = area()
        .x(function (d) {
            return xScale(d.x);
        })
        .y0(height - margin.top)
        .y1(function (d) {
            return yScale(d.y);
        });
</script>

<div class="areaChart" bind:clientWidth={width} bind:clientHeight={height}>
    <svg {width} {height}>
        <ScatterPlot {data} {xScale} {yScale} />

        <!-- Bottom Axis -->
        <Axis {innerHeight} {margin} scale={xScale} position="bottom" />
        <text
            class="stroke-zinc-200"
            x={margin.left + 25}
            y={innerHeight + margin.top + 35}>Spot Size →</text
        >

        <!-- Left Axis -->
        <Axis {innerHeight} {margin} scale={yScale} position="left" />
        <text
            class="stroke-zinc-200"
            transform={`translate(${margin.left - 25},${
                innerHeight + margin.top - 25
            }) rotate(-90)`}>Spike Length →</text
        >

        <path class="pathArea" d={path($lineData)} />
    </svg>
</div>
<br />

<style>
    .pathArea {
        fill: #0000ff99;
    }
</style>
