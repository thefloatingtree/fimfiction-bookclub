<script>
    export let color = "blue"
    export let ghost = false 
    export let loading = false
    export let classNames = ""

    $: classes = ghost ? 
        `tw-py-1 tw-px-2 tw-rounded-sm tw-bg-opacity-0 hover:tw-bg-gray-500 hover:tw-bg-opacity-20 tw-transition-all tw-outline-none tw-flex tw-space-x-2 tw-items-center tw-font-semibold` : 
        `tw-bg-${color}-500 tw-text-white tw-py-1 tw-px-2 tw-rounded-sm hover:tw-bg-${color}-600 tw-transition-all tw-outline-none tw-flex tw-space-x-2 tw-items-center tw-font-semibold`

</script>

<button on:click class={classes + " " + classNames}>
    <slot />
    {#if loading}
        <svg
            class="tw-animate-spin tw-h-4 tw-w-4 tw-text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                class="tw-opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            />
            <path
                class="tw-opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    {/if}
</button>
