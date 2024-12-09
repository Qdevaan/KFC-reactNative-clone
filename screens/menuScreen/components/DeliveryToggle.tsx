import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DeliveryToggle = () => {
  const [isDelivery, setIsDelivery] = useState(false);
  
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity 
        style={[styles.toggleButton, !isDelivery && styles.toggleButtonActive]}
        onPress={() => setIsDelivery(false)}
      >
        {/* <Ionicons name="bicycle" size={20} color={!isDelivery ? "#000" : "#666"} /> */}
        {/* <Text style={[styles.toggleText, !isDelivery && styles.toggleTextActive]}>Delivery</Text> */}
        <Image source={require('./delivery.png')} style={{ width: 140, height: 45 }} />
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.toggleButton, isDelivery && styles.toggleButtonActive]}
        onPress={() => setIsDelivery(true)}
      >
        {/* <Ionicons name="bag-handle" size={20} color={isDelivery ? "#000" : "#666"} />
        <Text style={[styles.toggleText, isDelivery && styles.toggleTextActive]}>Pickup</Text> */}
        <Image source={require('./pickup.png')} style={{ width: 140, height: 45 }} />
      </TouchableOpacity>
    </View>
  );
};
{/* Delivery Toggle
      <View style={styles.deliveryToggle}>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
          <Image source={require('./assets/delivery.png')} style={{ width: 140, height: 45 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
          <Image source={require('./assets/pickup.png')} style={{ width: 140, height: 45 }} />
        </TouchableOpacity>
      </View> */}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 12,
    // gap: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'red',
  },
  // toggleText: {
  //   fontSize: 16,
  //   color: '#666',
  // },
  toggleTextActive: {
    color: '#000',
    fontWeight: '500',
  },
});

export default DeliveryToggle;

