import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ToastProvider, useToast } from 'react-native-toast-notifications'

const DeliveryToggle = () => {
  const [isDelivery, setIsDelivery] = useState(false);
  const toast = useToast();

  const handleDeliveryPress = () => {
    setIsDelivery(false);
    toast.show('Delivery Selected', {
      type: 'success',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const handlePickupPress = () => {
    setIsDelivery(true);
    toast.show('Pickup Selected', {
      type: 'success',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  return (
    <ToastProvider>
    <View style={styles.toggleContainer}>
      <TouchableOpacity 
        style={[styles.toggleButton, !isDelivery && styles.toggleButtonActive]}
        onPress={handleDeliveryPress}
      >
        <Image source={require('../assets/delivery.png')} style={styles.buttonImage} />
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.toggleButton, isDelivery && styles.toggleButtonActive]}
        onPress={handlePickupPress}
      >
        <Image source={require('../assets/pickup.png')} style={styles.buttonImage} />
      </TouchableOpacity>
    </View>
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'red',
  },
  buttonImage: {
    width: 140,
    height: 45,
  },
});

export default DeliveryToggle;

