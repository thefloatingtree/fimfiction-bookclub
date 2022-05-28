import { addDoc, arrayRemove, arrayUnion, collection, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getChapter } from "../../page-init/initChapterPage";

export async function makeNote(content, userRef, bookClubRef, paragraphText, paragraphId) {

    const { id } = getChapter()

    await addDoc(collection(db, "notes"), {
        content,
        userRef,
        bookClubRef,
        paragraphText,
        paragraphId,
        chapterId: id,
        likes: [],
        creation: Timestamp.now()
    })
}

export async function likeNote(userRef, noteRef) {
    await updateDoc(noteRef, {
        likes: arrayUnion(userRef)
    })
}

export async function unlikeNote(userRef, noteRef) {
    await updateDoc(noteRef, {
        likes: arrayRemove(userRef)
    })
}