<script>
    import Button from "../../../../components/Button.svelte";
    import Input from "../../../../components/Input.svelte";
    import { userData } from "../../../store/user";
    import { makeClub } from '../../../firebase/makeClub'
    import { joinClub } from '../../../firebase/joinclub'
    
    import { signedInRoute } from "../../../store/routes";

    async function onMakeClub() {
        await makeClub($userData.ref, clubName)
        signedInRoute.set('club')
    }

    async function onJoinClub() {
        await joinClub($userData.ref, inviteCode)
        signedInRoute.set('club')
    }

    let clubName
    let inviteCode
</script>

<p>You are not a member of any clubs for this book.</p>
<Input bind:value={clubName} placeholder="Bookclub name" />
<Button on:click={onMakeClub}>Make Your Own</Button>
<p>or</p>
<Input bind:value={inviteCode} placeholder="Invite code" />
<Button on:click={onJoinClub}>Join a Friend's</Button>
