import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { auth } from '../../lib/firebase';
import { getUserProfile, UserProfile } from '../../lib/userService';
import ProfileCard from '../../components/profile/ProfileCard';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileBio from '../../components/profile/ProfileBio';
import LifestyleGrid from '../../components/profile/LifestyleGrid';

export default function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // TEMPORARY: hardcoded uid for visual testing — replace with auth.currentUser?.uid before launch
    const uid = 'mock-uid-001';

    getUserProfile(uid)
      .then((data) => {
        setProfile(data);
      })
      .catch(() => {
        setError('Something went wrong loading your profile.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3FA495" />
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Could not load profile. Please try again later.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Finalized Profile!</Text>
      <ProfileCard>
        <ProfileHeader
          name={profile.name}
          age={profile.age}
          gender={profile.gender}
          school={profile.school}
          avatarUrl={profile.avatarUrl}
        />
        <View style={styles.gap} />
        <ProfileBio biography={profile.biography} />
        <View style={styles.gap} />
        <LifestyleGrid images={profile.lifestyleImages} />
      </ProfileCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#6B6B6B',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  scroll: {
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3FA495',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  gap: {
    height: 16,
  },
});
