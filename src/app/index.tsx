import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FluidLogo } from '../components/IntroScreens';
import { useFilters } from '../lib/FilterContext';

interface MatchItem {
  id: string;
  name: string;
  pronouns: string;
  avatarUrl: string;
}

const RECENT_MATCHES: MatchItem[] = [
  {
    id: '1',
    name: 'Riley, 28',
    pronouns: 'He/They',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '2',
    name: 'Sam, 25',
    pronouns: 'She/Her',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: '3',
    name: 'Jordan, 27',
    pronouns: 'They/Them',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
  },
];

export default function MobileDashboardScreen() {
  const router = useRouter();
  const { exploreHorizon, verifiedOnly, selectedTags, replayIntro } = useFilters();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Top Header Bar */}
        <View style={styles.headerBar}>
          <FluidLogo fontSize={26} />
          <TouchableOpacity
            style={styles.userIconButton}
            onPress={replayIntro}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Replay Splash & Loading sequence"
          >
            <Ionicons name="person" size={20} color="#101018" />
          </TouchableOpacity>
        </View>

        {/* 2. ID Verification Banner */}
        <View style={styles.idVerificationBanner}>
          <Text style={styles.idVerificationText}>✓ ID VERIFIED STATUS: ACTIVE</Text>
        </View>

        {/* 3. Community Pulse Bar */}
        <View style={styles.communityPulseCard}>
          <View style={styles.pulseLeftGroup}>
            <View style={styles.pulseDot} />
            <Text style={styles.pulseTitle}>Community Pulse</Text>
          </View>
          <Text style={styles.pulseCount}>42 Queer folks nearby now</Text>
        </View>

        {/* 4. Recent Matches Card */}
        <View style={styles.recentMatchesCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderLeft}>
              <Text style={styles.cardTitle}>Recent Matches</Text>
              <View style={styles.cyanDotSmall} />
            </View>
            <Text style={styles.headerRightText}>3 New</Text>
          </View>

          {RECENT_MATCHES.map((match, index) => (
            <React.Fragment key={match.id}>
              <View style={styles.matchRow}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: match.avatarUrl }}
                    style={styles.avatarImage}
                    contentFit="cover"
                  />
                </View>
                <View style={styles.matchInfo}>
                  <Text style={styles.matchName}>{match.name}</Text>
                  <Text style={styles.matchPronouns}>{match.pronouns}</Text>
                </View>
                <TouchableOpacity style={styles.chatButton} activeOpacity={0.8}>
                  <Text style={styles.chatButtonText}>Chat</Text>
                </TouchableOpacity>
              </View>
              {index < RECENT_MATCHES.length - 1 && <View style={styles.matchDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* 5. Your Active Filters Card */}
        <View style={styles.filtersCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Your Active Filters</Text>
            <TouchableOpacity onPress={() => router.push('/filters')} activeOpacity={0.7}>
              <Text style={styles.editLink}>Edit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.filterBadgesRow}>
            {/* First Pill: Explore Horizon */}
            <View
              style={[
                styles.filterPill,
                exploreHorizon ? styles.horizonPillOn : styles.horizonPillOff,
              ]}
            >
              <Text
                style={[
                  styles.filterPillText,
                  exploreHorizon ? styles.horizonTextOn : styles.horizonTextOff,
                ]}
              >
                {exploreHorizon ? 'Explore Horizon: ON' : 'Explore Horizon: OFF'}
              </Text>
            </View>

            {/* Verified Only Pill */}
            {verifiedOnly && (
              <View style={[styles.filterPill, styles.verifiedPill]}>
                <Text style={[styles.filterPillText, styles.verifiedText]}>
                  ✓ Verified Only
                </Text>
              </View>
            )}

            {/* Selected Tag Pills */}
            {(selectedTags ?? []).map((tag) => (
              <View key={tag} style={[styles.filterPill, styles.tagPill]}>
                <Text style={[styles.filterPillText, styles.tagText]}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 6. Bottom Moderation Note */}
        <View style={styles.moderationCard}>
          <MaterialCommunityIcons
            name="shield-check"
            size={20}
            color="#00FFFF"
            style={styles.moderationIcon}
          />
          <Text style={styles.moderationText}>
            End-to-end moderated space. Zero tolerance for harassment or deadnaming.
          </Text>
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
    backgroundColor: '#101018',
    padding: 16,
    paddingBottom: 24,
  },

  /* 1. Top Header Bar */
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF80FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* 2. ID Verification Banner */
  idVerificationBanner: {
    width: '100%',
    backgroundColor: '#B538F5',
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  idVerificationText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 0.5,
  },

  /* 3. Community Pulse Bar */
  communityPulseCard: {
    backgroundColor: '#181824',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pulseLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FFFF',
    marginRight: 8,
  },
  pulseTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  pulseCount: {
    color: '#8E8E9A',
    fontSize: 13,
  },

  /* 4. Recent Matches Card */
  recentMatchesCard: {
    backgroundColor: '#181824',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cyanDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00FFFF',
    marginLeft: 8,
  },
  headerRightText: {
    color: '#8E8E9A',
    fontSize: 13,
    fontWeight: '500',
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#262636',
    marginRight: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  matchInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  matchName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  matchPronouns: {
    color: '#8E8E9A',
    fontSize: 13,
    marginTop: 2,
  },
  chatButton: {
    backgroundColor: '#00FFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 13,
  },
  matchDivider: {
    height: 1,
    backgroundColor: '#262636',
    marginVertical: 12,
  },

  /* 5. Your Active Filters Card */
  filtersCard: {
    backgroundColor: '#181824',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  editLink: {
    color: '#00FFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  filterBadgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterPill: {
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  horizonPillOn: {
    backgroundColor: '#00FFFF',
  },
  horizonTextOn: {
    color: '#000000',
    fontWeight: 'bold',
  },
  horizonPillOff: {
    backgroundColor: '#2A2A35',
  },
  horizonTextOff: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  verifiedPill: {
    backgroundColor: '#B538F5',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tagPill: {
    backgroundColor: '#C837F5',
  },
  tagText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  /* 6. Bottom Moderation Note */
  moderationCard: {
    backgroundColor: '#181824',
    borderRadius: 12,
    padding: 12,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moderationIcon: {
    marginRight: 10,
  },
  moderationText: {
    flex: 1,
    color: '#8E8E9A',
    fontSize: 12,
    lineHeight: 18,
  },
});
