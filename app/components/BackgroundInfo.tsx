import { ImageBackground } from 'expo-image';
import React from 'react';
import { View, Text, StyleSheet , Dimensions} from 'react-native';

type Props = {
    InfoText: React.ReactNode
}

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;


export default function InformationCard({ InfoText }: Props) {
  return (
  <View style={styles.card}>
    <Text style={styles.textContainer}>{InfoText}</Text>
</View>
);
}


const styles = StyleSheet.create({
    card:{
        height: 300,
        width:350,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
    },
    textContainer:{
       fontSize: 60,
        color: '#f3eeee',
        textAlign: 'center',

    },

})