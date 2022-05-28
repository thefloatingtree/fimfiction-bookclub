<script>
    import { fade, fly } from "svelte/transition";
    import clickOutside from "svelte-outside-click";
    
    export let width = null;
    export let height = null;
    export let xOffset = "0px";
    let open = false;
    export const close = () => {
        open = false;
    }
</script>

<div
    class="tw-relative tw-inline-block tw-text-left"
    on:keydown={(e) => {
        if (e.code === "Escape" || e.code === "Enter") open = false;
    }}
    use:clickOutside={close}
>
    <div on:click={() => (open = !open)}>
        <slot />
    </div>
    <div class="w-full">
        {#if open}
            <div
                in:fly={{ y: 10, duration: 200 }}
                out:fade={{ duration: 100 }}
                style="width: {width}px; height: {height}px; transform: translate({xOffset});"
                class="tw-origin-top-right tw-absolute tw-right-0 tw-mt-2 tw-min-w-10 tw-bg-white tw-z-50 tw-overflow-y-auto tw-p-4 tw-rounded-md tw-ring-1 tw-ring-gray-500 tw-shadow-md"
            >
                <div class="tw-w-full" role="none">
                    <slot name="popover" />
                </div>
            </div>
        {/if}
    </div>
</div>