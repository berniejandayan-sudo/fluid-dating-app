import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
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

export default function ProfileScreen() {
  const router = useRouter();
  const { replayIntro } = useFilters();
  const [copied, setCopied] = useState(false);

  const handleCopyHexCodes = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2200);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 1. Top Header Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.headerBackGroup}
            onPress={handleBack}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Back to previous screen"
          >
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
            <Text style={styles.headerBackText}>Profile Details</Text>
          </TouchableOpacity>

          <View style={styles.pinkProfileBadge}>
            <Ionicons name="person" size={17} color="#FF80FF" />
          </View>
        </View>

        {/* 2. Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.titleText}>App Icon Preview</Text>
          <Text style={styles.subtitleText}>
            Official brand asset & launcher specifications
          </Text>
        </View>

        {/* 3. Main Icon Showcase Card */}
        <View style={styles.showcaseCard}>
          <View style={styles.masterIconFrame}>
            <FluidLogo fontSize={36} />
          </View>
          <View style={styles.masterPill}>
            <Text style={styles.masterPillText}>
              ⚙ 220 x 220 px • Vector Master
            </Text>
          </View>
        </View>

        {/* 4. Size Variations Card */}
        <View style={styles.variationsCard}>
          <Text style={styles.cardSectionLabel}>SIZE VARIATIONS</Text>
          <View style={styles.variationsRow}>
            {/* 48px Mini */}
            <View style={styles.variationItem}>
              <View style={styles.box48}>
                <FluidLogo fontSize={9} />
              </View>
              <Text style={styles.variationLabel}>48px • Mini</Text>
            </View>

            {/* 64px Dock */}
            <View style={styles.variationItem}>
              <View style={styles.box64}>
                <FluidLogo fontSize={13} />
              </View>
              <Text style={styles.variationLabel}>64px • Dock</Text>
            </View>

            {/* 80px Store */}
            <View style={styles.variationItem}>
              <View style={styles.box80}>
                <FluidLogo fontSize={16} />
              </View>
              <Text style={styles.variationLabel}>80px • Store</Text>
            </View>
          </View>
        </View>

        {/* 5. Android Adaptive Masks Card */}
        <View style={styles.adaptiveCard}>
          <Text style={styles.cardSectionLabel}>ANDROID ADAPTIVE MASKS</Text>
          <View style={styles.adaptiveRow}>
            {/* Circle Mask */}
            <View style={styles.adaptiveItem}>
              <View style={styles.maskCircle}>
                <FluidLogo fontSize={14} />
              </View>
              <Text style={styles.variationLabel}>Circle (System Default)</Text>
            </View>

            {/* Squircle Mask */}
            <View style={styles.adaptiveItem}>
              <View style={styles.maskSquircle}>
                <FluidLogo fontSize={14} />
              </View>
              <Text style={styles.variationLabel}>Squircle (Adaptive)</Text>
            </View>
          </View>
        </View>

        {/* 6. Color Values Card */}
        <View style={styles.colorValuesCard}>
          <Text style={styles.cardSectionLabel}>COLOR VALUES</Text>

          {/* Row 1: Primary Spectrum */}
          <View style={styles.colorRow}>
            <View style={styles.colorLeft}>
              <LinearGradient
                colors={['#FF80FF', '#00FFFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.swatchCircle}
              />
              <Text style={styles.colorName}>Primary Spectrum</Text>
            </View>
            <Text style={styles.colorValue}>Pink (#FF80FF) - Cyan (#00FFFF)</Text>
          </View>

          <View style={styles.colorDivider} />

          {/* Row 2: Border Stroke */}
          <View style={styles.colorRow}>
            <View style={styles.colorLeft}>
              <View style={[styles.swatchCircle, styles.swatchViolet]} />
              <Text style={styles.colorName}>Border Stroke</Text>
            </View>
            <Text style={styles.colorValue}>Electric Violet (#8A2BE2) • 2.0 px</Text>
          </View>

          <View style={styles.colorDivider} />

          {/* Row 3: Obsidian Canvas */}
          <View style={styles.colorRow}>
            <View style={styles.colorLeft}>
              <View style={[styles.swatchCircle, styles.swatchObsidian]} />
              <Text style={styles.colorName}>Obsidian Canvas</Text>
            </View>
            <Text style={styles.colorValue}>Solid Base (#101018)</Text>
          </View>
        </View>

        {/* 7. Bottom Buttons */}
        <View style={styles.bottomButtonsContainer}>
          {/* Copy Asset Hex Codes Button */}
          <TouchableOpacity
            style={styles.copyHexButton}
            onPress={handleCopyHexCodes}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Copy Asset Hex Codes"
          >
            <Ionicons
              name={copied ? 'checkmark-circle-outline' : 'copy-outline'}
              size={18}
              color={copied ? '#00FFFF' : '#E2E8F0'}
              style={styles.buttonIcon}
            />
            <Text style={[styles.copyHexButtonText, copied && styles.copyHexButtonTextCopied]}>
              {copied ? 'Copied Hex Codes!' : 'Copy Asset Hex Codes'}
            </Text>
          </TouchableOpacity>

          {/* Replay Splash & Loading Intro Button */}
          <TouchableOpacity
            style={styles.replayButton}
            onPress={replayIntro}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Replay Splash and Loading Intro"
          >
            <Ionicons
              name="play-circle-outline"
              size={20}
              color="#101018"
              style={styles.buttonIcon}
            />
            <Text style={styles.replayButtonText}>
              Replay Splash & Loading Intro
            </Text>
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
    padding: 16,
    paddingBottom: 40,
  },

  /* 1. Top Header Row */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  headerBackGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  headerBackText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  pinkProfileBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 128, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: '#FF80FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* 2. Title Section */
  titleSection: {
    marginTop: 18,
    marginBottom: 4,
  },
  titleText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: '#8E8E9A',
    fontSize: 13,
    marginTop: 4,
  },

  /* 3. Main Icon Showcase Card */
  showcaseCard: {
    backgroundColor: '#181824',
    borderRadius: 16,
    padding: 24,
    marginTop: 16,
    alignItems: 'center',
  },
  masterIconFrame: {
    width: 200,
    height: 200,
    backgroundColor: '#0D0D14',
    borderRadius: 36,
    borderWidth: 2,
    borderColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  masterPill: {
    backgroundColor: '#101018',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#2A2A3C',
  },
  masterPillText: {
    color: '#8E8E9A',
    fontSize: 12,
    fontWeight: '600',
  },

  /* 4. Size Variations Card */
  variationsCard: {
    backgroundColor: '#181824',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  cardSectionLabel: {
    color: '#8E8E9A',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 16,
  },
  variationsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  variationItem: {
    alignItems: 'center',
  },
  box48: {
    width: 48,
    height: 48,
    backgroundColor: '#0D0D14',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box64: {
    width: 64,
    height: 64,
    backgroundColor: '#0D0D14',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box80: {
    width: 80,
    height: 80,
    backgroundColor: '#0D0D14',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  variationLabel: {
    color: '#8E8E9A',
    fontSize: 11,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },

  /* 5. Android Adaptive Masks Card */
  adaptiveCard: {
    backgroundColor: '#181824',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  adaptiveRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  adaptiveItem: {
    alignItems: 'center',
  },
  maskCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#0D0D14',
    borderWidth: 1.5,
    borderColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskSquircle: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: '#0D0D14',
    borderWidth: 1.5,
    borderColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* 6. Color Values Card */
  colorValuesCard: {
    backgroundColor: '#181824',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  colorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  swatchCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  swatchViolet: {
    backgroundColor: '#8A2BE2',
  },
  swatchObsidian: {
    backgroundColor: '#101018',
    borderWidth: 1.5,
    borderColor: '#3A3A4D',
  },
  colorName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  colorValue: {
    color: '#8E8E9A',
    fontSize: 12,
    fontWeight: '500',
  },
  colorDivider: {
    height: 1,
    backgroundColor: '#20202E',
    marginVertical: 2,
  },

  /* 7. Bottom Buttons */
  bottomButtonsContainer: {
    marginTop: 20,
    gap: 12,
  },
  copyHexButton: {
    backgroundColor: '#252532',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  copyHexButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  copyHexButtonTextCopied: {
    color: '#00FFFF',
  },
  replayButton: {
    backgroundColor: '#00FFFF',
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  replayButtonText: {
    color: '#101018',
    fontSize: 15,
    fontWeight: '700',
  },
});
