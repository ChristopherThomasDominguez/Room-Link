import { useState } from "react";
import { Text, ScrollView, Alert, Button, View } from "react-native";
import QuestionBlock from "@/components/question-block";
import { saveSurveyAnswers } from "@/lib/surveyService";
import { updateUserProfile } from "@/lib/userService";
import { auth } from "@/lib/firebase";
import { router } from "expo-router";

export type QuestionType = "mc" | "rank" | "short";

type BaseQuestion = {
    id: string;        
    question: string;
    type: QuestionType;
};

export type MCQuestion = BaseQuestion & {
    type: "mc";
    options: string[];
};

export type RankedQuestion = BaseQuestion & {
    type: "rank";
    options: string[];  // items to rank
};

export type ShortAnswerQuestion = BaseQuestion & {
    type: "short";
    placeholder?: string;
    maxLength?: number;
};

export type SurveyQuestion = MCQuestion | RankedQuestion | ShortAnswerQuestion;

export const surveyQuestions: SurveyQuestion[] = [
    // --- Multiple Choice ---
    {
        id: "mc_sleep_schedule",
        type: "mc",
        question: "Current sleep schedule?",
        options: [
        "Morning Person, Early Sleeper",
        "Mid-Afternoon, Early Sleeper",
        "Mid-Afternoon, Late Bird",
        ],
    },
    {
        id: "mc_describe_yourself",
        type: "mc",
        question: "How would you describe yourself?",
        options: ["Introvert", "Extrovert", "Ambivert"],
    },
    {
        id: "mc_guests_over",
        type: "mc",
        question: "Do you plan to have guest over?",
        options: ["Yes", "No", "Maybe (for emergencies)"],
    },
    {
        id: "mc_have_job",
        type: "mc",
        question: "Do you have a job?",
        options: ["Yes", "No"],
    },
    {
        id: "mc_roommate_smokes",
        type: "mc",
        question: "Do you mind if your roommate smokes?",
        options: ["Yes", "No", "No, if it is outside"],
    },
    {
        id: "mc_roommate_preference",
        type: "mc",
        question: "Preference in roommate?",
        options: ["Same sex", "Opposite sex", "No preference"],
    },
    {
        id: "mc_dishes_time",
        type: "mc",
        question:
        "After eating dinner, how long would it take for you to wash the dishes?",
        options: ["5-10 minutes", "30 minutes", "1-2 hours", "3+ hours"],
    },
    {
        id: "mc_roommate_type",
        type: "mc",
        question: "What type of roommate are you looking for?",
        options: ["Roommate to become friends", "Roommate to co-exist"],
    },
    {
        id: "mc_finals_lights_out",
        type: "mc",
        question: "It is finals week, and your roommate needs lights out later.",
        options: ["Yes, only during finals week or tight deadlines", "No"],
    },
    {
        id: "mc_shared_cleaning",
        type: "mc",
        question: "Shared living spaces should be cleaned by everyone in dorm?",
        options: ["Yes", "No"],
    },

    // --- Ranked Questions ---
    {
        id: "rank_communication_methods",
        type: "rank",
        question: "Rank your favorite communication methods:",
        options: ["Social media", "Text", "Email"],
    },
    {
        id: "rank_roommate_priorities",
        type: "rank",
        question: "Rank priority of what you are looking for in a roommate:",
        options: ["Cleanliness", "Flexibility", "Social Life"],
    },

    // --- Short Answer ---
    {
        id: "short_conflict_resolution",
        type: "short",
        question: "How would you resolve conflict with your roommate?",
        placeholder: "Type your answer...",
        maxLength: 150,
    },
];


// Make a function to display the survey questions and collect answers based on the question type.
export default function RoommateSurvey() {

    // a record of answers that the user chooses/types
    type RankAnswer = Record<string, number>;
    type SurveyAnswer = string | RankAnswer;
    const [answers, setAnswers] = useState<Record<string, SurveyAnswer>>({}); 

    // copy the previous answers into the new object and add the new answer
    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers((prev) => ({
        ...prev,
        [questionId]: answer,
        }));
    };


    // make a handler for ranked questions
    const handleRankChange = (questionId: string, option: string, maxRank: number) => {
        setAnswers((prev) => {
            const currentAnswer = prev[questionId];
            const currentRanks =
                currentAnswer && typeof currentAnswer === "object"
                ? currentAnswer
                : {};

            // default to rank 1 if this option hasn't been ranked yet, else currentValue is the current rank
            const currentValue = currentRanks[option] ?? 1;
            // if the current rank is already at maxRank, reset to 1, otherwise increment the rank
            const nextValue = currentValue >= maxRank ? 1 : (currentValue + 1);

            return {
                ...prev,
                [questionId]: {
                    ...currentRanks,
                    [option]: nextValue,
                },
            };
        });
    };


    const handleSubmit = async () => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert("Error", "You must be logged in to submit the survey.");
            return;
        }
        try {
            await saveSurveyAnswers(answers);
            await updateUserProfile(user.uid, { profileComplete: true });
            router.replace("/(tabs)/");
        } catch (error) {
            console.error("Error submitting survey:", error);
            Alert.alert("Error", "Could not save your survey. Please try again.");
        }
    };


    return (
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }} 
                    keyboardShouldPersistTaps="handled">
            <Text style={{ fontSize: 30, marginBottom: 20, 
                color: "#84C5BE", fontWeight:"bold", 
                textShadowRadius: 2, textShadowColor: "#bdbaba", textShadowOffset: { width: 2, height: 1 }}}>Survey</Text>
            <Text style={{ fontSize: 22, fontWeight: "100", marginBottom: 20, alignSelf: "center" }}>
                Let's answer some questions to find you a compatible roommate!
            </Text>

            {surveyQuestions.map((question, index) => (
                <QuestionBlock
                    key={question.id}
                    index={index}
                    question={question}
                    answer={answers[question.id]}
                    onAnswerChange={(newAnswer) =>
                        handleAnswerChange(question.id, newAnswer)
                    }
                    onRankChange={(option, maxRank) => handleRankChange(question.id, option, maxRank)}
                />
            ))}

            <View style={{ marginTop: 24}}>
                <Button
                    title="Submit"
                    color='#84C5BE'
                    onPress={handleSubmit}
                />
            </View>

            {/* <View style={{ marginTop: 20 }}>
                <Text style={{ fontWeight: "700", marginBottom: 8 }}>Current Answers:</Text>
                <Text>{JSON.stringify(answers, null, 2)}</Text>
            </View> */}
        </ScrollView>
    );

}

