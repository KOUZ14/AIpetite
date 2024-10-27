import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFirstName(userData.firstName); // Set the user's first name
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigation.navigate('Login');
    }).catch((error) => {
      console.error("Logout error: ", error);
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.welcomeText}>Welcome, {firstName || auth.currentUser?.email}!</Text>
      </View>

      {/* Search bar with icon */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Image source={require('../../assets/images/search_icon.png')} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Restaurants"
            placeholderTextColor="#888"
          />
        </View>
      </View>
      
      <Text style={styles.recommendationText}>Recommendations For You:</Text>

      <ScrollView style={styles.restaurantList}>
        <View style={styles.restaurantBox}>
          <Image source={require('../../assets/images/bagel.png')} style={styles.restaurantImage} />
          <Text style={styles.restaurantInfo}>Eswar's Bagels</Text>
          <Text style={styles.restaurantInfo}>★ 4.8 • 0.1 miles away • 15 reviews</Text>
        </View>
        <View style={styles.restaurantBox}>
          <Image source={require('../../assets/images/sample_restaurant.png')} style={styles.restaurantImage} />
          <Text style={styles.restaurantInfo}>Jose's Hotdogs</Text>
          <Text style={styles.restaurantInfo}>★ 4.2 • 2.7 miles away • 20 reviews</Text>
        </View>
        <View style={styles.restaurantBox}>
          <Image source={require('../../assets/images/krusty_krab.png')} style={styles.restaurantImage} />
          <Text style={styles.restaurantInfo}>Krusty Krab</Text>
          <Text style={styles.restaurantInfo}>★ 2.0 • 3.2 miles away • 5 reviews</Text>
        </View>
      </ScrollView>

      {/* Static Tab Bar at the bottom */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('MysteryPick')}>
          <Image source={require('../../assets/images/wheel_icon.png')} style={styles.tabIcon} />
          <Text style={styles.tabLabel}>Mystery Pick</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Reviews')}>
          <Image source={require('../../assets/images/reviews_icon.png')} style={styles.tabIcon} />
          <Text style={styles.tabLabel}>Reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Image source={require('../../assets/images/home_icon_pressed.png')} style={styles.tabIconCurrent} />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Friends')}>
          <Image source={require('../../assets/images/friends_icon.png')} style={styles.tabIcon} />
          <Text style={styles.tabLabel}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Account')}>
          <Image source={require('../../assets/images/account_icon.png')} style={styles.tabIcon} />
          <Text style={styles.tabLabel}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    marginTop: 20,
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    height: 40,
    backgroundColor: '#fff',
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#ffaa00', 
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#000',
  },
  recommendationText: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  restaurantList: {
    marginTop: 10,
    paddingHorizontal: 20,
    flex: 1,
  },
  restaurantBox: {
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    borderColor: '#ffaa00',
    borderWidth: 2,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: '100%',
    height: 225,
    resizeMode: 'stretch',
  },
  restaurantInfo: {
    padding: 5,
    fontSize: 14,
    color: '#666',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    paddingTop: 15,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
    padddingHorizontal: 5,
  },
  tabIcon: {
    width: 24,
    height: 25,
    tintColor: '#ffaa00', 
  },
  tabIconCurrent: {
    width: 24,
    height: 25,
    tintColor: '#ff6f00', 
  },
  tabLabel: {
    fontSize: 12,
    paddingTop: 5,
    color: '#333',
  },
});

export default HomeScreen;
