import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onAbout: () => void;
  user: { email: string; avatar_url?: string } | null;
}

const DEFAULT_IMAGE_URL = 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onLogin, onLogout, onAbout, user }) => {
  const slideAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <Animated.View style={[
      styles.container,
      {
        transform: [{ translateX: slideAnim }],
      },
    ]}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose} accessibilityLabel="Close menu">
        <Ionicons name="close" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.content}>
        {user ? (
          <View style={styles.userInfo}>
            <Image source={{ uri: user.avatar_url || DEFAULT_IMAGE_URL }} style={styles.profilePicture} />
            <Text style={styles.userName}>{user.email}</Text>
          </View>
        ) : (
          <View style={styles.guestInfo}>
            <Image 
              source={{ uri: DEFAULT_IMAGE_URL }} 
              style={styles.defaultPicture} 
            />
            <Text style={styles.loginPrompt}>Login to avail exclusive deals and promotions</Text>
            <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
              <Text style={styles.loginButtonText}>Login / Signup</Text>
            </TouchableOpacity>
          </View>
        )}
        {user && (
          <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.aboutButton} onPress={onAbout} accessibilityLabel="About KFC">
        <Text style={styles.aboutButtonText}>About</Text>
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
    backgroundColor: 'white',
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
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1001,
  },
  content: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  menuItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemText: {
    fontSize: 18,
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
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  loginPrompt: {
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  aboutButton: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  aboutButtonText: {
    fontSize: 18,
  },
});

export default SideMenu;
