<script>
    import Router from "../../../../components/Router.svelte";
    import { signedInRoute } from "../../../store/routes";
    import { activeBookClub } from '../../../store/bookclub'
    import Club from "./Club.svelte";
    import MakeAClub from "./MakeAClub.svelte";
    import Loading from "../../../../components/Loading.svelte";

    $: {
        if ($activeBookClub) {
            signedInRoute.set('club')
        } else {
            signedInRoute.set('makeaclub')
        }
    }

</script>

<Router
    routes={{
        loading: Loading,
        makeaclub: MakeAClub,
        club: Club
    }}
    bind:route={$signedInRoute}
/>
