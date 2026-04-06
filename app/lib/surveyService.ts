import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "./firebase";

/**
 * Saves the current user's survey answers to surveys/{uid} in Firestore.
 * Throws on failure so the calling screen can handle the error.
 */
export const saveSurveyAnswers = async (
  answers: Record<string, unknown>
): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No authenticated user found. Cannot save survey.");
  }

  await setDoc(doc(db, "surveys", user.uid), {
    ...answers,
    createdAt: serverTimestamp(),
  });
};
