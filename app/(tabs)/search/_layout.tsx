import { Stack, Tabs, usePathname } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/systermComponents/HapticTab';
import { IconSymbol } from '@/components/systermComponents/ui/IconSymbol';
import TabBarBackground from '@/components/systermComponents/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const pathName = usePathname();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>

      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
        }} />

      <Stack.Screen
        name='[categoreID]'
        options={{
          headerShown: false,
          animation: pathName.startsWith("/search") ? "default" : "none",
        }}
      />
      
    </Stack>
  );
}
