import { getDocs, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { SurveyAnswers, RankedMatch, UserProfile } from "./userService";

const USE_MOCK = true;

const MOCK_SURVEY_ANSWERS: SurveyAnswers[] = [
  {
    // index 0 — current user (mock-uid-001)
    sleepSchedule: "night owl",
    personality: "introvert",
    guestsOver: "rarely",
    cleanliness: "very clean",
    studyHabits: "late night",
    noiseLevel: "quiet",
    roommateType: "studious",
    communicationRank: ["text", "in-person", "phone"],
    lightsDuringFinals: "yes",
    sharedSpaces: "keep clean",
    createdAt: Timestamp.fromDate(new Date("2025-01-01")),
  },
  {
    // index 1 — mock-uid-002 (high match: ~90)
    sleepSchedule: "night owl",
    personality: "introvert",
    guestsOver: "rarely",
    cleanliness: "relaxed",
    studyHabits: "late night",
    noiseLevel: "quiet",
    roommateType: "studious",
    communicationRank: ["text", "phone", "in-person"],
    lightsDuringFinals: "no",
    sharedSpaces: "keep clean",
    createdAt: Timestamp.fromDate(new Date("2025-01-15")),
  },
  {
    // index 2 — mock-uid-003 (low match: ~15, wildcard)
    sleepSchedule: "early bird",
    personality: "extrovert",
    guestsOver: "often",
    cleanliness: "very clean",
    studyHabits: "morning",
    noiseLevel: "moderate",
    roommateType: "social",
    communicationRank: ["in-person", "text", "phone"],
    lightsDuringFinals: "yes",
    sharedSpaces: "keep clean",
    createdAt: Timestamp.fromDate(new Date("2025-02-01")),
  },
];

const MOCK_USERS: UserProfile[] = [
  {
    uid: "mock-uid-001",
    name: "BIND",
    age: 19,
    gender: "Female",
    school: "California State University Long Beach",
    biography: "Junior studying Psychology. Clean, quiet homebody.",
    avatarUrl: "",
    lifestyleImages: [
      "https://picsum.photos/seed/beach/200",
      "https://picsum.photos/seed/city/200",
      "https://picsum.photos/seed/nature/200",
    ],
    surveyCompleted: true,
  },
  {
    uid: "mock-uid-002",
    name: "Alex",
    age: 21,
    gender: "Male",
    school: "California State University Long Beach",
    biography: "Senior in Computer Science. Night owl who loves a clean, quiet space.",
    avatarUrl: "",
    lifestyleImages: [
      "https://picsum.photos/seed/tech/200",
      "https://picsum.photos/seed/coffee/200",
      "https://picsum.photos/seed/desk/200",
    ],
    surveyCompleted: true,
  },
  {
    uid: "mock-uid-003",
    name: "Jordan",
    age: 20,
    gender: "Non-binary",
    school: "California State University Long Beach",
    biography: "Sophomore studying Business. Social butterfly and early riser.",
    avatarUrl: "",
    lifestyleImages: [
      "https://picsum.photos/seed/social/200",
      "https://picsum.photos/seed/campus/200",
      "https://picsum.photos/seed/food/200",
    ],
    surveyCompleted: true,
  },
];

// Max possible score: 100
// sleepSchedule(20) + roommateType(20) + personality(10) + guestsOver(10) +
// noiseLevel(10) + communicationRank[0](10) + cleanliness(5) + studyHabits(5) +
// lightsDuringFinals(5) + sharedSpaces(5)
export function calculateCompatibility(a: SurveyAnswers, b: SurveyAnswers): number {
  let score = 0;

  if (a.sleepSchedule === b.sleepSchedule)              score += 20;
  if (a.roommateType === b.roommateType)                 score += 20;
  if (a.personality === b.personality)                   score += 10;
  if (a.guestsOver === b.guestsOver)                     score += 10;
  if (a.noiseLevel === b.noiseLevel)                     score += 10;
  if (a.communicationRank[0] === b.communicationRank[0]) score += 10;
  if (a.cleanliness === b.cleanliness)                   score +=  5;
  if (a.studyHabits === b.studyHabits)                   score +=  5;
  if (a.lightsDuringFinals === b.lightsDuringFinals)     score +=  5;
  if (a.sharedSpaces === b.sharedSpaces)                 score +=  5;

  return score;
}

export async function getPotentialMatches(currentUid: string): Promise<RankedMatch[]> {
  if (USE_MOCK) {
    const currentSurvey = MOCK_SURVEY_ANSWERS[0];
    const otherUsers = MOCK_USERS.filter((u) => u.uid !== "mock-uid-001");
    const otherSurveys = MOCK_SURVEY_ANSWERS.slice(1);

    const scored: RankedMatch[] = otherUsers.map((user, i) => ({
      user,
      score: calculateCompatibility(currentSurvey, otherSurveys[i]),
      isWildcard: false,
    }));

    scored.sort((a, b) => b.score - a.score);
    scored[scored.length - 1].isWildcard = true;

    return scored;
  }

  const currentSurveySnap = await getDoc(doc(db, "surveys", currentUid));
  if (!currentSurveySnap.exists()) return [];

  const currentSurvey = currentSurveySnap.data() as SurveyAnswers;
  const usersSnap = await getDocs(collection(db, "users"));
  const matches: RankedMatch[] = [];

  for (const userDoc of usersSnap.docs) {
    if (userDoc.id === currentUid) continue;

    const surveySnap = await getDoc(doc(db, "surveys", userDoc.id));
    if (!surveySnap.exists()) continue;

    matches.push({
      user: { uid: userDoc.id, ...userDoc.data() } as UserProfile,
      score: calculateCompatibility(currentSurvey, surveySnap.data() as SurveyAnswers),
      isWildcard: false,
    });
  }

  matches.sort((a, b) => b.score - a.score);
  if (matches.length > 0) matches[matches.length - 1].isWildcard = true;

  return matches;
}
