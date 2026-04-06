import {SurveyQuestion} from "@/app/RoommateFeatureScreens/roommate-survey";
import React from "react";
import {Pressable, Text, View, TextInput, StyleSheet} from "react-native";

type QuestionBlockProps = {
    index: number;
    question: SurveyQuestion;
    answer: string | Record<string, number> | undefined;
    onAnswerChange: (answer: string) => void;
    onRankChange: (option: string, maxRank: number) => void;
}

export default function QuestionBlock({ index, question, answer, onAnswerChange, onRankChange }: QuestionBlockProps) {
    return (
        <View style={styles.wrapper}>
            <View style={styles.circNumber}> 
                <Text style={styles.questionNumber}> {index + 1} </Text> 
            </View>

            <View>
                <Text style={styles.questionText} numberOfLines={2}>{question.question}</Text>

                <View style={styles.optionContainer}>
                    {question.type === "mc" && (
                        <View>
                            {question.options.map((option) => {
                                const isSelected = answer === option; // check if this option is the currently selected answer

                                return (
                                    // make button for each option in multiple choice questions
                                    <Pressable
                                        key={option}
                                        onPress={() => onAnswerChange(option)}
                                        style={styles.optionRow}
                                    >
                                        <View style={styles.radioButton}>
                                            {isSelected && (
                                                <View style={styles.radioButtonSelectedMiddle}>
                                                    <View style={styles.radioButtonSelectedInner} />
                                                </View>
                                            )}
                                        </View>

                                        <Text>{option}</Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    )}

                    {question.type === 'short' && (
                        <TextInput 
                            style={styles.shortansInput}
                            placeholder={question.placeholder}
                            value={typeof answer === "string" ? answer : ""}
                            onChangeText={onAnswerChange}
                            maxLength={question.maxLength}
                            multiline
                        />
                    )}


                    {question.type === "rank" && (
                        <View>
                            {question.options.map((option) => {
                                const rankAnswer =
                                    answer && typeof answer === "object" 
                                    ? answer
                                    : {};

                                const rankValue = rankAnswer[option] ?? 1;

                                return (
                                    <View key={option} style={styles.rankRow}>
                                        <Pressable
                                            onPress={() => onRankChange(option, question.options.length)}
                                            style={styles.rankButton}
                                        >
                                            <Text style={styles.rankButtonText}>{rankValue}</Text>
                                        </Pressable>

                                        <View style={styles.rankLabelBox}>
                                            <Text style={styles.rankLabelText}>{option}</Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    )}
                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        marginBottom: 20,
        marginRight: 30,
    },
    circNumber: {
        width: 28,
        height: 28,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#006E78",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
        marginRight: 10,
        backgroundColor: "#EAF7F8",
    },
    questionNumber: {
        fontSize: 16,
        color: "#006E78",
    },
    questionText: {
        fontSize: 21,
        marginTop: 4,
        marginBottom: 10,
        fontWeight: '200',
    },
    optionContainer: {
        marginLeft: 4
    },
    optionRow: {
        flexDirection: 'row',
        marginBottom: 6,
        fontWeight: '700'
    },
    radioButton: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1.5,
        borderColor: "#006E78",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        backgroundColor: "white",
    },
    radioButtonSelectedMiddle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#84C5BE",
        alignItems: "center",
        justifyContent: "center",
    },
    radioButtonSelectedInner: {
        backgroundColor: "#006E78",
        borderColor: "#006E78",
    },


    shortansInput: {
        width: 330,
        height: 100,
        backgroundColor: "white",
        fontStyle: "italic",
        color: "#555",
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#006E78",
    },

    rankRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    rankButton: {
        width: 40,
        height: 30,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#006E78",
        zIndex: 2,
    },
    rankButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "700",
    },
    rankLabelBox: {
        width: 250,
        height: 30,
        borderWidth: 1.5,
        borderColor: "#006E78",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center",
        paddingHorizontal: 16,
        marginLeft: -2,
        backgroundColor: "#F8F8F8",
    },
    rankLabelText: {
        color: "#006E78",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
    },
})