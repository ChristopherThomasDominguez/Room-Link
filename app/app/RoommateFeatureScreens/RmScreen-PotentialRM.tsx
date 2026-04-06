import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Fonts } from '@/constants/theme';
import { useRouter } from 'expo-router';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfileBio from '@/components/profile/ProfileBio';
import ProfileHeader from '@/components/profile/ProfileHeader';
import LifestyleGrid from '@/components/profile/LifestyleGrid';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { UserProfile } from '@/lib/userService';
import { getPotentialMatches, RankedMatch } from '@/lib/compatibilityService';


//Map users to database of potential users
export default function roommates() {
    const router = useRouter();
    const [matches, setMatches] = useState<RankedMatch[]>([]);

    useEffect(() => {
        getPotentialMatches("mock-uid-001").then(setMatches);
    }, []);

return(


<ScrollView contentContainerStyle={{ padding: 20 }}>
  <Text style={{ fontSize: 30, marginBottom: 20,
                    color: "#84C5BE", fontWeight:"bold",
                    textShadowRadius: 2, textShadowColor: "#bdbaba", textShadowOffset: { width: 2, height: 1 }}}>Roommates</Text>

{/* //Map all potential users to this view */}
{matches.map((match) => (
  <ProfileCard key={match.user.uid}>

    <Text style={{ color: "#3FA495", fontWeight: "bold" }}>{match.score}% Match</Text>

    {/* ProfileHeader of ProfilePage */}
    <ProfileHeader
    name={match.user.name}
    age={match.user.age}
    gender={match.user.gender}
    school={match.user.school}
    avatarUrl={match.user.avatarUrl}>
    </ProfileHeader>


    {/* ProfileBio of ProfilePage */}
    <ProfileBio biography={match.user.biography}>
    </ProfileBio>

    {/* ProfileBio FinalizedProfile
    <LifestyleGrid images = {require('../../assets/images/avatars/avatar_1.png')}>

    </LifestyleGrid> */}


  </ProfileCard>
))}

</ScrollView>
     );
}


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
