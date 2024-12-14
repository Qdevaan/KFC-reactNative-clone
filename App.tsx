import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import HomeScreen from './screens/mainScreen/app copy';
import MenuScreen from './screens/menuScreen/app copy';
import DescriptionScreen from './screens/descriptionScreen/App copy';
import BucketScreen from './screens/cartScreen/App copy';
import AboutScreen from './screens/AboutScreen';
import LoginScreen from './screens/LoginScreen';
import * as ImagePicker from 'expo-image-picker';

const Stack = createStackNavigator();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  if (isLoading) {
    // You might want to show a loading screen here
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          <>
            {/* <Stack.Screen name="Login" component={LoginScreen} /> */}

            <Stack.Screen name="Home" component={HomeScreen} initialParams={{ user: session.user }} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Description" component={DescriptionScreen} />
            <Stack.Screen name="Bucket" component={BucketScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Menu" component={MenuScreen} />
            <Stack.Screen name="Description" component={DescriptionScreen} />
            <Stack.Screen name="Bucket" component={BucketScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

