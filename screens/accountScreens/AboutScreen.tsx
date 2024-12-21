import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  Account: undefined;
  // Add other routes here if needed
};

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  // const navigation = useNavigation();
  const menuItems = [
    { icon: 'heart-outline', title: 'My Favorites' },
    { icon: 'location-outline', title: 'My Addresses' },
    { icon: 'receipt-outline', title: 'My Orders' },
    { icon: 'log-out-outline', title: 'Logout' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>My Profile</Text>

        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image
              // source={require('./assets/profile-picture.png')}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.name}>Muhammad Ahmad</Text>
              <Text style={styles.contactInfo}>03083872646</Text>
              <Text style={styles.contactInfo}>qdevaan@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Account')}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index}
            style={styles.menuItem}
            onPress={() => {
              if (item.title === 'Logout') {
                // Handle logout logic here
              } else if (item.title === 'My Favorites') {
                // Navigate to the Favorites screen (if you have one)
              } else if (item.title === 'My Addresses') {
                // Navigate to the Addresses screen (if you have one)
              } else if (item.title === 'My Orders') {
                // Navigate to the Orders screen (if you have one)
              } else {
                // Navigate to 'ManageAccount'
                
              }
            }}
          >
            <Ionicons name={item.icon} size={24} color="#333" />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 8,
    textAlign: 'left',
  },
  profileCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,

  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  editButton: {
    borderTopColor: '#ddd',
    // backgroundColor: '',
    borderRadius: 5,
    borderTopWidth: 2,
    padding: 10,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItem: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
  },
});
