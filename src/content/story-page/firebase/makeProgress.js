import { addDoc, collection, getDoc, getDocs, limit, query, Timestamp, updateDoc, where } from "firebase/firestore"
import { db } from "../../firebase"
import { getChapters } from "../../page-init/initStoryPage"
import { get, getFirst } from "./util"

function calculateStreak(lastUpdate, streak) {
    // Remove the time part of the datetime
    const past = new Date(lastUpdate.toDateString()).getTime()
    const now = new Date(new Date().toDateString()).getTime()
    // Subtract dates
    const diff = now - past

    // Persist streak if it is the same day since last update
    if (diff === 0) return {
        lastUpdate,
        streak
    }

    // Increment streak if it has been a day since last update
    if (diff === 86400000) return {
        lastUpdate: Timestamp.now(),
        streak: streak + 1
    }

    // Reset streak if it's been more than a day since last update
    if (diff > 86400000 || diff < 0) return {
        lastUpdate: Timestamp.now(),
        streak: 0
    }
}

function calculateProgress(story, progress) {

    const chapterWordCounts = story.chapters.map(chapter => chapter.wordCount)
    const totalWordCount = chapterWordCounts.reduce((acc, wordCount) => acc += wordCount, 0)
    const wordCountComplete = progress.reduce((acc, completed, index) => {
        if (completed) {
            acc += chapterWordCounts[index]
        }
        return acc
    }, 0)
    const percentageComplete = wordCountComplete / totalWordCount

    return {
        wordCountComplete,
        percentageComplete
    }
}

export async function makeProgress(storyRef, bookClubRef, userRef) {

    const progress = getChapters().map(chapter => chapter.complete)
    const lastCompletedChapterIndex = progress.lastIndexOf(true)

    const storyData = get(await getDoc(storyRef))
    const { wordCountComplete, percentageComplete } = calculateProgress(storyData, progress)

    const progressRef = await addDoc(collection(db, "progress"), {
        storyRef,
        bookClubRef,
        userRef,
        progress,
        streak: 0,
        wordCountComplete,
        percentageComplete,
        lastUpdate: Timestamp.now(),
        lastCompletedChapterIndex,
        nextChapterIndex: lastCompletedChapterIndex + 1
    })

    return progressRef
}

export async function updateProgress(userRef, bookClubRef) {

    const progressQuery = query(collection(db, 'progress'), where("userRef", "==", userRef), where("bookClubRef", "==", bookClubRef), limit(1))
    const progressSnapshot = await getDocs(progressQuery)

    if (progressSnapshot.empty) {
        // TODO: throw error
        return
    }

    const progressData = getFirst(progressSnapshot)
    const progress = getChapters().map(chapter => chapter.complete)

    const changes = JSON.stringify(progressData.progress) != JSON.stringify(progress)
    
    if (!changes) return

    const storyData = get(await getDoc(progressData.storyRef))

    const lastCompletedChapterIndex = progress.lastIndexOf(true)
    const { wordCountComplete, percentageComplete } = calculateProgress(storyData, progress)
    const { lastUpdate, streak } = calculateStreak(progressData.lastUpdate.toDate(), progressData.streak)

    await updateDoc(progressData.ref, {
        progress,
        streak,
        lastUpdate,
        wordCountComplete,
        percentageComplete,
        lastCompletedChapterIndex,
        nextChapterIndex: lastCompletedChapterIndex + 1
    })
}