import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

//Modified the screen images
type Props = {
  images: string[];
};

const SCREEN_WIDTH = Dimensions.get('window').width;
// Screen padding: 16 * 2 = 32 (from ScrollView paddingHorizontal: 16)
// Card padding:   20 * 2 = 40 (from ProfileCard)
// Image margins:   4 * 2 * 3 = 24 (margin: 4 on each side of each of 3 images)
const IMAGE_SIZE = (SCREEN_WIDTH - 32 - 40 - 24) / 3;

export default function LifestyleGrid({ images }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Lifestyle Images</Text>
      {images.length > 0 && (
        <View style={styles.grid}>
          {images.map((uri, index) => (
            <Image
              key={index}
              source={{ uri }}
              style={styles.image}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    textAlign: 'left',
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    margin: 4,
  },
});
