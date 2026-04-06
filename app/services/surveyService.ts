import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../lib/firebase"; //Changed routing to get information from library firebase configuration

//Need to modify to have safe validation
export const saveSurvey = async (answers: Record<string, unknown>) => {

 const user = auth.currentUser;

 if (!user) {
  console.log("User not authenticated");
  return;
 }

 try {

  await setDoc( // Writes data to Firestore.
   doc(db, "surveys", user.uid), // Creates a document path so each user has one survey document.
   {
    ...answers,
    createdAt: serverTimestamp() // Stores the time when the survey was submitted.
   }
  );

  console.log("Survey saved successfully");

 } catch (error) {

  console.error("Error saving survey:", error);

 }

};