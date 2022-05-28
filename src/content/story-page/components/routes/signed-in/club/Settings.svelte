<script>
import Button from "../../../../../components/Button.svelte";
import Popover from "../../../../../components/Popover.svelte";
    import FaCog from 'svelte-icons/fa/FaCog.svelte'
    import FaSignOutAlt from 'svelte-icons/fa/FaSignOutAlt.svelte'
    import IoMdRefreshCircle from 'svelte-icons/io/IoMdRefreshCircle.svelte'
    import FaTrash from 'svelte-icons/fa/FaTrash.svelte'
    import FaCrown from 'svelte-icons/fa/FaCrown.svelte'

    import { signOut } from "../../../../firebase/signOut";
    import { updateProgress } from "../../../../firebase/makeProgress";
    import { getBookClubData } from "../../../../firebase/getData";

    import { userData } from "../../../../store/user";
    import { activeBookClub } from "../../../../store/bookclub";
</script>

<Popover width={"225"}>
    <div class="tw-h-full">
        <Button classNames={"tw-w-10 tw-h-10"} ghost>
            <div class="tw-w-6 tw-h-6">
                <FaCog />
            </div>
        </Button>
    </div>
    <div slot="popover" class="tw-flex tw-flex-col tw-space-y-2">
        <div class="tw-flex tw-space-x-1 tw-items-center">
            <div>
                Logged in as <span class="tw-font-semibold"
                    >{$userData.username}</span
                >
            </div>
            {#if $userData.ref.path === $activeBookClub.owner.ref.path}
                <div class="tw-w-4 tw-h-4 tw-text-yellow-400">
                    <FaCrown />
                </div>
            {/if}
        </div>
        <hr />
        <Button
            on:click={async () => {
                await updateProgress($userData.ref, $activeBookClub.ref);
                await getBookClubData($userData.ref);
            }}
            ghost
        >
            <div class="tw-w-4 tw-h-4">
                <IoMdRefreshCircle />
            </div>
            <span>Update Progress</span>
        </Button>
        <Button on:click={signOut} ghost>
            <div class="tw-w-4 tw-h-4">
                <FaTrash />
            </div>
            <span>Leave Bookclub</span>
        </Button>
        <Button on:click={signOut} ghost>
            <div class="tw-w-4 tw-h-4">
                <FaSignOutAlt />
            </div>
            <span>Logout</span>
        </Button>
    </div>
</Popover>
