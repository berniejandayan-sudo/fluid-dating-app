import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { LoadingScreenView, SplashScreenView } from '../components/IntroScreens';
import { FilterProvider, useFilters } from '../lib/FilterContext';

function InnerLayout() {
  const router = useRouter();
  const { introStage, setIntroStage, isAuthenticated } = useFilters();

  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (introStage === 'splash') {
      timer = setTimeout(() => {
        setIntroStage('loading');
      }, 2500);
    } else if (introStage === 'loading') {
      timer = setTimeout(() => {
        setIntroStage('ready');
      }, 2500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [introStage, setIntroStage]);

  useEffect(() => {
    if (introStage === 'ready' && !isAuthenticated) {
      router.replace('/login');
    }
  }, [introStage, isAuthenticated]);

  if (introStage === 'splash') {
    return <SplashScreenView />;
  }

  if (introStage === 'loading') {
    return <LoadingScreenView />;
  }

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00FFFF',
        tabBarInactiveTintColor: '#8E8E9A',
        tabBarStyle: {
          backgroundColor: '#101018',
          borderTopColor: '#1E1E2A',
          height: 64,
        },
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: 'DISCOVER',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="albums-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'DASHBOARD',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="filters"
        options={{
          title: 'FILTERS',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="options-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          href: null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <FilterProvider>
      <InnerLayout />
    </FilterProvider>
  );
}
