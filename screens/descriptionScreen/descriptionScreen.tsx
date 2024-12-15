import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Animated, Text } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { MenuItem } from './MenuItem';
import { Header } from './Header';
import { Footer } from './Footer';
import { HEADER_MAX_HEIGHT } from './types';
import { MenuItem as MenuItemType } from '../../data/menuDataTypes';
import { menuData } from '../../data/productData';
import { useCart , CartProvider } from '../cartScreen/CartContext';

type RouteParams = {
  Description: {
    id: number;
  };
};

function DescriptionScreen() {
  const route = useRoute<RouteProp<RouteParams, 'Description'>>();
  const navigation = useNavigation();
  const productId = route.params?.id;

  const [selectedItems, setSelectedItems] = useState<{ [key: number]: number }>({});
  const scrollY = useRef(new Animated.Value(0)).current;
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    console.log('Product ID:', typeof(route.params));
  }, [route.params?.id]);

  useEffect(() => {
    const selectedProduct = menuData.menuItems.find(item => item.id === productId);
    if (selectedProduct) {
      console.log('Selected product:', selectedProduct);
      setSelectedItems({ [selectedProduct.id]: 1 });
    } else {
      console.log('Product not found:', productId);
    }
  }, [productId]);

  const addItem = (itemId: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeItem = (itemId: number) => {
    setSelectedItems((prev) => {
      const next = { ...prev };
      if (next[itemId] > 1)
        next[itemId]--;
      else
        delete next[itemId];
      return next;
    });
  };

  const totalPrice = Object.entries(selectedItems).reduce((sum, [itemId, quantity]) => {
    const item = menuData.menuItems.find(item => item.id === Number(itemId));
    return sum + (item?.price || 0) * quantity;
  }, 0);

  const addToBucket = () => {
    const selectedProduct = menuData.menuItems.find((item) => item.id === productId);

    if (!selectedProduct) {
      console.error('Selected product not found');
      return;
    }

    const addedAddOns = selectedProduct.addOns
      ?.map(id => menuData.menuItems.find(item => item.id === id))
      .filter((item): item is MenuItemType => !!item && !!selectedItems[item.id])
      .map(item => ({
        id: item.id.toString(),
        name: item.name,
        quantity: selectedItems[item.id],
        price: item.price,
        image: item.image || ''
      }));

    const addedDrinks = selectedProduct.drinks
      ?.map(id => menuData.menuItems.find(item => item.id === id))
      .filter((item): item is MenuItemType => !!item && !!selectedItems[item.id])
      .map(item => ({
        id: item.id.toString(),
        name: item.name,
        quantity: selectedItems[item.id],
        price: item.price,
        image: item.image || ''
      }));

    const orderDetails = {
      id: selectedProduct.id.toString(),
      name: selectedProduct.name,
      quantity: selectedItems[selectedProduct.id],
      price: selectedProduct.price,
      image: selectedProduct.image || '',
      addOns: addedAddOns || [],
      drinks: addedDrinks || [],
    };

    console.log('Order Details:', orderDetails);

    addToCart(orderDetails);

    addedAddOns?.forEach(addOn => addToCart(addOn));
    addedDrinks?.forEach(drink => addToCart(drink));

    navigation.goBack();
  };

  if (!productId) {
    return <Text>No product ID provided</Text>;
  }

  const selectedProduct = menuData.menuItems.find(item => item.id === productId);

  if (!selectedProduct) {
    return <Text>Product not found (ID: {productId})</Text>;
  }

  const addOns = selectedProduct.addOns?.map(id => menuData.menuItems.find(item => item.id === id)).filter((item): item is MenuItemType => !!item);
  const drinks = selectedProduct.drinks?.map(id => menuData.menuItems.find(item => item.id === id)).filter((item): item is MenuItemType => !!item);

  return (
    <SafeAreaView style={styles.container}>
      <Header scrollY={scrollY} selectedItems={selectedItems} menuItem={selectedProduct} />
      
      <Animated.ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.scrollViewContent}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Choose an option</Text>
              <Text style={styles.sectionType}>Required</Text>
            </View>
            <MenuItem
              key={selectedProduct.id}
              item={selectedProduct}
              quantity={selectedItems[selectedProduct.id] || 0}
              onAdd={() => addItem(selectedProduct.id)}
              onRemove={() => removeItem(selectedProduct.id)}
              type="required"
            />
          </View>
          {addOns && addOns.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Add Ons</Text>
                <Text style={styles.sectionType}>Optional</Text>
              </View>
              {addOns.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  quantity={selectedItems[item.id] || 0}
                  onAdd={() => addItem(item.id)}
                  onRemove={() => removeItem(item.id)}
                  type="optional"
                />
              ))}
            </View>
          )}
          {drinks && drinks.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Drinks</Text>
                <Text style={styles.sectionType}>Optional</Text>
              </View>
              {drinks.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  quantity={selectedItems[item.id] || 0}
                  onAdd={() => addItem(item.id)}
                  onRemove={() => removeItem(item.id)}
                  type="optional"
                />
              ))}
            </View>
          )}
          <View style={styles.bottomSpacing} />
        </View>
      </Animated.ScrollView>

      <Footer
        quantity={quantity}
        totalPrice={totalPrice}
        onDecreaseQuantity={() => {
          setQuantity(Math.max(1, quantity - 1));
          setSelectedItems((prev) => ({
            ...prev,
            [selectedProduct.id]: Math.max(1, quantity - 1),
          }));
        }}
        onIncreaseQuantity={() => {
          setQuantity(quantity + 1);
          setSelectedItems((prev) => ({
            ...prev,
            [selectedProduct.id]: quantity + 1,
          }));
        }}
        onAddToBucket={addToBucket}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <CartProvider>
      <DescriptionScreen />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingTop: HEADER_MAX_HEIGHT,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  sectionType: {
    fontSize: 14,
    color: '#666',
  },
  bottomSpacing: {
    height: 100,
  },
});
