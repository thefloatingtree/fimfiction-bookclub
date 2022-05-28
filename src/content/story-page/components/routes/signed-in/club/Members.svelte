<script>
    import { activeBookClub } from '../../../../store/bookclub';

    import Member from './Member.svelte'
</script>

<div class="tw-text-xl tw-font-bold tw-ml-2">Members</div>
<div class="tw-flex tw-flex-wrap tw-gap-3">
    {#each $activeBookClub?.members as member}
        <Member member={member} bookClub={$activeBookClub} />
    {/each}
</div>

