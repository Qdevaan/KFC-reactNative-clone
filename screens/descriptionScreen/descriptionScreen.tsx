import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Animated, Text } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import  MenuItem  from './MenuItem';
import { Header } from './Header';
import { Footer } from './Footer';
import { HEADER_MAX_HEIGHT } from './types';
import { useCart , CartProvider } from '../cartScreen/CartContext';
import { getProductById } from '../../data/menuData';
import { Product } from '../../data/productData';type RouteParams = {
  Description: {
    id: number;
  };
};

function DescriptionScreen() {
  const route = useRoute<RouteProp<RouteParams, 'Description'>>();
  const navigation = useNavigation();
  const productId = route.params?.id;

  const [selectedItems, setSelectedItems] = useState<{ [key: number]: number }>({});
  const [selectedMainItem, setSelectedMainItem] = useState(productId);
  const scrollY = useRef(new Animated.Value(0)).current;

  const { addToCart } = useCart();

  useEffect(() => {
    const selectedProduct = getProductById(productId);
    if (selectedProduct) {
      console.log('Selected product:', selectedProduct);
      setSelectedItems({ [selectedProduct.id]: selectedProduct.isCompulsory ? 1 : 0 });
    } else {
      console.log('Product not found:', productId);
    }
  }, [productId]);

  const addItem = (itemId: number) => {
    const product = getProductById(itemId);
    if (product) {
      setSelectedItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      }));
    }
  };

  const removeItem = (itemId: number) => {
    const product = getProductById(itemId);
    if (product && !product.isCompulsory) {
      setSelectedItems((prev) => {
        const next = { ...prev };
        if (next[itemId] > 0) {
          next[itemId]--;
        }
        if (next[itemId] === 0) {
          delete next[itemId];
        }
        return next;
      });
    }
  };

  const totalPrice = Object.entries(selectedItems).reduce((sum, [itemId, quantity]) => {
    const item = getProductById(Number(itemId));
    return sum + (item?.price || 0) * quantity;
  }, 0);

  const addToBucket = () => {
    const selectedProduct = getProductById(productId);

    if (!selectedProduct) {
      console.error('Selected product not found');
      return;
    }

    const addedAddOns = selectedProduct.addOns
      ?.map(id => getProductById(id))
      .filter((item): item is Product => !!item && !!selectedItems[item.id])
      .map(item => ({
        id: item.id.toString(),
        name: item.name,
        quantity: selectedItems[item.id],
        price: item.price,
        image: item.image
      }));

    const addedDrinks = selectedProduct.drinks
      ?.map(id => getProductById(id))
      .filter((item): item is Product => !!item && !!selectedItems[item.id])
      .map(item => ({
        id: item.id.toString(),
        name: item.name,
        quantity: selectedItems[item.id],
        price: item.price,
        image: item.image
      }));

    const orderDetails = {
      id: selectedProduct.id.toString(),
      name: selectedProduct.name,
      quantity: 1,
      price: selectedProduct.price,
      image: selectedProduct.image,
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

  const selectedProduct = getProductById(productId);

  if (!selectedProduct) {
    return <Text>Product not found (ID: {productId})</Text>;
  }

  const addOns = selectedProduct.addOns?.map(id => getProductById(id)).filter((item): item is Product => !!item);
  const drinks = selectedProduct.drinks?.map(id => getProductById(id)).filter((item): item is Product => !!item);

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
              <Text style={styles.sectionType}>{selectedProduct.isCompulsory ? 'Required' : 'Optional'}</Text>
            </View>
            <MenuItem
              key={selectedProduct.id}
              item={selectedProduct}
              isSelected={selectedMainItem === selectedProduct.id}
              onSelect={() => setSelectedMainItem(selectedProduct.id)}
              type={selectedProduct.isCompulsory ? "required" : "optional"}
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
        totalPrice={totalPrice}
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

