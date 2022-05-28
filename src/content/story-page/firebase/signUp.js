import { createUserWithEmailAndPassword } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../../firebase"

export async function signUp(username, email, password) {
    await createUserWithEmailAndPassword(auth, email, password)
    await addDoc(collection(db, "users"), {
        username,
        email
    })
}  