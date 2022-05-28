<script>
    import { notes } from "../../../../store/notes";
    import Note from "./Note.svelte";

</script>

<div class="tw-text-xl tw-font-bold tw-ml-2">Notes</div>
<div class="tw-space-y-3">
    {#each $notes as note}
        <Note note={note} />
    {/each}
</div>