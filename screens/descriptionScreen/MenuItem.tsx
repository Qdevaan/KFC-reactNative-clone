import React from 'react';
import { View, Text, Image, ToastAndroid, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../../data/productData2';

type MenuItemProps = {
  item: Product;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  type: 'required' | 'optional';
};

const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

const MenuItem: React.FC<MenuItemProps> = ({ 
  item: { name, description, price, image }, 
  quantity,
  onAdd,
  onRemove,
  type
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={() => {}} // Placeholder for favorite toggle
          accessibilityLabel={"Add to favorites"} // Placeholder accessibility label
        >
          <Text style={styles.favoriteIcon}>
            ♥
          </Text>
        </TouchableOpacity>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">{name}</Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">{description}</Text>
        <TouchableOpacity 
          style={styles.customizeButton} 
          onPress={() => {}} // Placeholder for customize action
          accessibilityLabel="Customize item"
        >
          <Text style={styles.customizeText}>CUSTOMIZE</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>Rs {price.toFixed(2)}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity 
              style={styles.removeButton} 
              onPress={onRemove}
              disabled={quantity === 0}
              accessibilityLabel="Remove from bucket"
            >
              <Text style={styles.removeButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={onAdd}
              accessibilityLabel="Add to bucket"
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: image }} 
          style={styles.image} 
          accessibilityLabel={`Image of ${name}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e3e3e3',
    borderRadius: 4,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  favoriteButton: {
    position: 'absolute',
    right: -20,
    top: -10,
    zIndex: 1,
    padding: 8,
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#e53935',
  },
  favoriteIconActive: {
    color: '#e53935',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingRight: 32,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  customizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  customizeText: {
    color: '#e53935',
    fontWeight: '500',
    marginRight: 4,
  },
  arrowIcon: {
    color: '#e53935',
    fontSize: 16,
    paddingRight: 4,
  },
  bottomRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#e53935',
    padding: 8,
    borderRadius: 4,
    marginLeft: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#e53935',
    padding: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 8,
  },
});

export default MenuItem;

