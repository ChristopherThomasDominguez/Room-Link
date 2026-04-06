import { Image } from 'expo-image';
import {View, ScrollView, StyleSheet, TouchableOpacity , Dimensions} from 'react-native';
// import {View, Text, StyleSheet}  from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useNavigation, useRouter } from 'expo-router';
// import BackgroundInfo from '@/components/BackgroundInfo'

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

//Page is a Information page Describing next steps to user
//The button has functionality to move to next page

const InfoPage1 = () => {
  const router = useRouter();
  return (
    <View style={styles.pageContainer}>
        <ThemedText  type="title"
            style={{fontFamily: Fonts.rounded,
                  color: 'white',
                  fontSize: 60,
                  lineHeight: 50,
                  textAlign:'center',
                  padding: 30,
                }}>Let Us Connect You! </ThemedText>

    {/* TheArrowForNextPage */}
    <View>
        <TouchableOpacity onPress={() => router.push("/RoommateFeatureScreens/roommate-survey")}>
            <IconSymbol
                size={70}
                color="#7a0c0c"
                name="chevron.right"
                style={styles.arrowImage}
                                />
        </TouchableOpacity>
    </View>
    </View>
  );}

  export default InfoPage1;

  const styles = StyleSheet.create({
    pageContainer:{
        height: screenHeight,
        width: screenWidth,
        alignItems: 'center',
        backgroundColor: 'skyblue',
        marginBottom: 8,
        justifyContent: 'center'

    },
     arrowImage:{
        color: '#171919',
        position: 'fixed',
        left: 100,
  },

  })
