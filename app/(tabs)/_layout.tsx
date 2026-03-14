import { Tabs } from 'expo-router';
import React from 'react';


import { HapticTab } from '@/components/haptic-tab';
import { StoreProvider, useStore } from '@/context/store-context';
import { Ionicons } from '@expo/vector-icons';
import AuthScreen from '@/components/auth';

function MainLayout() {
  const { user } = useStore();

  // If there's no user session, physically block the tabs and only show the Auth Gateway.
  if (!user) {
    return <AuthScreen />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#111',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 10,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Notes',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="document-text" color={color} />,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'New Note',
          tabBarIcon: ({ color }) => <Ionicons size={26} name="add-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons size={24} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
