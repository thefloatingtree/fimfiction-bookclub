import { getDoc } from "firebase/firestore"

export async function getRef(ref) {
    return { ...(await getDoc(ref)).data(), ref }
}

export async function getRefs(refs) {
    const output = []

    for (let i = 0; i < refs.length; i++) {
        const doc = await getDoc(refs[i])
        output.push({ ...doc.data(), ref: refs[i] })
    }

    return output
}

export function getFirst(snapshot) {
    return get(snapshot.docs[0])
}

export function get(snapshot) {
    return { ...snapshot.data(), ref: snapshot.ref }
}