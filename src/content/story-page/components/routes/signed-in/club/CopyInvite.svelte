<script>

    import Button from "../../../../../components/Button.svelte";

    import FaClipboard from 'svelte-icons/fa/FaClipboard.svelte'
    import FaCheck from 'svelte-icons/fa/FaCheck.svelte'
    import { activeBookClub } from "../../../../store/bookclub";

    let justCopied = false

</script>

<Button on:click={() => {
    if (justCopied) return

    navigator.clipboard.writeText($activeBookClub.invite)
    justCopied = true
    setTimeout(() => {
        justCopied = false
    }, 3000)
}} ghost>
    {#if justCopied}
        <div class="tw-w-6 tw-h-6">
            <FaCheck />
        </div>
        <span>Copied</span>
    {:else}
        <div class="tw-w-6 tw-h-6">
            <FaClipboard />
        </div>
        <span>Copy Invite Code</span>
    {/if}
    
</Button>