<script>
    import Button from "./Button.svelte";

    export let options = []
    export let selected = options[0]

    export let color = "blue"
</script>

<div class="tw-flex tw-space-x-1">
    {#each options as option}
        <Button color={color} on:click={() => { selected = option; options = [ ...options] }} ghost={selected != option}>{option}</Button>
    {/each}
</div>