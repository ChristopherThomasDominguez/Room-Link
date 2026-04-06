import { Image } from 'expo-image';
import {View, ScrollView, StyleSheet, TouchableOpacity , Dimensions} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useNavigation, useRouter } from 'expo-router';
// import BackgroundInfo from '@/components/BackgroundInfo'

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

//Page used as Information description for the next pages

const InfoPage2 = () => {
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
                }}>Let's Meet Your Future Roommate! </ThemedText>

    {/* TheArrowForNextPage */}
    <View>
        <TouchableOpacity onPress={() => router.push("/RoommateFeatureScreens/RmScreen-PotentialRM")}>
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

  export default InfoPage2;

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
