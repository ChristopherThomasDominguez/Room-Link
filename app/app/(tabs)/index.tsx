import { Image } from 'expo-image';
import { View, Platform, StyleSheet, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useNavigation, useRouter } from 'expo-router';
import { Fonts } from '@/constants/theme';

// Made Changes to home screen --Provisional until Sprint3
export default function HomeScreen() {
   const router = useRouter();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
        {/* Provisional HomePage Button to just move to new page */}
        <View style= {styles.stepContainer}>
          <TouchableOpacity style={styles.buttoncont} onPress={() => router.push("/RoommateFeatureScreens/RmScreen1")}>
          <ThemedText type="title"
                      style={{fontFamily: Fonts.rounded,
                            color: 'black',
                            fontSize: 20,
                          }}>
                          Roommate Page
                        </ThemedText>
                        
          </TouchableOpacity>
          </View>
    </ParallaxScrollView>
  );
}

//Need to modify the style for button later in Sprint3
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
    backgroundColor: "white",
  },
  stepContainer: {
    marginBottom: 8,
    justifyContent: "center",

  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  // ADDED the button style
  buttoncont: {
    height: 100,
    width: 150,
    fontSize: 20,
    backgroundColor: "skyblue",

    
  }
});
