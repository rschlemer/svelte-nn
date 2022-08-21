<script>
    export let data;
    export let xScale;
    export let yScale;
</script>

{#each data as d}
    <circle
        cx={xScale(d.inputs[0])}
        cy={yScale(d.inputs[1])}
        r={5}
        fill={d.expectedOutputs[0] > 0 ? "blue" : "red"}
    />
{/each}
