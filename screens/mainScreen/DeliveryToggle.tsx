import React, { version } from 'react';
import { View, ToastAndroid, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';

interface DeliveryToggleProps {
  isDelivery: boolean;
  setIsDelivery: (isDelivery: boolean) => void;
}

const DeliveryToggle: React.FC<DeliveryToggleProps> = ({ isDelivery, setIsDelivery }) => {
  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity 
        style={[styles.toggleButton, !isDelivery && styles.toggleButtonActive]}
        onPress={() => { showToast('Pickup Selected'); setIsDelivery(false); }}
      >
        <Image source={require('../../assets/pickuplogo.png')} style={styles.image} />
        <Text>Pickup</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.toggleButton, isDelivery && styles.toggleButtonActive]}
        onPress={() => { showToast('Delivery Selected'); setIsDelivery(true); }}
      >
        <Image source={require('../../assets/Deliverylogo.png')} style={styles.image} />
        <Text>Delivery</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingHorizontal: 25,
    gap: 16,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3e3e3',
    borderRadius: 3,
    paddingVertical: 3,
    paddingHorizontal: -8,

  },
  toggleButtonActive: {
    backgroundColor: '#e3e3e3',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#dc2626',
  },

  image:{
    width: 30,
    height: 30,
    marginRight: 10,
  }
});

export default DeliveryToggle;

