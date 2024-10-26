import './src/services/firebaseConfig'; // Import Firebase config first
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import TermsScreen from './src/screens/TermsScreen';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Auth
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Import Firestore

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track if user is logged in or not

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid)); // Get user document
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('User is logged in:', user.email, 'First Name:', userData.firstName); // Log email and first name
        } else {
          console.log('User document not found.');
        }
        setIsAuthenticated(true);
      } else {
        console.log('No user is logged in');
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);


  if (isAuthenticated === null) {
    // Optional: Render a loading screen or splash screen here
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        {isAuthenticated ? (
          // User is logged in, show Home screen
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        ) : (
          // User is not logged in, show Login and Register screens
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
