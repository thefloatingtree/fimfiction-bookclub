<script>
    import { loading } from "../story-page/store/loading";
    import { signedOutRoute } from '../story-page/store/routes';
    import { isLoggedIn } from '../story-page/store/auth';
    import { onAuthStateChanged, signOut } from "firebase/auth";
    import { auth } from "../firebase";
    import { getData } from "../story-page/firebase/getData";

    import AddNote from "./AddNote.svelte";
    import Loading from "../components/Loading.svelte";
    import Router from "../components/Router.svelte";
    import SignIn from './SignIn.svelte'
import Box from "../components/Box.svelte";


    onAuthStateChanged(auth, async (user) => {
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

<Box>
    <div class="tw-text-black">
        <Router
            routes={{
                loading: Loading,
                signin: SignIn,
                app: AddNote
            }}
            route={$signedOutRoute}
        />
    </div>
</Box>
