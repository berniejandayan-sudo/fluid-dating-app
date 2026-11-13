import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export interface FluidLogoProps {
  fontSize?: number;
}

export function FluidLogo({ fontSize = 36 }: FluidLogoProps) {
  return (
    <View style={styles.logoRow}>
      <Text style={[styles.logoText, { fontSize }]}>
        <Text style={styles.pinkText}>FL</Text>
        <Text style={styles.purpleText}>U</Text>
        <Text style={styles.cyanText}>ID</Text>
      </Text>
    </View>
  );
}

export function SplashScreenView() {
  return (
    <View style={styles.splashContainer}>
      {/* Top section */}
      <View style={styles.splashTopSection}>
        <View style={styles.topPillBadge}>
          <View style={styles.topDot} />
          <Text style={styles.topBadgeText}>V2.4 • INCLUSIVE SPACE</Text>
        </View>
      </View>

      {/* Center section */}
      <View style={styles.splashCenterSection}>
        <FluidLogo fontSize={42} />
        <Text style={styles.splashSubtitle}>Safe & Inclusive Dating</Text>
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.pinkDot]} />
          <View style={[styles.dot, styles.cyanDot]} />
          <View style={[styles.dot, styles.grayDot]} />
        </View>
      </View>

      {/* Bottom section */}
      <View style={styles.splashBottomSection}>
        <View style={styles.bottomPillBadge}>
          <Text style={styles.verifiedText}>✓ Mandatory ID Verified Community</Text>
        </View>
        <Text style={styles.splashSubtext}>A 100% queer-affirming sanctuary</Text>
      </View>
    </View>
  );
}

export function LoadingScreenView() {
  return (
    <View style={styles.loadingContainer}>
      <FluidLogo fontSize={40} />
      <ActivityIndicator size="large" color="#00FFFF" style={styles.loadingSpinner} />
      <Text style={styles.loadingTitle}>Loading Profiles...</Text>
      <Text style={styles.loadingSubtext}>Checking ID-verified matches near you</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Logo */
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  pinkText: {
    color: '#FF80FF',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  purpleText: {
    color: '#C77DFF',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  cyanText: {
    color: '#00FFFF',
    fontWeight: 'bold',
    letterSpacing: 2,
  },

  /* SplashScreenView */
  splashContainer: {
    flex: 1,
    backgroundColor: '#101018',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  splashTopSection: {
    marginTop: 60,
    alignItems: 'center',
  },
  topPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E2A',
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  topDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00FFFF',
    marginRight: 8,
  },
  topBadgeText: {
    color: '#A0A0B0',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  splashCenterSection: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashSubtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  pinkDot: {
    backgroundColor: '#FF80FF',
  },
  cyanDot: {
    backgroundColor: '#00FFFF',
  },
  grayDot: {
    backgroundColor: '#3A3A48',
  },
  splashBottomSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 48,
  },
  bottomPillBadge: {
    width: '100%',
    backgroundColor: '#B538F5',
    borderRadius: 9999,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  splashSubtext: {
    color: '#8E8E9E',
    fontSize: 13,
    marginTop: 12,
    textAlign: 'center',
  },

  /* LoadingScreenView */
  loadingContainer: {
    flex: 1,
    backgroundColor: '#101018',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  loadingSpinner: {
    marginVertical: 28,
  },
  loadingTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingSubtext: {
    color: '#8E8E9E',
    fontSize: 13,
    marginTop: 6,
    textAlign: 'center',
  },
});

export default SplashScreenView;
