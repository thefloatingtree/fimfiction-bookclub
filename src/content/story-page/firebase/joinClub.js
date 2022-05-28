import { arrayUnion, collection, getDocs, limit, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../firebase"
import { getBookClubData } from "./getData"
import { makeProgress } from "./makeProgress"
import { getFirst } from "./util"

export async function joinClub(userRef, inviteCode) {
    const inviteClubQuery = query(collection(db, 'clubs'), where("invite", "==", inviteCode), limit(1))
    const inviteClubSnapshot = await getDocs(inviteClubQuery)

    if (inviteClubSnapshot.empty) {
        // TODO: throw err to user
        console.error(`${inviteCode} does not exist`)
        return
    }

    const bookClub = getFirst(inviteClubSnapshot)
    console.log(bookClub)

    await updateDoc(bookClub.ref, {
        memberRefs: arrayUnion(userRef)
    })

    await makeProgress(bookClub.storyRef, bookClub.ref, userRef)

    await getBookClubData(userRef)
}