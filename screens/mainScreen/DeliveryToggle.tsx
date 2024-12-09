import React, { useState } from 'react';
import { View, Text,ToastAndroid, TouchableOpacity, StyleSheet, Image } from 'react-native';

const DeliveryToggle = () => {
  const [isDelivery, setIsDelivery] = useState(false);
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  
  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity 
        style={[styles.toggleButton, !isDelivery && styles.toggleButtonActive]}
        onPress={() => { showToast('Delivery Selected'); setIsDelivery(false); }}
      >
        <Image source={require('../assets/delivery.png')} style={{ width: 140, height: 45 }} />
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.toggleButton, isDelivery && styles.toggleButtonActive]}
        onPress={() => { showToast('PickUp Selected'); setIsDelivery(true); }}
      >
        <Image source={require('../assets/pickup.png')} style={{ width: 140, height: 45 }} />
      </TouchableOpacity>
    </View>
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
    flexDirection: 'row',
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
  toggleTextActive: {
    color: '#000',
    fontWeight: '500',
  },
});

export default DeliveryToggle;