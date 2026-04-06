// React hooks
// useState -> store messages and text input
// useEffect -> run code when screen loads
// useRef -> control FlatList scrolling

import React, { useEffect, useState, useRef } from "react";
import {
 View,
 Text,
 FlatList,
 TextInput,
 TouchableOpacity,
 StyleSheet
} from "react-native";

// Icons
// camera -> Ionicons
// mic -> Feather
// send -> Ionicons
import { Ionicons, Feather } from "@expo/vector-icons";

import {
 collection,
 query,
 where,
 orderBy,
 onSnapshot,
 addDoc,
 serverTimestamp
} from "firebase/firestore";

// Firebase database + authentication;
import { db, auth } from "../lib/firebase";

type Message = {
 id: string;
 senderId: string;
 text: string;
 createdAt: unknown;
};

type ChatScreenProps = {
 route: { params: { conversationId: string } };
};

export default function ChatScreen({ route }: ChatScreenProps) {

 const { conversationId } = route.params;

 const [messages, setMessages] = useState<Message[]>([]);
 const [input, setInput] = useState("");

 const flatListRef = useRef<FlatList<Message>>(null);

 const currentUser = auth.currentUser;

 // Prevent crash if authentication hasn't loaded yet
 if (!currentUser) {
  return (
   <View style={styles.container}>
    <Text>Loading...</Text>
   </View>
  );
 }

 // Load messages in real-time
 useEffect(() => {

  const q = query(
   collection(db, "messages"),
   where("conversationId", "==", conversationId),
   orderBy("createdAt", "asc")
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {

   const msgs = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
   })) as Message[];

   setMessages(msgs);

  });

  return unsubscribe;

 }, [conversationId]);

 // Send message function
 const sendMessage = async () => {

  if (input.trim() === "") return;

  const messageText = input;

  // Clear input immediately for better UX
  setInput("");

  await addDoc(collection(db, "messages"), {
   conversationId: conversationId,
   senderId: currentUser.uid,
   text: messageText,
   createdAt: serverTimestamp()
  });

 };

 // Render individual message
 const renderMessage = ({ item }: { item: Message }) => {

  const isMine = item.senderId === currentUser.uid;

  return (

   <View
    style={[
     styles.messageBubble,
     isMine ? styles.myMessage : styles.otherMessage
    ]}
   >
    <Text style={styles.messageText}>{item.text}</Text>
   </View>

  );

 };

 return (

  <View style={styles.container}>

   {/* Chat message list */}

   <FlatList
    ref={flatListRef}
    data={messages}
    keyExtractor={(item) => item.id}
    renderItem={renderMessage}
    keyboardShouldPersistTaps="handled"
    onContentSizeChange={() =>
     flatListRef.current?.scrollToEnd({ animated: true })
    }
   />

   {/* Empty chat placeholder */}

   {messages.length === 0 && (
    <Text style={{ textAlign: "center", marginTop: 10 }}>
     No messages yet
    </Text>
   )}

   {/* Message input area */}

   <View style={styles.inputContainer}>

    {/* Camera button (placeholder) */}
    <TouchableOpacity
     style={styles.iconButton}
     onPress={() => console.log("Camera feature coming later")}
    >
     <Ionicons name="camera-outline" size={24} color="#006E78" />
    </TouchableOpacity>

    <TextInput
     style={styles.input}
     placeholder="Write Here..."
     value={input}
     onChangeText={setInput}
    />

    {/* Microphone button (placeholder) */}
    <TouchableOpacity
     style={styles.iconButton}
     onPress={() => console.log("Voice message feature coming later")}
    >
     <Feather name="mic" size={22} color="#006E78" />
    </TouchableOpacity>

    {/* Send message button */}
    <TouchableOpacity
     onPress={sendMessage}
     style={styles.iconButton}
    >
     <Ionicons name="send" size={22} color="#006E78" />
    </TouchableOpacity>

   </View>

  </View>

 );
}

const styles = StyleSheet.create({

 container: {
  flex: 1,
  backgroundColor: "#FFFFFF",
  padding: 10
 },

 messageBubble: {
  maxWidth: "75%",
  padding: 12,
  marginVertical: 6,
  borderRadius: 18
 },

 myMessage: {
  alignSelf: "flex-end",
  backgroundColor: "#84C5BE"
 },

 otherMessage: {
  alignSelf: "flex-start",
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#E0E0E0"
 },

 messageText: {
  fontSize: 16
 },

 inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#84C5BE",
  padding: 8,
  borderRadius: 25
 },

 input: {
  flex: 1,
  backgroundColor: "#FFFFFF",
  borderRadius: 20,
  paddingHorizontal: 15,
  height: 40
 },

 iconButton: {
  paddingHorizontal: 8
 }

});