import { Image } from 'expo-image';
import {View, StyleSheet, TouchableOpacity } from 'react-native';
// import {View, Text, StyleSheet}  from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { useNavigation, useRouter } from 'expo-router';


const InitialPage = () => {
  const router = useRouter();
  return (

<View style={styles.pageContainer}>
<ThemedView style={styles.titleContainer}>
              <ThemedText
                type="title"
                style={{
                  fontFamily: Fonts.rounded,
                  alignContent: 'center',
                  alignItems: 'center',
                  padding: 20,
                }}>
                Hello User!
              </ThemedText>
              <ThemedText
                type="title"
                style={{
                  fontFamily: Fonts.rounded,
                  fontSize: 20,
                  padding: 30,
                }}>
                What Best Describes You?
              </ThemedText>
</ThemedView>

         <TouchableOpacity style={styles.buttoncontainer1} onPress={() => router.push("/RoommateFeatureScreens/roommate-profile")}>
            <ThemedText type="title"
            style={{fontFamily: Fonts.rounded,
                  color: 'white',
                  padding: 20,
                  fontSize: 20,
                  
                }}>
                First-Time User
              </ThemedText>
              <IconSymbol
                        size={50}
                        color="#808080"
                        name="chevron.right"
                        style={styles.arrowImage}
                      />
              </TouchableOpacity>

         <TouchableOpacity style={styles.buttoncontainer2}>
            <ThemedText type="title"
            style={{fontFamily: Fonts.rounded,
                  color: 'white',
                  padding: 20,
                  fontSize: 20,
                }}>
                Returning User
              </ThemedText>
          <IconSymbol
                          size={50}
                          color="#808080"
                          name="chevron.right"
                          style={styles.arrowImage}
                        />
         </TouchableOpacity>
</View>
      );
}

//This page is dedicated to the initial screens of pages
export default InitialPage;

const styles = StyleSheet.create({
  pageContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    marginBottom: 8,

  },
  titleContainer: {
    // flexDirection: 'column',
    // height: 200,
    // gap: 25,
    alignContent:'stretch',
    alignItems: 'center',
  },
  buttoncontainer1:{
    // flexDirection: 'space-evenly',
    height: 100,
    width: 300,
    backgroundColor: 'skyblue',
    alignItems: 'baseline',
    borderRadius: 20,
    elevation:10,
    // alignContent:'stretch',
    
  },
  buttoncontainer2:{
    //  flexDirection: 'column',
    height: 100,
    width: 300,
    backgroundColor: 'skyblue',
    alignItems: 'baseline',
    borderRadius: 20,
    elevation: 8,
    // alignContent:'center',
  },
  arrowImage:{
     color: '#f7f2f2',
     position: 'absolute',
     left: 250,
  },
  stepContainer: {
    marginBottom: 8,
    justifyContent: "center",

  },
});