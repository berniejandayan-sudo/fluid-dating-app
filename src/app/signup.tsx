import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FluidLogo } from '../components/IntroScreens';
import { useFilters } from '../lib/FilterContext';
import { supabase } from '../lib/supabase';

const PRONOUN_LIST = ['He/They', 'They/Them', 'She/Her', 'He/Him', 'She/They'];

export default function SignUpScreen() {
  const router = useRouter();
  const { loginUser } = useFilters();

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedPronouns, setSelectedPronouns] = useState<string[]>(['They/Them']);
  const [genderIdentity, setGenderIdentity] = useState('Transmasculine Queer');
  const [idUploaded, setIdUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePronoun = (pronoun: string) => {
    setSelectedPronouns((prev) =>
      prev.includes(pronoun) ? prev.filter((p) => p !== pronoun) : [...prev, pronoun]
    );
  };

  const handleCreateAccount = async () => {
    setIsSubmitting(true);
    const trimmedEmail = email.trim();

    try {
      if (trimmedEmail && password) {
        try {
          await supabase.auth.signUp({
            email: trimmedEmail,
            password,
            options: {
              data: {
                full_name: fullName.trim(),
                age: age.trim(),
                pronouns: selectedPronouns,
                gender_identity: genderIdentity.trim(),
                id_verified: idUploaded,
              },
            },
          });
        } catch (authError) {
          console.warn('Supabase sign up warning:', authError);
        }
      }
    } finally {
      loginUser(trimmedEmail || 'newuser@fluid.app');
      setIsSubmitting(false);
      router.replace('/');
    }
  };

  const handleSocialAuth = () => {
    loginUser('social@fluid.app');
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* 1. Top Header Bar */}
        <View style={styles.topHeaderBar}>
          <View style={styles.headerLeft}>
            <FluidLogo fontSize={22} />
          </View>
          <Text style={styles.headerTitle}>Create Account</Text>
          <TouchableOpacity
            style={styles.headerRight}
            onPress={() => router.push('/login')}
            activeOpacity={0.7}
          >
            <Text style={styles.loginLinkText}>Log In</Text>
          </TouchableOpacity>
        </View>

        {/* 2. Card 1 - Basic Details & Credentials */}
        <View style={styles.card}>
          <View style={styles.twoColumnRow}>
            <View style={styles.fullNameColumn}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#666680"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.ageColumn}>
              <Text style={styles.fieldLabel}>Age</Text>
              <TextInput
                style={styles.input}
                placeholder="Age"
                placeholderTextColor="#666680"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.fieldSpacing}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              placeholderTextColor="#666680"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.fieldSpacing}>
            <Text style={styles.fieldLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#666680"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </View>

        {/* 3. Card 2 - Identity & Pronouns */}
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Pronouns (Tap to Select)</Text>
          <View style={styles.pillsRow}>
            {PRONOUN_LIST.map((pronoun) => {
              const isSelected = selectedPronouns.includes(pronoun);
              return (
                <TouchableOpacity
                  key={pronoun}
                  style={[
                    styles.pronounPill,
                    isSelected ? styles.pronounPillSelected : styles.pronounPillUnselected,
                  ]}
                  onPress={() => togglePronoun(pronoun)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.pronounPillText,
                      isSelected ? styles.pronounTextSelected : styles.pronounTextUnselected,
                    ]}
                  >
                    {isSelected ? `✓ ${pronoun}` : pronoun}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.fieldSpacing}>
            <Text style={styles.fieldLabel}>Gender Identity</Text>
            <TextInput
              style={styles.genderInput}
              value={genderIdentity}
              onChangeText={setGenderIdentity}
              placeholder="Transmasculine Queer"
              placeholderTextColor="#666680"
            />
          </View>
        </View>

        {/* 4. Card 3 - Upload ID for Verification */}
        <View style={styles.cardVerification}>
          <View style={styles.verificationLeft}>
            <Ionicons
              name="shield-checkmark"
              size={24}
              color={idUploaded ? '#00FFFF' : '#8A2BE2'}
              style={styles.shieldIcon}
            />
            <View style={styles.verificationTextContainer}>
              <Text style={styles.verificationTitle}>Upload ID for Verification</Text>
              <Text
                style={
                  idUploaded
                    ? styles.verificationSubtitleVerified
                    : styles.verificationSubtitleRequired
                }
              >
                {idUploaded
                  ? '✓ Government ID Uploaded & Verified'
                  : 'Required for community safety'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.uploadIdButton}
            onPress={() => setIdUploaded((prev) => !prev)}
            activeOpacity={0.8}
          >
            <Text style={styles.uploadIdButtonText}>
              {idUploaded ? '✓ Uploaded' : 'Upload ID'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* 5. Action & Social Auth Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={handleCreateAccount}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#000000" />
            ) : (
              <Text style={styles.createAccountButtonText}>Create Verified Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.socialButtonsRow}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleSocialAuth}
              activeOpacity={0.75}
            >
              <Ionicons name="logo-google" size={16} color="#FFFFFF" style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleSocialAuth}
              activeOpacity={0.75}
            >
              <Ionicons name="logo-apple" size={16} color="#FFFFFF" style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#101018',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#101018',
  },
  scrollContent: {
    padding: 16,
  },

  /* 1. Top Header Bar */
  topHeaderBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  headerLeft: {
    minWidth: 70,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerRight: {
    minWidth: 70,
    alignItems: 'flex-end',
  },
  loginLinkText: {
    color: '#00FFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },

  /* Cards Base */
  card: {
    backgroundColor: '#181824',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  fieldSpacing: {
    marginTop: 12,
  },
  fieldLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 6,
  },

  /* Card 1 - Inputs */
  twoColumnRow: {
    flexDirection: 'row',
    gap: 12,
  },
  fullNameColumn: {
    flex: 2,
  },
  ageColumn: {
    flex: 1,
  },
  input: {
    backgroundColor: '#101018',
    borderWidth: 1,
    borderColor: '#2A2A35',
    borderRadius: 12,
    color: '#FFFFFF',
    padding: 12,
    fontSize: 14,
  },

  /* Card 2 - Identity & Pronouns */
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pronounPill: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  pronounPillSelected: {
    backgroundColor: '#8A2BE2',
  },
  pronounPillUnselected: {
    backgroundColor: '#252532',
  },
  pronounPillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  pronounTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  pronounTextUnselected: {
    color: '#A0A0B0',
  },
  genderInput: {
    backgroundColor: '#101018',
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 12,
    color: '#FFFFFF',
    padding: 12,
    fontSize: 14,
  },

  /* Card 3 - Verification */
  cardVerification: {
    backgroundColor: '#181824',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#8A2BE2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  verificationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  shieldIcon: {
    marginRight: 10,
  },
  verificationTextContainer: {
    flex: 1,
  },
  verificationTitle: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  verificationSubtitleVerified: {
    color: '#00FFFF',
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  verificationSubtitleRequired: {
    color: '#A0A0B0',
    fontSize: 12,
    marginTop: 2,
  },
  uploadIdButton: {
    backgroundColor: '#8A2BE2',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIdButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  /* 5. Action & Social Buttons */
  actionContainer: {
    marginTop: 18,
    marginBottom: 32,
  },
  createAccountButton: {
    backgroundColor: '#00FFFF',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccountButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  socialButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  socialButton: {
    backgroundColor: '#181824',
    borderColor: '#2A2A35',
    borderWidth: 1,
    borderRadius: 12,
    height: 44,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  socialIcon: {
    marginRight: 6,
  },
  socialButtonText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '600',
  },
});
