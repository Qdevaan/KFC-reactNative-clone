import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.container}>
      <Ionicons
        name={isDarkMode ? "sunny" : "moon"}
        size={24}
        color={isDarkMode ? "#f9d71c" : "#1e1e1e"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});

export default ThemeToggle;
