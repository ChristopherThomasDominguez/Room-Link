import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

export type SurveyAnswers = {
  sleepSchedule: string;
  personality: string;
  guestsOver: string;
  cleanliness: string;
  studyHabits: string;
  noiseLevel: string;
  roommateType: string;
  communicationRank: string[];
  lightsDuringFinals: string;
  sharedSpaces: string;
  createdAt: Timestamp;
};

export type UserProfile = {
  uid: string;
  name: string;
  age: number;
  gender: string;
  school: string;
  biography: string;
  avatarUrl: string;
  email: string;
  profileComplete: boolean;
  createdAt: Timestamp;
  lifestyleImages: string[];
  surveyAnswers?: SurveyAnswers;
  surveyCompleted?: boolean;
};

export type RankedMatch = {
  user: UserProfile;
  score: number;
  isWildcard: boolean;
};

const USE_MOCK = true;

const MOCK_PROFILE: UserProfile = {
  uid: "mock-uid-001",
  name: "BIND",
  age: 19,
  gender: "Female",
  school: "California State University Long Beach",
  biography: "Junior studying Psychology. I'm a clean, quiet homebody who loves cooking and late-night study sessions. Looking for a chill roommate who respects shared spaces.",
  avatarUrl: "",
  lifestyleImages: [
    "https://picsum.photos/seed/beach/200",
    "https://picsum.photos/seed/city/200",
    "https://picsum.photos/seed/nature/200",
  ],
};

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (USE_MOCK) {
    return MOCK_PROFILE;
  }

  const docRef = doc(db, "users", uid);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null
  }

  return { uid: snapshot.id, ...snapshot.data() } as UserProfile;
}

/**
 * Writes partial profile data to users/{uid} in Firestore.
 * Uses merge: true so existing fields are never overwritten unintentionally.
 * Throws on failure so the calling screen can handle the error.
 */
export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
): Promise<void> {
  if (!uid) {
    throw new Error("No UID provided. Cannot update user profile.");
  }

  await setDoc(doc(db, "users", uid), data, { merge: true });
}
