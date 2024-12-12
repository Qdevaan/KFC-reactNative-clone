import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onAbout: () => void;
  user: { name: string; profilePicture: string } | null;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onLogin, onAbout, user }) => {
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
            <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
            <Text style={styles.userName}>{user.name}</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.menuItem} onPress={onLogin} accessibilityLabel="Log in or sign up">
            <Text style={styles.menuItemText}>Login</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.menuItem} onPress={onAbout} accessibilityLabel="About KFC">
          <Text style={styles.menuItemText}>About</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
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
    top: 40,
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
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SideMenu;