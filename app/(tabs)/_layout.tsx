import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/HapticTab';
import { Ionicons, Foundation, Feather } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        // ****** l'icon n'apparait pas en page active sauf si on commente la ligne ci-dessous
        // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected, 

        // ou alors on remplace la ligne si dessus par celle qui suit : (choix couleur)
        tabBarActiveTintColor: '#1059e0ff', // pour avoir la couleur de la page active OU simplement decommenter la ligne ci-dessus
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
        //#region index
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
          <Ionicons size={28} name="home" color={color} />
          ),
        }}
      />
      //#endregion
      //#region shop
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
          tabBarIcon: ({ color }) => (
             <Foundation size={28} name="shopping-cart" color={color} />
          ),
        }}
      />
      //#endregion
      //#region profile
       <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color }) => (
             <Feather size={28} name="user" color={color} />
          ),
        }}
      />
      //#endregion
      //#region search favorites cart
      <Tabs.Screen
        name="search"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="favorites"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="cart"
        options={{ href: null }}
      />
      //#endregion
    </Tabs>


  );
}
