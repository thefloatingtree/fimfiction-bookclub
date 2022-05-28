import { auth } from "../../firebase";
import { signOut as fsignOut } from "firebase/auth";
import { activeBookClub, bookClubs } from "../store/bookclub";
import { userData } from "../store/user";
import { isLoggedIn } from "../store/auth";

export async function signOut() {
    await fsignOut(auth)

    // bookClubs.set(null)
    // activeBookClub.set(null)

    // userData.set(null)

    isLoggedIn.set(false)
}