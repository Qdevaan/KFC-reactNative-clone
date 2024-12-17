import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import ThemeToggle from './ThemeToggle';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onAbout: () => void;
  user: { email: string } | null;
  userProfile: { username: string; avatar_url: string; full_name: string } | null;
  navigation: any;
}

const DEFAULT_IMAGE_URL = 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onLogin, onLogout, onAbout, user, userProfile, navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isOpen ? 0 : -300,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Animated.View style={[
      styles.container,
      theme.container,
      {
        transform: [{ translateX: slideAnim }],
        opacity: fadeAnim,
      },
    ]}>
      <View style={styles.themeToggleContainer}>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </View>
      <View style={styles.content}>
        {user ? (
          <View style={styles.userInfo}>
            <Image 
              source={{ uri: userProfile?.avatar_url ? supabase.storage.from('avatars').getPublicUrl(userProfile.avatar_url).data.publicUrl : DEFAULT_IMAGE_URL }} 
              style={styles.profilePicture} 
            />
            <Text style={[styles.userName, theme.text]}>{userProfile?.full_name || userProfile?.username || 'User'}</Text>
            <Text style={[styles.userEmail, theme.subText]}>{user.email}</Text>
            <TouchableOpacity 
              style={[styles.accountButton, theme.button]} 
              onPress={() => navigation.navigate('Account')}
            >
              <Text style={[styles.accountButtonText, theme.buttonText]}>Manage Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.logoutButton, theme.button]} onPress={onLogout}>
              <Text style={[styles.loginButtonText, theme.buttonText]}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.guestInfo}>
            <Image 
              source={{ uri: DEFAULT_IMAGE_URL }} 
              style={styles.defaultPicture} 
            />
            <Text style={[styles.loginPrompt, theme.text]}>Login to avail exclusive deals and promotions</Text>
            <TouchableOpacity style={[styles.loginButton, theme.button]} onPress={onLogin}>
              <Text style={[styles.loginButtonText, theme.buttonText]}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity style={[styles.aboutButton, theme.aboutButton]} onPress={onAbout} accessibilityLabel="About KFC">
        <Text style={[styles.aboutButtonText, theme.aboutButtonText]}>About</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  themeToggleContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1001,
  },
  content: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    gap: 20,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#eee',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 10,
  },
  guestInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  defaultPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#eee',
  },
  loginPrompt: {
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  loginButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  aboutButton: {
    paddingVertical: 15,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  aboutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
  },
  accountButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
  subText: {
    color: '#666',
  },
  button: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
  },
  buttonText: {
    color: 'white',
  },
  aboutButton: {
    borderTopColor: '#eee',
  },
  aboutButtonText: {
    color: '#dc2626',
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
  },
  subText: {
    color: '#a0aec0',
  },
  button: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
  },
  buttonText: {
    color: 'white',
  },
  aboutButton: {
    borderTopColor: '#333',
  },
  aboutButtonText: {
    color: '#dc2626',
  },
});

export default SideMenu;
