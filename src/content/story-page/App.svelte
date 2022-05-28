<script>
    import { onAuthStateChanged } from 'firebase/auth';
    import { isLoggedIn } from './store/auth';
    import { loading } from './store/loading'
    import { auth } from '../firebase';
    import { signedOutRoute } from './store/routes'
    import { signOut } from './firebase/signOut'
    import { getData } from './firebase/getData'

    import SignIn from './components/routes/signed-out/SignIn.svelte';
    import Router from '../components/Router.svelte';
    import Loading from '../components/Loading.svelte';
    import SignedInRouter from './components/routes/signed-in/SignedInRouter.svelte';
    import NeedsFimfictionSignin from './components/routes/signed-out/NeedsFimfictionSignin.svelte';
    import { isLoggedIntoFimfiction } from '../page-init/initStoryPage';
    
    onAuthStateChanged(auth, async (user) => {

        if (!isLoggedIntoFimfiction()) {
            return signedOutRoute.set("needfimfictionsignin")
        }

        isLoggedIn.set(!!user)
        
        loading.set(true)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
        if (user) {
            await getData(user)
        } else {
            await signOut()
        }

        loading.set(false)
    })

    $: if ($loading) {
        signedOutRoute.set("loading")
    } else if (!$isLoggedIn) {
        signedOutRoute.set("signin")
    } else {
        signedOutRoute.set("app")
    }
</script>

<Router
    routes={{
        loading: Loading,
        needfimfictionsignin: NeedsFimfictionSignin,
        signin: SignIn,
        app: SignedInRouter
    }}
    bind:route={$signedOutRoute}
/>


