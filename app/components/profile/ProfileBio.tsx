import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  biography: string;
};

export default function ProfileBio({ biography }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Biography</Text>
      <Text style={styles.body}>{biography}</Text>
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
  body: {
    fontSize: 14,
    color: '#1A1A1A',
    textAlign: 'center',
    lineHeight: 22,
  },
});
