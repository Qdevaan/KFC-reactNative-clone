import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import ThemeToggle from './ThemeToggle';


const SCREEN_WIDTH = Dimensions.get('window').width;
const MENU_WIDTH = SCREEN_WIDTH * 0.65; // 65% of screen width
const DEFAULT_IMAGE_URL = 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';

const SideMenu = ({ isOpen, onClose, onLogin, user, userProfile, navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const slideAnim = useRef(new Animated.Value(-MENU_WIDTH)).current;
  const mainScreenAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isOpen ? 0 : -MENU_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(mainScreenAnim, {
        toValue: isOpen ? MENU_WIDTH : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const menuItems = [
    { icon: 'heart-outline', title: 'My Favorites' },
    { icon: 'location-outline', title: 'My Addresses' },
    { icon: 'receipt-outline', title: 'My Orders' },
    { icon: 'map-outline', title: 'Store Locator' },
    { icon: 'navigate-outline', title: 'Track Order' },
    { icon: 'grid-outline', title: 'Explore Menu' },
    { icon: 'information-circle-outline', title: 'About Us' },
    { icon: 'chatbox-outline', title: 'Feedback' },
    { icon: 'document-text-outline', title: 'Terms & Conditions' },
    { icon: 'shield-outline', title: 'Privacy Policy' },
  ];

  return (
    <>
      <Animated.View 
        style={[
          styles.container,
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        <View style={styles.header}>
          {user ? (
            <TouchableOpacity style={styles.userInfo} onPress={() => navigation.navigate('Account')}>
              <Image 
          source={{ uri: userProfile?.avatar_url ? supabase.storage.from('avatars').getPublicUrl(userProfile.avatar_url).data.publicUrl : DEFAULT_IMAGE_URL }} 
          style={styles.avatar}
              />
              <Text style={styles.userName}>{userProfile?.full_name || 'Guest'}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginPrompt}>
              <Ionicons name="person-circle-outline" size={60} color="#666" />
              <Text style={styles.loginText}>Login to unlock exclusive</Text>
              <Text style={styles.loginText}>Offers and Discounts</Text>
            </View>
          )}
          
          <View style={styles.themeToggleContainer}>
            <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
          </View>
        </View>
        
        <ScrollView>
          {menuItems.map((item, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.title.replace(/\s+/g, ''))}
            >
              <Ionicons name={item.icon} size={24} color="#333" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Image 
            source={require('../assets/delivery.png')}
            style={styles.deliveryIcon}
          />
          <Text style={styles.version}>KFC 3.1.0</Text>
        </View>
      </Animated.View>

      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: MENU_WIDTH,
    height: '100%',
    backgroundColor: 'white',
    zIndex: 1000,
  },
  header: {
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginPrompt: {
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  
  themeToggleContainer: {
    position: 'absolute',
    top: 5,
    right: 10,
    zIndex: 1001,
  },
  menuItems: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 20,
  },
  menuItemText: {
    marginLeft: 15,
    fontSize: 14,
    color: '#333',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  deliveryIcon: {
    position: 'absolute',
    top: -60,
    left: 0,
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  version: {
    position: 'absolute',
    right: 20,
    color: '#666',
    fontSize: 12,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
  },
});

export default SideMenu;

