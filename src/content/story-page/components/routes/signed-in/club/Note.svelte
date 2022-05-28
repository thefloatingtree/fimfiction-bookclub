<script>
    import Button from "../../../../../components/Button.svelte";
    import FaHeart from 'svelte-icons/fa/FaHeart.svelte'
    import FaRegHeart from 'svelte-icons/fa/FaRegHeart.svelte'
    import FaBookmark from 'svelte-icons/fa/FaBookmark.svelte'
    import MdMoreHoriz from 'svelte-icons/md/MdMoreHoriz.svelte'
    import FaTrash from 'svelte-icons/fa/FaTrash.svelte'
    import FaEdit from 'svelte-icons/fa/FaEdit.svelte'

    import humanize from 'tiny-human-time'
    import { activeBookClub } from "../../../../store/bookclub";
    import Popover from "../../../../../components/Popover.svelte";
    import Box from "../../../../../components/Box.svelte";
    import { likeNote, unlikeNote } from "../../../../firebase/makeNote";
    import { userData } from '../../../../store/user'

    export let note

    const onLikeNote = async () => {
        if (localLike) {
            localLike = false
            localLikeCount -= 1
            await unlikeNote($userData.ref, note.ref)
        } else {
            localLike = true
            localLikeCount += 1
            await likeNote($userData.ref, note.ref)
        }
    }
    
    $: paragraphText = note.paragraphText.substring(0, 256) + "..."
    $: timeSinceCreation = humanize(new Date(), note.creation.toDate())

    $: chapterUrl = $activeBookClub.story.chapters[note.chapterId].url
    $: chapterTitle = $activeBookClub.story.chapters[note.chapterId].title

    let localLikeCount = note.likes.length
    let localLike = note.likes.some(user => user.path === $userData.ref.path)
</script>

<Box>
    <div
        class="tw-flex tw-flex-col tw-justify-between tw-space-y-1 tw-transition-all"
    >
        <div class="tw-flex tw-justify-between tw-items-center">
            <p
                class="tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap tw-font-semibold tw-text-lg"
            >
                <span>{note.user.username}</span>
                <span class="tw-text-gray-500 tw-font-normal tw-text-base">
                    · {timeSinceCreation} ago</span
                >
            </p>
            <div class="tw-flex tw-space-x-1">
                <Popover>
                    <Button classNames={"tw-w-8 tw-h-8"} ghost>
                        <div class="tw-w-4 tw-h-4">
                            <MdMoreHoriz />
                        </div>
                    </Button>
                    <div slot="popover" class="tw-flex tw-flex-col tw-space-y-2">
                        <Button ghost>
                            <div class="tw-w-4 tw-h-4">
                                <FaEdit />
                            </div>
                            <span>Edit</span>
                        </Button>
                        <Button ghost>
                            <div class="tw-w-4 tw-h-4">
                                <FaTrash />
                            </div>
                            <span>Delete</span>
                        </Button>
                    </div>
                </Popover>
                <Button
                    on:click={() => {
                        window.location.href = chapterUrl;
                    }}
                    ghost
                >
                    <div class="tw-w-4 tw-h-4">
                        <FaBookmark />
                    </div>
                    <span>Chapter {note.chapterId + 1} {chapterTitle}</span>
                </Button>
                <Button on:click={onLikeNote} ghost>
                    <div class="tw-w-4 tw-h-4 tw-text-red-400">
                        {#if localLike}
                            <FaHeart />
                        {:else}
                            <FaRegHeart />
                        {/if}
                    </div>
                    <span>{localLikeCount}</span>
                </Button>
            </div>
        </div>
        <p>{note.content}</p>
        <p
            class="tw-border-solid tw-border-l-4 tw-border-gray-500 tw-pl-4 tw-text-gray-500"
        >
            {paragraphText}
        </p>
    </div>
</Box>
