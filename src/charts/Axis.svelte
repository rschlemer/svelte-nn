<script lang="ts">
    import { select, selectAll } from "d3-selection";
    import { axisBottom, axisLeft } from "d3-axis";

    export let innerHeight: number;
    export let margin;
    export let position;
    export let scale;

    let transform;
    let g;

    $: {
        select(g).selectAll("*").remove();

        let axis;
        switch (position) {
            case "bottom":
                axis = axisBottom(scale).tickSizeOuter(0).tickValues([]);
                transform = `translate(0, ${innerHeight + margin.top})`;
                break;
            case "left":
                axis = axisLeft(scale).tickSizeOuter(0).tickValues([]);
                transform = `translate(${margin.left},0)`;
        }
        select(g).call(axis).style("color", "#e4e4e7");
    }
</script>

<g class="axis" bind:this={g} {transform} />
