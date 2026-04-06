import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type Props = {
  name: string;
  age: number;
  gender: string;
  school: string;
  avatarUrl: string;
};

export default function ProfileHeader({ name, age, gender, school, avatarUrl }: Props) {
  return (
    <View style={styles.row}>
      {avatarUrl ? (
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder} />
      )}
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.genderAge}>{gender}  {age}</Text>
        <Text style={styles.school}>{school}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 16,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#3FA495',
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  genderAge: {
    fontSize: 14,
    color: '#6B6B6B',
    marginTop: 4,
  },
  school: {
    fontSize: 14,
    color: '#6B6B6B',
    marginTop: 2,
  },
});
