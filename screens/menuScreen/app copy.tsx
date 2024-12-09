import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Text, FlatList } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import Header from './components/Header';
import data from './data.json';
import DeliveryToggle from './components/DeliveryToggle';
import CategoryTabs from './components/CategoryTabs';
import MenuItem from './components/MenuItem';
import { CartProvider, useCart } from '../cartScreen/CartContext';

type RouteParams = {
  params: {
    categoryId: string;
  };
};

function MenuScreen() {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const categoryId = route.params?.categoryId || '1';
  const number = parseInt(categoryId, 10);
  const [activeCategory, setActiveCategory] = useState(data.categories[number - 1]);
  const [favorites, setFavorites] = useState<number[]>([]);

  const getCategoryItems = (category: string) => {
    const key = category.toLowerCase().replace(/[^a-z]/g, '') + 'items';
    return data[key as keyof typeof data] || [];
  };

  const toggleFavorite = (itemId: number) => {
    setFavorites((prevFavorites) => 
      prevFavorites.includes(itemId) 
        ? prevFavorites.filter(id => id !== itemId) 
        : [...prevFavorites, itemId]
    );
  };

  const handleAddToBucket = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
    console.log('Added to bucket:', item.name);
  };

  const renderItem = ({ item }: { item: any }) => (
    <MenuItem
      name={item.name}
      description={item.description}
      price={item.price}
      image={item.image}
      onAddToBucket={() => handleAddToBucket(item)}
      onCustomize={() => navigation.navigate('Description', { id: item.id })}
      onToggleFavorite={() => toggleFavorite(item.id)}
      isFavorite={favorites.includes(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <DeliveryToggle />
      <CategoryTabs 
        categories={data.categories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{activeCategory}</Text>
      </View>
      <FlatList
        data={getCategoryItems(activeCategory)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.menuContainer}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MenuScreen />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuContainer: {
    padding: 16,
  },
  categoryHeader: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
