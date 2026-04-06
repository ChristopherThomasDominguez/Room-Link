import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<void> {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = credential.user.uid;
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      profileComplete: false,
      createdAt: serverTimestamp(),
    });
  } catch (err: unknown) {
    throw new Error(friendlyMessage(err));
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<void> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err: unknown) {
    throw new Error(friendlyMessage(err));
  }
}

export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (err: unknown) {
    throw new Error(friendlyMessage(err));
  }
}

export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err: unknown) {
    throw new Error(friendlyMessage(err));
  }
}

// Maps Firebase auth error codes to human-readable messages.
function friendlyMessage(err: unknown): string {
  const code =
    typeof err === "object" && err !== null && "code" in err
      ? (err as { code: string }).code
      : "";

  switch (code) {
    case "auth/email-already-in-use":
      return "An account with that email already exists.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return "Something went wrong. Please try again.";
  }
}
