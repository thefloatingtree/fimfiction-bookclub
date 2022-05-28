import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

export async function signIn(email, password) {
    await signInWithEmailAndPassword(auth, email, password)
}