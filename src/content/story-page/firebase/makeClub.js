import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase"
import { getChapters, getStoryName, getStoryWordCount } from "../../page-init/initStoryPage"
import { getBookClubData } from "./getData"
import orzo from 'orzo'
import { makeProgress } from "./makeProgress"

export async function makeClub(userRef, clubName) {

    const storyRef = await makeStory()
    
    const bookClubRef = await addDoc(collection(db, "clubs"), {
        name: clubName,
        invite: orzo.chars(),
        ownerRef: userRef,
        storyRef: storyRef,
        memberRefs: [ userRef ]
    })

    await makeProgress(storyRef, bookClubRef, userRef)

    await getBookClubData(userRef)
}

export async function makeStory() {
    const { id, title } = getStoryName()
    const storyWordCount = getStoryWordCount()
    const chapters = getChapters().map(chapter => {
        const { title, wordCount, url } = chapter
        return {
            title,
            wordCount,
            url
        }
    })
    
    const storyRef = await addDoc(collection(db, "stories"), {
        id,
        title,
        wordCount: storyWordCount,
        chapters
    })

    return storyRef
}