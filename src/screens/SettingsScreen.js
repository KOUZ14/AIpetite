import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';

const SettingsScreen = ({ navigation }) => {
  const auth = getAuth();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('Login');
    }).catch((error) => {
      console.error("Logout error: ", error);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.settingsOption}>
          <Text style={styles.optionText}>Account</Text>
        </View>
        <View style={styles.settingsOption}>
          <Text style={styles.optionText}>Privacy</Text>
        </View>
        <View style={styles.settingsOption}>
          <Text style={styles.optionText}>Notifications</Text>
        </View>
        <View style={styles.settingsOption}>
          <Text style={styles.optionText}>Help</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  contentContainer: {
    flexGrow: 1,
    
  },
  settingsOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  logoutText: {
    fontSize: 18,
    color: 'red',
    textDecorationLine: 'underline',
    marginTop: 20,
    alignSelf: 'flex-start', 
  },
});

export default SettingsScreen;
