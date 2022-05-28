<script>
    import Button from "../components/Button.svelte";
    import Input from "../components/Input.svelte";
    import { activeParagraphIndex, activeParagraphText } from "./store/activeParagraph";
    import { makeNote } from '../story-page/firebase/makeNote'
    import { userData } from "../story-page/store/user";
    import { activeBookClub } from "../story-page/store/bookclub"
    import { autoresize } from 'svelte-textarea-autoresize'

    async function onAddNote() {

        if (isLoading) return

        isLoading = true
        await makeNote(content, $userData.ref, $activeBookClub.ref, $activeParagraphText, $activeParagraphIndex)
        isLoading = false
        content = ""
    }

    let isLoading = false
    let content = ""
</script>

<div class="tw-space-y-1">
    <textarea disabled={isLoading} bind:value={content} use:autoresize placeholder="Your note..." class="tw-w-full tw-text-base tw-resize-none tw-outline-none tw-bg-white" />
    <hr class="tw-pb-2" />
    <Button loading={isLoading} on:click={onAddNote}><span>Post</span></Button>
</div>