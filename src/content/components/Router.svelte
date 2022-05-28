<script>
    export let routes = {}
    export let route = '/'

</script>

<svelte:component this={routes[route]} />