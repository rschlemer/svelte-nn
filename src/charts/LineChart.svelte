<script lang="ts">
    import { select } from "d3-selection";
    import { axisBottom, axisLeft, line, curveNatural } from "d3";
    import { scaleLinear } from "d3-scale";
    import { onMount } from "svelte";

    function lineFunction(x: number): number {
        return (100 - x * x) ** (1 / 2);
    }

    let lineArray: Array<Array<number>> = [];
    for (let i = 0; i < 50; i++) {
        let yVal = i / 5;

        lineArray.push([lineFunction(yVal), yVal]);
    }
    console.log(lineArray);

    /*const margin = { top: 15, bottom: 50, left: 50, right: 20 };
    const width = 400,
        height = 400;

    const innerHeight = height - margin.top - margin.bottom,
        innerWidth = width - margin.left - margin.right;
        */
    const height = 400;
    const margin = 40;
    let width = 450;

    const innerHeight = height - margin;
    const innerWidth = width - margin;
    // Scale
    $: xScale = scaleLinear().domain([0, 15]).range([0, innerWidth]);
    $: yScale = scaleLinear().domain([0, 15]).range([innerHeight, 0]);
    $: line_gen = line()
        .x((d) => xScale(d[0]))
        .y((d) => yScale(d[1]))(lineArray);
</script>

<!-- <svg {width} {height}> -->
<!-- <g transform={`translate(${margin.left},${margin.top})`}> -->
<path d={line_gen} class="stroke-white fill-transparent stroke-2" />
<!-- </g>
</svg> -->
