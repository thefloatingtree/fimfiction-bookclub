<script>
    import Members from "./club/Members.svelte";
    import Notes from "./club/Notes.svelte";
    import CopyInvite from "./club/CopyInvite.svelte";
    import Settings from "./club/Settings.svelte";
    import BookclubSelect from "./club/BookclubSelect.svelte";
</script>

<div class="tw-flex tw-flex-col tw-space-y-3">
    <div class="tw-flex tw-justify-between">
        <BookclubSelect />
        <div class="tw-flex tw-space-x-1">
            <CopyInvite />
            <Settings />
        </div>
    </div>
    <hr />
    <Members />
    <Notes />
</div>