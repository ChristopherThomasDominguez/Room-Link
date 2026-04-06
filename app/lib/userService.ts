import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db, auth } from "../lib/firebase";

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
