import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FluidLogo } from '../components/IntroScreens';
import { useFilters } from '../lib/FilterContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// High-res profile image: stylish person on city street with neon bokeh
const PROFILE_IMAGE_URL =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=85';

export default function DiscoverScreen() {
  const router = useRouter();
  const { exploreHorizon, setExploreHorizon, selectedTags } = useFilters();
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleAction = (label: string) => {
    setActionFeedback(label);
    setTimeout(() => {
      setActionFeedback(null);
    }, 1200);
  };

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case 'Relationship':
        return {
          pill: styles.tagAmberPill,
          text: styles.tagAmberText,
          hasIcon: true,
        };
      case 'Monogamy':
        return {
          pill: styles.tagCyanPill,
          text: styles.tagCyanText,
          hasIcon: false,
        };
      case 'Trans-Friendly Spaces':
        return {
          pill: styles.tagPurplePill,
          text: styles.tagPurpleText,
          hasIcon: false,
        };
      case 'Casual':
        return {
          pill: styles.tagPinkPill,
          text: styles.tagPinkText,
          hasIcon: false,
        };
      case 'Polyamorous':
        return {
          pill: styles.tagLavenderPill,
          text: styles.tagLavenderText,
          hasIcon: false,
        };
      case 'Friendship':
        return {
          pill: styles.tagGreenPill,
          text: styles.tagGreenText,
          hasIcon: false,
        };
      default:
        return {
          pill: styles.tagDefaultPill,
          text: styles.tagDefaultText,
          hasIcon: false,
        };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />

      {/* ── 1. Top Header Row ── */}
      <View style={styles.header}>
        {/* Left: Filter Shortcut */}
        <TouchableOpacity
          style={styles.headerIconButton}
          activeOpacity={0.75}
          onPress={() => router.push('/filters')}
          accessibilityRole="button"
          accessibilityLabel="Open Filters"
        >
          <MaterialCommunityIcons name="tune-variant" size={20} color="#E2E8F0" />
        </TouchableOpacity>

        {/* Center: FLUID Logo */}
        <FluidLogo fontSize={24} />

        {/* Right: Profile Shortcut */}
        <TouchableOpacity
          style={styles.avatarButton}
          activeOpacity={0.75}
          onPress={() => router.push('/profile')}
          accessibilityRole="button"
          accessibilityLabel="Open Profile App Icon Preview"
        >
          <Ionicons name="person" size={17} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── 2. Active Explore Horizon Pill Synced With useFilters() ── */}
        <View style={styles.horizonBarContainer}>
          <TouchableOpacity
            style={[
              styles.horizonPill,
              exploreHorizon ? styles.horizonPillActive : styles.horizonPillInactive,
            ]}
            onPress={() => setExploreHorizon((prev) => !prev)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`Explore Horizon is ${exploreHorizon ? 'Active' : 'Off'}`}
          >
            <View style={styles.horizonLeft}>
              <Ionicons
                name="compass-outline"
                size={17}
                color={exploreHorizon ? '#00FFFF' : '#8E8E9A'}
              />
              <Text
                style={[
                  styles.horizonLabel,
                  exploreHorizon ? styles.horizonLabelActive : styles.horizonLabelInactive,
                ]}
              >
                EXPLORE HORIZON
              </Text>
            </View>

            <View style={styles.horizonRight}>
              <View
                style={[
                  styles.horizonDot,
                  exploreHorizon ? styles.horizonDotActive : styles.horizonDotInactive,
                ]}
              />
              <Text
                style={[
                  styles.horizonStatusText,
                  exploreHorizon ? styles.horizonStatusTextActive : styles.horizonStatusTextInactive,
                ]}
              >
                {exploreHorizon ? 'ACTIVE' : 'OFF'}
              </Text>
              <Switch
                value={exploreHorizon}
                onValueChange={setExploreHorizon}
                trackColor={{ false: '#262D3D', true: '#00FFFF' }}
                thumbColor={exploreHorizon ? '#FFFFFF' : '#8E8E9A'}
                ios_backgroundColor="#262D3D"
                style={Platform.OS === 'ios' ? { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] } : {}}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* ── 3. Main Discover Profile Card ── */}
        <View style={styles.cardContainer}>
          <View style={styles.profileCard}>
            {/* Background Profile Photo */}
            <Image
              source={{ uri: PROFILE_IMAGE_URL }}
              style={styles.profileImage}
              contentFit="cover"
              transition={300}
            />

            {/* Top Story / Progress Indicator Bars */}
            <View style={styles.storyBarsContainer}>
              <View style={[styles.storyBar, styles.storyBarActive]} />
              <View style={[styles.storyBar, styles.storyBarInactive]} />
            </View>

            {/* Action Feedback Overlay (when user taps button) */}
            {actionFeedback && (
              <View style={styles.actionFeedbackOverlay}>
                <Text style={styles.actionFeedbackText}>{actionFeedback}</Text>
              </View>
            )}

            {/* Dark Gradient Overlay for Text Legibility */}
            <LinearGradient
              colors={['transparent', 'rgba(16, 16, 24, 0.4)', 'rgba(16, 16, 24, 0.95)', '#101018']}
              locations={[0, 0.4, 0.75, 1]}
              style={styles.gradientOverlay}
            />

            {/* Profile Information Overlay */}
            <View style={styles.cardDetails}>
              {/* Badges Row: Purple "✓ ID VERIFIED" + "2 miles away" */}
              <View style={styles.badgeRow}>
                {/* Purple "✓ ID VERIFIED" Badge */}
                <View style={styles.verifiedBadgePurple}>
                  <Text style={styles.verifiedBadgeText}>✓ ID VERIFIED</Text>
                </View>

                {/* "2 miles away" Badge */}
                <View style={styles.distanceBadge}>
                  <Ionicons name="location-outline" size={13} color="#00FFFF" />
                  <Text style={styles.distanceText}>2 miles away</Text>
                </View>
              </View>

              {/* Name & Age Row */}
              <View style={styles.nameRow}>
                <Text style={styles.nameText}>RILEY, 28</Text>
                <TouchableOpacity
                  style={styles.infoButton}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel="View Riley's details"
                >
                  <Ionicons name="information-circle-outline" size={24} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              {/* Pronouns & Gender Identity */}
              <View style={styles.identityContainer}>
                <Text style={styles.identityLine}>
                  <Text style={styles.identityLabel}>Pronouns: </Text>
                  <Text style={styles.identityValue}>He / They</Text>
                </Text>
                <Text style={styles.identityLine}>
                  <Text style={styles.identityLabel}>Gender Identity: </Text>
                  <Text style={styles.identityValue}>Transmasculine Queer</Text>
                </Text>
              </View>

              {/* Relationship Tags Synced From useFilters() */}
              <View style={styles.tagsContainer}>
                {selectedTags && selectedTags.length > 0 ? (
                  selectedTags.map((tag) => {
                    const styleConfig = getTagStyle(tag);
                    return (
                      <View key={tag} style={[styles.tagPill, styleConfig.pill]}>
                        {styleConfig.hasIcon && (
                          <Text style={styles.tagStarIcon}>✦ </Text>
                        )}
                        <Text style={[styles.tagText, styleConfig.text]}>
                          {tag}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <View style={styles.noTagsPill}>
                    <Text style={styles.noTagsText}>No tags selected</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* ── 4. Bottom Row of 4 Circular Action Buttons ── */}
        <View style={styles.actionBar}>
          {/* Button 1: Rewind (Amber / Yellow) */}
          <TouchableOpacity
            style={[styles.actionButton, styles.rewindButton]}
            activeOpacity={0.75}
            onPress={() => handleAction('Rewind')}
            accessibilityRole="button"
            accessibilityLabel="Rewind Profile"
          >
            <Ionicons name="reload" size={20} color="#EAB308" />
          </TouchableOpacity>

          {/* Button 2: Pass X (Coral / Red) */}
          <TouchableOpacity
            style={[styles.actionButton, styles.passButton]}
            activeOpacity={0.75}
            onPress={() => handleAction('Passed')}
            accessibilityRole="button"
            accessibilityLabel="Pass Profile"
          >
            <Ionicons name="close" size={28} color="#F87171" />
          </TouchableOpacity>

          {/* Button 3: Super Like Star (Cyan) */}
          <TouchableOpacity
            style={[styles.actionButton, styles.superLikeButton]}
            activeOpacity={0.75}
            onPress={() => handleAction('Super Liked!')}
            accessibilityRole="button"
            accessibilityLabel="Super Like Profile"
          >
            <Ionicons name="star" size={22} color="#00FFFF" />
          </TouchableOpacity>

          {/* Button 4: Like Heart (Purple / Pink Gradient) */}
          <TouchableOpacity
            style={styles.likeButtonWrapper}
            activeOpacity={0.85}
            onPress={() => handleAction('Liked!')}
            accessibilityRole="button"
            accessibilityLabel="Like Profile"
          >
            <LinearGradient
              colors={['#FF80FF', '#C084FC', '#8A2BE2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.likeButtonGradient}
            >
              <Ionicons name="heart" size={30} color="#FFFFFF" />
            </LinearGradient>
          </TouchableOpacity>
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
    paddingBottom: 24,
    alignItems: 'center',
  },

  /* ── 1. Top Header ── */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 12 : 8,
    paddingBottom: 12,
    backgroundColor: '#101018',
  },
  headerIconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#181824',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#262D3D',
  },
  avatarButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#8A2BE2',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF80FF',
  },

  /* ── 2. Explore Horizon Pill ── */
  horizonBarContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 4,
    marginBottom: 12,
    alignItems: 'center',
  },
  horizonPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 28,
    borderWidth: 1,
    width: '100%',
    maxWidth: 380,
  },
  horizonPillActive: {
    backgroundColor: '#181824',
    borderColor: '#00FFFF',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  horizonPillInactive: {
    backgroundColor: '#151520',
    borderColor: '#262D3D',
  },
  horizonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  horizonLabel: {
    fontSize: 12.5,
    fontWeight: '800',
    letterSpacing: 1.1,
  },
  horizonLabelActive: {
    color: '#FFFFFF',
  },
  horizonLabelInactive: {
    color: '#8E8E9A',
  },
  horizonRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  horizonDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  horizonDotActive: {
    backgroundColor: '#00FFFF',
    shadowColor: '#00FFFF',
    shadowRadius: 4,
    shadowOpacity: 0.8,
  },
  horizonDotInactive: {
    backgroundColor: '#8E8E9A',
  },
  horizonStatusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  horizonStatusTextActive: {
    color: '#00FFFF',
  },
  horizonStatusTextInactive: {
    color: '#8E8E9A',
  },

  /* ── 3. Main Discover Profile Card ── */
  cardContainer: {
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  profileCard: {
    width: Math.min(SCREEN_WIDTH - 32, 420),
    height: Math.min(SCREEN_HEIGHT * 0.56, 520),
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#181824',
    position: 'relative',
    borderWidth: 1.5,
    borderColor: 'rgba(138, 43, 226, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.55,
    shadowRadius: 18,
    elevation: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  storyBarsContainer: {
    position: 'absolute',
    top: 12,
    left: 14,
    right: 14,
    flexDirection: 'row',
    gap: 8,
    zIndex: 10,
  },
  storyBar: {
    flex: 1,
    height: 3,
    borderRadius: 2,
  },
  storyBarActive: {
    backgroundColor: '#FFFFFF',
  },
  storyBarInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  actionFeedbackOverlay: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: 'rgba(16, 16, 24, 0.85)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00FFFF',
    zIndex: 20,
  },
  actionFeedbackText: {
    color: '#00FFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%',
  },

  /* Profile Details Inside Card */
  cardDetails: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  verifiedBadgePurple: {
    backgroundColor: '#8A2BE2',
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C084FC',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  verifiedBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 16, 24, 0.75)',
    paddingHorizontal: 10,
    paddingVertical: 4.5,
    borderRadius: 14,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.3)',
  },
  distanceText: {
    color: '#00FFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  infoButton: {
    padding: 2,
  },
  identityContainer: {
    marginBottom: 10,
    gap: 2,
  },
  identityLine: {
    fontSize: 13,
    lineHeight: 18,
  },
  identityLabel: {
    color: '#8E8E9A',
    fontWeight: '500',
  },
  identityValue: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
  },
  tagStarIcon: {
    color: '#FBBF24',
    fontSize: 10,
  },
  tagAmberPill: {
    backgroundColor: 'rgba(245, 158, 11, 0.18)',
    borderColor: '#F59E0B',
  },
  tagAmberText: {
    color: '#FBBF24',
  },
  tagCyanPill: {
    backgroundColor: 'rgba(0, 255, 255, 0.15)',
    borderColor: '#00FFFF',
  },
  tagCyanText: {
    color: '#00FFFF',
  },
  tagPurplePill: {
    backgroundColor: 'rgba(138, 43, 226, 0.25)',
    borderColor: '#8A2BE2',
  },
  tagPurpleText: {
    color: '#D8B4FE',
  },
  tagPinkPill: {
    backgroundColor: 'rgba(255, 128, 255, 0.2)',
    borderColor: '#FF80FF',
  },
  tagPinkText: {
    color: '#FF80FF',
  },
  tagLavenderPill: {
    backgroundColor: 'rgba(192, 132, 252, 0.2)',
    borderColor: '#C084FC',
  },
  tagLavenderText: {
    color: '#E9D5FF',
  },
  tagGreenPill: {
    backgroundColor: 'rgba(52, 211, 153, 0.18)',
    borderColor: '#34D399',
  },
  tagGreenText: {
    color: '#6EE7B7',
  },
  tagDefaultPill: {
    backgroundColor: 'rgba(138, 43, 226, 0.15)',
    borderColor: '#8A2BE2',
  },
  tagDefaultText: {
    color: '#FFFFFF',
  },
  noTagsPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#1E1E2A',
  },
  noTagsText: {
    color: '#8E8E9A',
    fontSize: 11,
    fontStyle: 'italic',
  },

  /* ── 4. Bottom Row of 4 Circular Action Buttons ── */
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    gap: 16,
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#181824',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  rewindButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: 'rgba(234, 179, 8, 0.35)',
  },
  passButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderColor: 'rgba(248, 113, 113, 0.4)',
    shadowColor: '#F87171',
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  superLikeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: 'rgba(0, 255, 255, 0.4)',
    shadowColor: '#00FFFF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  likeButtonWrapper: {
    borderRadius: 33,
    overflow: 'hidden',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.65,
    shadowRadius: 14,
    elevation: 8,
  },
  likeButtonGradient: {
    width: 66,
    height: 66,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
