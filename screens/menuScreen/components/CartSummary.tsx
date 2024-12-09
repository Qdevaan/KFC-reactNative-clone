import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartSummary = () => (
  <View style={styles.cartSummary}>
    <View style={styles.cartLeft}>
      <Image 
        source={require('./menu (1).png')} 
        style={styles.cartThumb}
      />
      <Text style={styles.cartItems}>3 items</Text>
    </View>
    <TouchableOpacity style={styles.viewBucketButton}>
      <Text style={styles.viewBucketText}>Rs 1410</Text>
      <Text style={styles.viewBucketText}>View Bucket</Text>
      <Ionicons name="chevron-forward" size={24} color="white" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  cartSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartThumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cartItems: {
    fontSize: 16,
    fontWeight: '500',
  },
  viewBucketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
  },
  viewBucketText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default CartSummary;

