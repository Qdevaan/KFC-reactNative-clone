import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuItem as MenuItemType } from './types';

type MenuItemProps = {
  item: MenuItemType;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  type: 'required' | 'optional';
};

export const MenuItem: React.FC<MenuItemProps> = ({ item, quantity, onAdd, onRemove, type }) => (
  <View style={styles.menuItem}>
    <Image source={{ uri: item.image }} style={styles.itemImage} />
    <View style={styles.itemInfo}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>Rs {item.price}</Text>
    </View>
    {type === 'required' ? (
      <View style={[styles.radioButton, quantity > 0 && styles.radioButtonSelected]}>
        {quantity > 0 && <View style={styles.radioButtonInner} />}
      </View>
    ) : (
      quantity === 0 ? (
        <TouchableOpacity
          style={styles.addButton}
          onPress={onAdd}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.quantityControl}>
          <TouchableOpacity style={styles.quantityButton} onPress={onRemove}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={onAdd}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      )
    )}
  </View>
);

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 3,
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#ff0000',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#ff0000',
  },
  addButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#ff0000',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ff0000',
    borderRadius: 12,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
});

