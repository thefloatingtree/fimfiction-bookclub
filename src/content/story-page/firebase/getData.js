import { db } from '../../firebase'
import { query, collection, where, limit, getDocs } from 'firebase/firestore'
import { userData } from '../store/user'
import { notes as notesStore } from '../store/notes'
import { activeBookClub, bookClubs as bookClubsStore } from '../store/bookclub'
import { getStoryName } from '../../page-init/initStoryPage'
import { getFirst, getRef, getRefs } from './util'

export async function getData(userAuth) {
    const userRef = await getUserData(userAuth)
    const bookClubRef = await getBookClubData(userRef)
    await getNotes(bookClubRef)
}

export async function getUserData(userAuth) {

    const userDataQuery = query(collection(db, 'users'), where("email", "==", userAuth.email), limit(1))
    const userSnapshot = await getDocs(userDataQuery)

    if (userSnapshot.empty) return

    const user = getFirst(userSnapshot)

    userData.set(user)

    return user.ref
}

export async function getBookClubData(userRef) {

    if (!userRef) return

    const { id: storyId } = getStoryName() 

    const bookClubQuery = query(collection(db, 'clubs'), where("memberRefs", "array-contains", userRef))
    const bookClubsSnapshot = await getDocs(bookClubQuery)
    const bookClubs = await Promise.all(bookClubsSnapshot.docs
        .map(async (bookClub) => {
            const { invite, memberRefs, name, ownerRef, storyRef } = bookClub.data()
            return {
                invite,
                name,
                owner: await getRef(ownerRef),
                story: await getRef(storyRef),
                members: await getMembers(memberRefs, bookClub.ref),
                ref: bookClub.ref
            }
        }))

    if (!bookClubs.length) return

    const filteredBookClubs = bookClubs.filter(bookClub => bookClub.story.id === storyId)

    if (!filteredBookClubs.length) return

    bookClubsStore.set(filteredBookClubs)
    activeBookClub.set(filteredBookClubs[0])

    return filteredBookClubs[0].ref
}

export async function getMembers(memberRefs, bookClubRef) {
    
    const members = await getRefs(memberRefs)
    return await Promise.all(members
        .map(async (member) => {
            const progressQuery = query(collection(db, 'progress'), where("userRef", "==", member.ref), where("bookClubRef", "==", bookClubRef), limit(1))
            const progressSnapshot = await getDocs(progressQuery)
            const progressData = getFirst(progressSnapshot)
            const { nextChapterIndex, lastCompletedChapterIndex, progress, streak, wordCountComplete, percentageComplete } = progressData
            const { email, username } = member
            return {
                email,
                username,
                nextChapterIndex,
                lastCompletedChapterIndex,
                progress,
                streak,
                wordCountComplete,
                percentageComplete
            }
        }))
}

export async function getNotes(bookClubRef) {

    if (!bookClubRef) return

    const notesQuery = query(collection(db, 'notes'), where("bookClubRef", "==", bookClubRef))
    const notesSnapshot = await getDocs(notesQuery)
    const notes = await Promise.all(notesSnapshot.docs
        .map(async (note) => {
            const { chapterId, content, creation, likes, paragraphId, paragraphText, userRef } = note.data()
            return {
                chapterId,
                content,
                creation,
                likes,
                paragraphId,
                paragraphText,
                user: await getRef(userRef),
                ref: note.ref
            }
        }))

    notesStore.set(notes)
}