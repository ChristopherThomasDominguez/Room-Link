
import { Link, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { Image } from 'expo-image';
import { Alert, Platform, ScrollView, TextInput, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import {useState} from 'react';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';

import { IconSymbol } from '@/components/ui/icon-symbol';
// import { RadioButton } from 'react-native-paper';
// import * as ImagePicker from 'expo-image-picker';
//import {useMediaLibraryPermissions, PermissionStatus } from 'expo-image-picker';
import RadioButton from '@/components/radioButton';
import InLineDropdown from '@/components/dropdown';
import ImageSelect from '@/components/imageSelect';
import { updateUserProfile } from '@/lib/userService';
import { auth } from '@/lib/firebase';


export default function roommateProfile() {
   const router = useRouter();
  const [inputValue, setInputValue] = useState('')
  const [ageInputVal, ageSetInputValue] = useState('')
  const [bioInputVal, bioSetInputValue] = useState('')

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [lifestyleUri, setLifestyleUri] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState('')
  const [dropdownVal, setDropdownVal] = useState('')

const genderOptions = [
  {label: 'Female', value: 'Female'},
  {label: 'Male', value: 'Male'},
  {label: 'Non-Binary', value: 'Non-Binary'}
];

const schools = [
  "California State University, Long Beach"
];
  
//Database where all values are inserted because of the above const
const saveprofile = async (): Promise<boolean> => {
  const user = auth.currentUser;
  if (!user) {
    Alert.alert("Error", "You must be logged in to save your profile.");
    return false;
  }
  try {
    await updateUserProfile(user.uid, {
      name: inputValue,
      age: Number(ageInputVal),
      biography: bioInputVal,
      gender: selectedValue,
      school: dropdownVal,
    });
    return true;
  } catch (error) {
    console.error("Profile save failed", error);
    Alert.alert("Error", "Could not save your profile. Please try again.");
    return false;
  }
};



return(
  <ScrollView  contentContainerStyle={{ padding: 10 }}>

  <ThemedView style={styles.parent}>


  <ThemedView style={styles.titleContainer}>
          <ThemedText
            type="title"
            style={[
              styles.titleText,
              {fontFamily: Fonts.rounded,
                color: "#84C5BE", fontWeight:"bold", 
                    textShadowRadius: 2, textShadowColor: "#bdbaba", 
            }]}>
            Let's Room Link!
          </ThemedText>
          <ThemedView style={styles.profileContainer}>
      <ImageSelect
      label="Edit"
      variant="circle"
      size={120}
      onChange={(uri) => setImageUri(uri)}/>
    </ThemedView>


          
        </ThemedView>

        <ThemedView style={styles.nameContainer}>
          <ThemedText style={
              styles.nameText}>Name</ThemedText>

              <TextInput 
              style={styles.nameInput}
              onChangeText={setInputValue}
              value={inputValue}
              placeholder="Type your name.."/>

        </ThemedView>

        <ThemedView style={styles.ageContainer}>
        <ThemedText style={
              styles.ageText}>Age</ThemedText>

        <TextInput 
              style={styles.ageInput}
              onChangeText={ageSetInputValue}
              value={ageInputVal}
              placeholder="Age number.."/>
        </ThemedView>

        <ThemedView style={styles.genderContainer}>
        <ThemedText style={
              styles.genderText}>Gender</ThemedText>

          {genderOptions.map((option) => (
            <RadioButton
            key={option.value}
            label={option.label}
            isSelected={selectedValue === option.value}
            onPress={() => setSelectedValue(option.value)}/>
          ))}
        
       
        </ThemedView>

        <ThemedView style={styles.schoolContainer}>
        <ThemedText style={
              styles.schoolText}>School</ThemedText>
              {/* <View style={StyleSheet.absoluteFill} pointerEvents='box-none'> */}
              <InLineDropdown data={schools} onSelect={(item) => setDropdownVal(item)}/>
{/* </View> */}
  
        </ThemedView>

        <ThemedView style={styles.lifestyleContainer}>
        <ThemedText style={
              styles.lifestyleText}>Lifestyle Images</ThemedText>
              <ImageSelect
      label="Upload Picture"
      variant="rect"
      size={100}
      onChange={(uri) => setLifestyleUri(uri)}/>
        </ThemedView>

        <ThemedView style={styles.bioContainer}>
        <ThemedText style={
              styles.bioText}>Biography</ThemedText>
          
          <TextInput 
              style={styles.bioInput}
              onChangeText={bioSetInputValue}
              value={bioInputVal}
              placeholder="Write a small bio about yourself for others to see...."/>
        </ThemedView>

{/* Get the all inputs to save to database before moving forward */}
        <ThemedView>
          <TouchableOpacity  onPress={async () => {
            const saved = await saveprofile();
            if (saved) {
              router.push("/RoommateFeatureScreens/roommate-survey");
            }
          }}>
            <IconSymbol
                size={50}
                color="#808080"
                name="chevron.right"
                style={styles.arrowImage}
                                  />
          </TouchableOpacity>
        </ThemedView>



        </ThemedView>
        </ScrollView>
        
  );
  }

  
  const styles = StyleSheet.create({

    
    parent: {
      flex:1,
      backgroundColor: "#006E78",

    },
  
      titleContainer: {

        backgroundColor: '#fff',
        padding:30,
        alignItems: 'flex-start',
        gap: 8,
      },
      profileContainer: {
        // flex: 1,
        // backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        width:"100%",
      },

      nameContainer: {

        margin: 15,
        flexDirection: 'row',
        gap:10,
        borderRadius: 10,

        padding:10,
        backgroundColor: '#fff',

      },

      nameInput: {
        borderWidth:1,
        borderStyle: 'solid',
        borderRadius: 2,
      },

      ageInput: {
        borderWidth:1,
        borderStyle: 'solid',
        borderRadius: 2,

      },

      bioInput: {
        borderWidth:1,
        borderStyle: 'solid',
        // borderRadius:5,
        padding:2,
        borderRadius: 2,

      },

      ageContainer: {
        margin: 15,
        padding: 10,
        flexDirection: 'row',
        gap:10,
        backgroundColor: '#fff',
        borderRadius: 10,
      },

      genderContainer: {
        margin: 15,
        padding:10,
        backgroundColor: '#fff',
        borderRadius: 10,
      },

      schoolContainer: {
        margin: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
      },

      lifestyleContainer: {
        margin: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
      },

      bioContainer: {
        margin: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
      },

      circle: {
        height:24,
        width: 24,
        borderWidth:2,
        borderRadius: 12,

        justifyContent: 'space-between',
    
        flexDirection: 'row'
      },


      nameText: {
        textAlign: 'left',
      },

      ageText: {
        textAlign: 'left',
      },

      genderText: {
        textAlign: 'left',
      },

      schoolText: {
        textAlign: 'left',
      },

      lifestyleText: {
        textAlign: 'left',
      },

      bioText: {
        textAlign: 'left',
      },


      titleText: {
        color: '#006E78',
        width: '100%',
        textAlign: 'center',
  
      
      },
       arrowImage:{
        color: '#081a21',
        position: 'fixed',
        left: 300,
  },
    });