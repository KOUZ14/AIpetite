import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const AccountScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [auth]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('Login');
    }).catch((error) => {
      console.error("Logout error: ", error);
    });
  };

  return (
    <View style={styles.container}>
      {/* Static Profile Information */}
      <View style={styles.profileContainer}>
        <Image source={require('../../assets/images/profile_placeholder.png')} style={styles.profilePicture} />
        <Text style={styles.userName}>{userInfo ? userInfo.firstName : 'Loading...'}</Text>
        <Text style={styles.userEmail}>{auth.currentUser?.email}</Text>
      </View>

      {/* Scrollable Sections */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Favorite Places Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Favorite Places</Text>
          <View style={styles.contentContainer}>
            {userInfo && userInfo.favoritePlaces ? (
              userInfo.favoritePlaces.map((place, index) => (
                <Text key={index} style={styles.contentText}>{place}</Text>
              ))
            ) : (
              <Text style={styles.noFavorites}>No favorite places added yet.</Text>
            )}
          </View>
        </View>

        {/* Saved Restaurants Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Saved Restaurants</Text>
          <View style={styles.contentContainer}>
            {userInfo && userInfo.savedRestaurants ? (
              userInfo.savedRestaurants.map((restaurant, index) => (
                <Text key={index} style={styles.contentText}>{restaurant}</Text>
              ))
            ) : (
              <Text style={styles.noFavorites}>No saved restaurants yet.</Text>
            )}
          </View>
        </View>

        {/* Visited Places Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Visited Places</Text>
          <View style={styles.contentContainer}>
            {userInfo && userInfo.visitedPlaces ? (
              userInfo.visitedPlaces.map((place, index) => (
                <Text key={index} style={styles.contentText}>{place}</Text>
              ))
            ) : (
              <Text style={styles.noFavorites}>No visited places yet.</Text>
            )}
          </View>
        </View>

        {/* My Reviews Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>My Reviews</Text>
          <View style={styles.contentContainer}>
            {userInfo && userInfo.reviews ? (
              userInfo.reviews.map((review, index) => (
                <Text key={index} style={styles.contentText}>{review}</Text>
              ))
            ) : (
              <Text style={styles.noFavorites}>No reviews written yet.</Text>
            )}
          </View>
        </View>

        {/* Dining Preferences Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>Dining Preferences</Text>
          <View style={styles.contentContainer}>
            {userInfo && userInfo.diningPreferences ? (
              <Text style={styles.contentText}>{userInfo.diningPreferences}</Text>
            ) : (
              <Text style={styles.noFavorites}>No dining preferences set.</Text>
            )}
          </View>
        </View>

      </ScrollView>

      {/* Tab Bar */}
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
          <Image source={require('../../assets/images/home_icon.png')} style={styles.tabIcon} />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Friends')}>
          <Image source={require('../../assets/images/friends_icon.png')} style={styles.tabIcon} />
          <Text style={styles.tabLabel}>Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Account')}>
          <Image source={require('../../assets/images/account_icon_pressed.png')} style={styles.tabIconCurrent} />
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
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ffaa00',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionContainer: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ffaa00',
    overflow: 'hidden',
  },
  sectionHeader: {
    backgroundColor: '#ffaa00',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentContainer: {
    backgroundColor: '#f5f5f5', 
    padding: 10,
  },
  contentText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  noFavorites: {
    fontSize: 16,
    color: '#999',
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

export default AccountScreen;
