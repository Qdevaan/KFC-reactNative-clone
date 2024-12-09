import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type MenuCategoryCardProps = {
  name: string;
  image: string;
};

export default function MenuCategoryCard({ name, image }: MenuCategoryCardProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    //borderColor: '#e5e7eb',
    padding: 8,
    marginBottom: 16,
    borderStyle: 'dotted',
    borderColor: '#3b3939',
  },
  image: {
    width: '100%',
    height: 100,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
});