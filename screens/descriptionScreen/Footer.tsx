import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type FooterProps = {
  quantity: number;
  totalPrice: number;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
  onAddToBucket: () => void;
};

export const Footer: React.FC<FooterProps> = ({
  quantity,
  totalPrice,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onAddToBucket,
}) => (
  <View style={styles.footer}>
    <View style={styles.quantityContainer}>
      <TouchableOpacity style={styles.quantityButton} onPress={onDecreaseQuantity}>
        <Text style={styles.quantityButtonText}>−</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity style={styles.quantityButton} onPress={onIncreaseQuantity}>
        <Text style={styles.quantityButtonText}>+</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.addToBucketContainer}>
      <Text style={styles.priceText}>Rs {totalPrice}</Text>
      <TouchableOpacity style={styles.addToBucketButton} onPress={onAddToBucket}>
        <Text style={styles.addToBucketText}>ADD TO BUCKET</Text>
        <Text style={styles.arrowText}>≫</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  quantityButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  quantityButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  quantityText: {
    fontSize: 12,
    color: 'black',
    marginHorizontal: 8,
  },
  addToBucketContainer: {
    flexDirection: 'row',
    backgroundColor: '#ff0000',
    borderRadius: 4,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: 12,
  },
  addToBucketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  addToBucketText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  arrowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});