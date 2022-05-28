<script>
    import Button from "../../../../../components/Button.svelte";
    import FaBookmark from 'svelte-icons/fa/FaBookmark.svelte'
    import FaStickyNote from 'svelte-icons/fa/FaStickyNote.svelte'
    import FaFire from 'svelte-icons/fa/FaFire.svelte'
    import { notes } from "../../../../store/notes";
import Box from "../../../../../components/Box.svelte";

    export let member
    export let bookClub

    $: chapter = bookClub.story.chapters[member.nextChapterIndex]
    $: percent = (member.percentageComplete * 100).toFixed(0)
    $: noteCount = $notes.filter(note => note.user.email === member.email).length

</script>

<Box>
    <div
        class="tw-w-72 tw-flex tw-flex-col tw-justify-between tw-space-y-1 tw-transition-all"
    >
        <div class="tw-flex tw-justify-between tw-items-center">
            <p
                class="tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap tw-font-semibold tw-text-lg"
            >
                {member.username}
            </p>
            <div class="tw-flex tw-space-x-3">
                <div class="tw-flex tw-space-x-1 tw-items-center">
                    <div class="tw-w-4 tw-h-4 tw-text-red-400">
                        <FaFire />
                    </div>
                    <span>{member.streak}</span>
                </div>
                <div class="tw-flex tw-space-x-1 tw-items-center">
                    <div class="tw-w-4 tw-h-4">
                        <FaStickyNote />
                    </div>
                    <span>{noteCount}</span>
                </div>
            </div>
        </div>
        <div class="tw-flex tw-space-x-2 tw-items-center">
            <p>{percent}%</p>
            <div
                class="tw-w-full tw-bg-gray-200 tw-h-3 tw-rounded-md tw-overflow-hidden"
            >
                <div class="tw-bg-blue-600 tw-h-full" style="width: {percent}%" />
            </div>
        </div>
        <Button
            on:click={() => {
                window.location.href = chapter.url;
            }}
            ghost
        >
            <div class="tw-w-4 tw-h-4">
                <FaBookmark />
            </div>
            <span>Chapter {member.nextChapterIndex + 1} {chapter.title}</span>
        </Button>
    </div>
</Box>
