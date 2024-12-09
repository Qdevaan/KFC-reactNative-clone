import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type BestSellerCardProps = {
  name: string;
  price: string;
  image: string;
};

export default function BestSellerCard({ name, price, image }: BestSellerCardProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 8,
    // paddingRight: 8,
    width: 130,
    height: 190,
    backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 1,
    padding: 8,
    marginRight: 6,
    borderStyle: 'dotted',
    borderColor: '#3b3939',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 130,
    //marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  price: {
    fontSize: 14,
    color: '#dc2626',
    position: 'absolute',
    bottom: 8,
    right: 8,
    textAlign: 'right',
  },
});