<script>
    import Button from "../../../../../components/Button.svelte";
    import Popover from "../../../../../components/Popover.svelte";
    import FaAngleDown from 'svelte-icons/fa/FaAngleDown.svelte'
    import FaPlus from 'svelte-icons/fa/FaPlus.svelte'

    import { activeBookClub, bookClubs } from "../../../../store/bookclub";

    let popoverWidth
</script>

<Popover width={popoverWidth}>
    <div
        bind:clientWidth={popoverWidth}
        class="tw-font-bold tw-text-2xl tw-py-1 tw-px-2 tw-rounded-sm hover:tw-bg-gray-200 tw-cursor-pointer tw-transition-all tw-flex tw-items-center tw-space-x-2"
    >
        <span>{$activeBookClub?.name}</span>
        <div class="tw-w-6 tw-h-6">
            <FaAngleDown />
        </div>
    </div>
    <div class="tw-flex tw-flex-col tw-space-y-1" slot="popover">
        {#each $bookClubs as bookClub}
            <Button ghost={bookClub.invite !== $activeBookClub?.invite}>
                {bookClub.name}
            </Button>
        {/each}
        <Button ghost>
            <div class="tw-w-4 tw-h-4">
                <FaPlus />
            </div>
            <span>Add a Bookclub</span>
        </Button>
    </div>
</Popover>
