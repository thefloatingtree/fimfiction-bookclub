<script>

    import Button from '../../../../components/Button.svelte'
    import Input from '../../../../components/Input.svelte'
    import { getFimfictionUsername } from '../../../../page-init/initStoryPage';
    import { signUp } from '../../../firebase/signUp';
    import { signIn } from '../../../firebase/siginIn';

    async function onSignUp() {
        try {
            await signUp(signUpUsername, signUpEmail, signUpPassword)
        } catch (err) {
            console.log(err)
        }
    }  

    async function onSignIn() {
        try {
            await signIn(signInEmail, signInPassword)
        } catch (err) {
            console.log(err)
        }
    }

    let signInEmail
    let signInPassword

    let signUpUsername = getFimfictionUsername()
    let signUpEmail
    let signUpPassword

</script>

<div class="flex tw-space-x-6">
    <div class="flex tw-flex-col tw-items-start tw-space-y-3">
        <h3 class="tw-text-lg tw-font-semibold">Login</h3>
        <div class="flex tw-flex-col tw-items-start tw-space-y-1">
            <Input bind:value={signInEmail} placeholder="Email" />
            <Input bind:value={signInPassword} placeholder="Password" />
        </div>
        <Button on:click={onSignIn}>Login</Button>
    </div>
    <div class="flex tw-flex-col tw-items-start tw-space-y-3">
        <h3 class="tw-text-lg tw-font-semibold">Make a Bookclub account</h3>
        <div class="flex tw-flex-col tw-items-start tw-space-y-1">
            <Input bind:value={signUpUsername} placeholder="Display Name" />
            <Input bind:value={signUpEmail} placeholder="Email" />
            <Input bind:value={signUpPassword} placeholder="Password" />
        </div>
        <Button on:click={onSignUp}>Create Account</Button>
    </div>
</div>