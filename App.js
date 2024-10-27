// src/App.js

import './src/services/firebaseConfig'; 
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import TermsScreen from './src/screens/TermsScreen';
import AccountScreen from './src/screens/AccountScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DefaultHeader from './src/components/DefaultHeader'; 
import AccountHeader from './src/components/AccountHeader'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import { getFirestore, doc, getDoc } from "firebase/firestore"; 

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('User is logged in:', user.email, 'First Name:', userData.firstName);
        } else {
          console.log('User document not found.');
        }
        setIsAuthenticated(true);
      } else {
        console.log('No user is logged in');
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return null; // You might want to show a loading indicator here
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ 
                animationEnabled: false,
                gestureEnabled: false, 
                header: () => <DefaultHeader /> 
              }}
            />
            <Stack.Screen 
              name="Account" 
              component={AccountScreen} 
              options={{ 
                animationEnabled: false,
                gestureEnabled: false,
                header: (props) => <AccountHeader {...props} /> // Pass props to AccountHeader
              }} 
            />
            <Stack.Screen 
              name="Settings" 
              component={SettingsScreen} 
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: '#fff' },
                headerTintColor: 'black', 
                headerBackTitleVisible: false,
                headerBackImage: () => (
                  <Image
                    source={require('./assets/images/back_icon.png')} // Your custom back arrow icon
                    style={{ marginLeft: 10, width: 24, height: 20, tintColor: '#ffaa00' }} // Adjust size and color
                  />
                ),
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Terms And Conditions" component={TermsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
