import { Image } from 'expo-image';
import { Alert, View, Text, ScrollView, Button, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { useNavigation, useRouter } from 'expo-router';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfileBio from '@/components/profile/ProfileBio';
import ProfileHeader from '@/components/profile/ProfileHeader';
import LifestyleGrid from '@/components/profile/LifestyleGrid';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { getUserProfile, UserProfile } from '@/lib/userService';
import ProfileScreen from '../profileScreens/ProfileScreen';

const InitialPages2 = () => {
  const router = useRouter();
  
//Retrieve the http and format
const images_bio = ["https://picsum.photos/seed/beach/200"]

return(


<ScrollView contentContainerStyle={{ padding: 20 }}>
  <Text style={{ fontSize: 30, marginBottom: 20, 
                  color: "#84C5BE", fontWeight:"bold", 
                  textShadowRadius: 2, textShadowColor: "#bdbaba", textShadowOffset: { width: 2, height: 1 }}}>Finalized Profile!</Text>

{/* ToDo Add all of the components of the user into page using database*/}
  <ProfileCard>

    {/* ProfileHeader of ProfilePage */}
    <ProfileHeader 
    name = 'get'
    age = {22}
    gender = 'get' 
    school = 'get'
    avatarUrl = 'get'  >
    </ProfileHeader>


    {/* ProfileBio of ProfilePage */}
    <ProfileBio biography='ExampleTestingWaitingForDatabase'>
    </ProfileBio>
    
        {/* ProfileBio FinalizedProfile */}
    <LifestyleGrid images = {images_bio} >

    </LifestyleGrid>


  </ProfileCard>

  

{/* TheArrowForNextPage */}
  <View>
        <TouchableOpacity  onPress={() => router.push("/RoommateFeatureScreens/RmScreen3")}>
          <IconSymbol
              size={50}
              color="#808080"
              name="chevron.right"
              style={styles.arrowImage}
                                />
        </TouchableOpacity>
      </View>

</ScrollView>
     );
}

// This page is dedicated to the initial screens of pages
export default InitialPages2;


const styles = StyleSheet.create({
  pageContainer:{
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    marginBottom: 8,

  },
  titleContainer: {
    alignContent:'stretch',
    alignItems: 'center',
  },
   arrowImage:{
        color: '#081a21',
        position: 'absolute',
        left: 300,
  },


});