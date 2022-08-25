<script>
    import * as d3 from "d3";
    import { sliderBottom } from "d3-simple-slider";
    import { onMount } from "svelte";

    let div;
    export let value;
    export let store;
    const slider = sliderBottom()
        .min(-1)
        .max(1)
        .tickValues([-1, 0, 1])
        .width(135)
        .default(value)
        .on("onchange", (v) => {
            value = v;
            store.update((x) => v);
        });

    onMount(() => {
        const g = d3
            .select(div)
            .append("svg")
            .attr("width", 190)
            .attr("height", 80)
            .append("g")
            .attr("transform", "translate(30,30)");

        g.call(slider);
    });
</script>

<div bind:this={div} />
