import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ToastProvider, useToast } from 'react-native-toast-notifications';

const DeliveryToggle = () => {
  const [isDelivery, setIsDelivery] = useState(false);
  const toast = useToast();
  
  return (
    <ToastProvider>
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleButton, !isDelivery && styles.toggleButtonActive]}
          onPress={() => {
            setIsDelivery(false);
            toast.show('Delivery Selected', { type: 'success' });
          }}>
          <Image source={require('../assets/delivery.png')} style={{ width: 140, height: 45 }} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.toggleButton, isDelivery && styles.toggleButtonActive]}
          onPress={() => {
            setIsDelivery(true);
            toast.show('Pickup Selected', { type: 'success' });
          }}>
          <Image source={require('../assets/pickup.png')} style={{ width: 140, height: 45 }} />
        </TouchableOpacity>
      </View>
    </ToastProvider>
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

