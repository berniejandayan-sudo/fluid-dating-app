import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
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
import { DEFAULT_SELECTED_TAGS, useFilters } from '../lib/FilterContext';

export default function FiltersScreen() {
  const router = useRouter();
  const {
    exploreHorizon,
    verifiedOnly,
    selectedTags,
    allAvailableTags,
    applyFilterState,
    resetFilterState,
  } = useFilters();

  // Local draft states initialized from the global filter context
  const [draftHorizon, setDraftHorizon] = useState<boolean>(exploreHorizon);
  const [draftVerified, setDraftVerified] = useState<boolean>(verifiedOnly);
  const [draftTags, setDraftTags] = useState<string[]>(selectedTags);

  // Sync draft states if the global filter context state resets/updates
  useEffect(() => {
    setDraftHorizon(exploreHorizon);
    setDraftVerified(verifiedOnly);
    setDraftTags(selectedTags);
  }, [exploreHorizon, verifiedOnly, selectedTags]);

  // Reset button action: resets both draft and global states
  const handleReset = () => {
    resetFilterState();
    setDraftHorizon(true);
    setDraftVerified(true);
    setDraftTags([...DEFAULT_SELECTED_TAGS]);
  };

  // Toggle relationship tag selection in local draft
  const toggleTag = (tag: string) => {
    setDraftTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  // Apply filter state to global context and navigate to Dashboard
  const handleApply = () => {
    applyFilterState(draftHorizon, draftVerified, draftTags);
    router.push('/');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Row */}
        <View style={styles.headerRow}>
          <FluidLogo fontSize={22} />
          <Text style={styles.headerTitle}>Filter Controls</Text>
          <TouchableOpacity
            onPress={handleReset}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Reset filters"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {/* Active Discovery State Box */}
        <View style={styles.discoveryStateCard}>
          <Text style={styles.discoveryStateHeader}>ACTIVE DISCOVERY STATE</Text>
          <View style={styles.statusPillsRow}>
            {/* Pill 1: Solid cyan */}
            <View style={styles.pillHorizon}>
              <Text style={styles.pillHorizonText}>
                {`Horizon: ${draftHorizon ? 'ON' : 'OFF'}`}
              </Text>
            </View>

            {/* Pill 2: Solid purple */}
            <View style={styles.pillVerified}>
              <Text style={styles.pillVerifiedText}>
                {`Verified: ${draftVerified ? 'ON' : 'OFF'}`}
              </Text>
            </View>

            {/* Pill 3: Dark slate */}
            <View style={styles.pillTags}>
              <Text style={styles.pillTagsText}>
                {`${draftTags.length} Tags Active`}
              </Text>
            </View>
          </View>
        </View>

        {/* Discovery Preferences Card */}
        <View style={styles.preferencesCard}>
          <Text style={styles.cardTitle}>Discovery Preferences</Text>

          {/* Row 1: Explore Horizon */}
          <View style={styles.preferenceRow}>
            <View style={styles.preferenceTextGroup}>
              <Text style={styles.preferenceLabel}>Explore Horizon</Text>
              <Text style={styles.preferenceSubtitle}>Expand discovery radius</Text>
            </View>
            <Switch
              value={draftHorizon}
              onValueChange={setDraftHorizon}
              trackColor={{ false: '#2C2C3D', true: '#00FFFF' }}
              thumbColor={Platform.OS === 'android' ? (draftHorizon ? '#0B0B14' : '#8E8E9A') : undefined}
              ios_backgroundColor="#2C2C3D"
            />
          </View>

          <View style={styles.rowDivider} />

          {/* Row 2: ID Verified Only */}
          <View style={styles.preferenceRow}>
            <View style={styles.preferenceTextGroup}>
              <Text style={styles.preferenceLabel}>ID Verified Only</Text>
              <Text style={styles.preferenceSubtitle}>Show only verified accounts</Text>
            </View>
            <Switch
              value={draftVerified}
              onValueChange={setDraftVerified}
              trackColor={{ false: '#2C2C3D', true: '#9D2BF5' }}
              thumbColor={Platform.OS === 'android' ? (draftVerified ? '#FFFFFF' : '#8E8E9A') : undefined}
              ios_backgroundColor="#2C2C3D"
            />
          </View>
        </View>

        {/* Relationship Tags (Tap to Toggle) Card */}
        <View style={styles.tagsCard}>
          <View style={styles.tagsHeaderRow}>
            <Text style={styles.tagsHeaderTitle}>Relationship Tags (Tap to Toggle)</Text>
            <Text style={styles.tagsCounterText}>{`${draftTags.length} selected`}</Text>
          </View>

          <View style={styles.tagsWrapRow}>
            {(allAvailableTags ?? []).map((tag) => {
              const isSelected = draftTags.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  activeOpacity={0.75}
                  style={[
                    styles.tagPill,
                    isSelected ? styles.tagPillSelected : styles.tagPillUnselected,
                  ]}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: isSelected }}
                  accessibilityLabel={tag}
                >
                  <Text
                    style={[
                      styles.tagPillText,
                      isSelected ? styles.tagTextSelected : styles.tagTextUnselected,
                    ]}
                  >
                    {isSelected ? `✓ ${tag}` : tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Primary Action Button */}
        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApply}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Apply Filter State"
        >
          <Text style={styles.applyButtonText}>Apply Filter State</Text>
        </TouchableOpacity>

        {/* Footer Note */}
        <Text style={styles.footerNote}>
          ✓ End-to-end moderated & verified queer matching pool
        </Text>
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
    paddingBottom: 32,
  },

  /* Top Header Row */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetButtonText: {
    color: '#00FFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  /* Active Discovery State Box */
  discoveryStateCard: {
    backgroundColor: '#161622',
    borderWidth: 1,
    borderColor: '#00FFFF',
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
  },
  discoveryStateHeader: {
    color: '#00FFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  statusPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  pillHorizon: {
    flex: 1,
    backgroundColor: '#00FFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillHorizonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
  },
  pillVerified: {
    flex: 1,
    backgroundColor: '#9D2BF5',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillVerifiedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
  },
  pillTags: {
    flex: 1,
    backgroundColor: '#222A38',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillTagsText: {
    color: '#00FFFF',
    fontWeight: 'bold',
    fontSize: 11,
    textAlign: 'center',
  },

  /* Discovery Preferences Card */
  preferencesCard: {
    backgroundColor: '#181824',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  preferenceTextGroup: {
    flex: 1,
    paddingRight: 12,
  },
  preferenceLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  preferenceSubtitle: {
    color: '#8E8E9A',
    fontSize: 13,
    marginTop: 3,
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#242436',
    marginVertical: 4,
  },

  /* Relationship Tags Card */
  tagsCard: {
    backgroundColor: '#181824',
    borderRadius: 16,
    padding: 16,
    marginTop: 14,
  },
  tagsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagsHeaderTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    flexShrink: 1,
    marginRight: 8,
  },
  tagsCounterText: {
    color: '#8E8E9A',
    fontSize: 13,
  },
  tagsWrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  tagPill: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
  },
  tagPillSelected: {
    backgroundColor: '#8A2BE2',
  },
  tagPillUnselected: {
    backgroundColor: '#252532',
  },
  tagPillText: {
    fontSize: 13,
  },
  tagTextSelected: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tagTextUnselected: {
    color: '#A0A0B2',
    fontWeight: '500',
  },

  /* Primary Action Button */
  applyButton: {
    width: '100%',
    backgroundColor: '#00FFFF',
    borderRadius: 14,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  applyButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },

  /* Footer Note */
  footerNote: {
    textAlign: 'center',
    color: '#8E8E9A',
    fontSize: 12,
    marginTop: 14,
    marginBottom: 24,
  },
});
