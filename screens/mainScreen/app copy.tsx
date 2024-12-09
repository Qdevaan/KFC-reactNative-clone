import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView,ToastAndroid, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Svg, Path, Circle, Line } from 'react-native-svg';
//import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import data from '../data.json';

import PromotionCard from './PromotionCard';
import MenuCategoryCard from './MenuCategoryCard';
import BestSellerCard from './BestSellerCard';
import TopDealCard from './TopDealCard';
import DeliveryToggle from './DeliveryToggle';

// Assume this data is imported from a JSON file
const data = {
  promotions: [
    { id: 1, image: "https://www.kfcpakistan.com/images/7e703860-8c0a-11ef-96ca-83eb584d9244-WebBanner1675x600_desktop_image-2024-10-16220337.jpg"},
    { id: 2, image: "https://www.kfcpakistan.com/images/65d4ad90-8cb9-11ef-ac1f-b1915cbd0455-Web-banner-1675x600_desktop_image-2024-10-17185537.jpg" },
    { id: 3, image: "https://www.kfcpakistan.com/images/a9fd6850-8d58-11ef-8691-e5253fef787b-Web-banner-1675x600_desktop_image-2024-10-18135542.jpg" },
  ],
  menuCategories: [
    { id: 1, name: "Everyday Value", image: "https://kfcpakistan.com/images/43a9fb50-ffaa-11ed-8180-812e571998fe-EVMSection-Tile-2023-05-31115706.png" },
    { id: 2, name: "Ala-Carte-&-Combos", image: "https://kfcpakistan.com/images/43a9fb50-ffaa-11ed-8180-812e571998fe-Chicken-Bucket-2023-05-31115706.png" },
    { id: 3, name: "Signature-Boxes", image: "https://kfcpakistan.com/images/43a9fb50-ffaa-11ed-8180-812e571998fe-Sharing-2023-05-31115706.png" },
    { id: 4, name: "Sharing", image: "https://kfcpakistan.com/images/43a9fb50-ffaa-11ed-8180-812e571998fe-Snacks-2023-05-31115706.png" },
    { id: 5, name: "Snacks & Beverages", image: "https://kfcpakistan.com/images/43a9fb50-ffaa-11ed-8180-812e571998fe-Midnight-2023-05-31115706.png" },
  ],
  bestSellers: [
    { id: 100, name: "Krunch Burger", price: "Rs 310", image: "https://www.kfcpakistan.com/images/b438e990-bc23-11ee-be0d-ed0e61ce8a3a-Untitleddesign(5)-min_variant_0-2024-01-26082002.png" },
    { id: 200, name: "Zinger Burger", price: "Rs 550", image: "https://www.kfcpakistan.com/images/33685b40-0461-11ee-911c-497570899609-Mighty_variant_0-2023-06-06115641.png" },
    { id: 300, name: "Crispy Box", price: "Rs 650", image: "https://www.kfcpakistan.com/images/afc536d0-ff99-11ed-a006-17c81341cbe8-Signaturebox-2023-05-31095826.png"},
  ],
  topDeals: [
    { id: 400,
      name: "Family Festival",
      description: "4 Zinger burgers, 4 pieces Hot & Crispy Chicken, 2 dinner rolls, 1.5L drink",
      price: 2450,
      image: "https://www.kfcpakistan.com/images/a9b4fb90-8d82-11ef-ae4a-7712e9c1a6fb-Thumbnail590x4802copy-2024-10-18185620.png"},
    
      {
        id: 500,
        name: "Bucket for Two",
        description: "9 pieces Hot & Crispy Chicken, 1 large fries, 1 large coleslaw, 2 regular drinks",
        price: 1450,
        image: "https://www.kfcpakistan.com/images/afc4e8b0-ff99-11ed-8640-872ee63b5da0-Sharing-2023-05-31095826.png"
      },
      {
        id: 100,
        name: "Krunch Burger",
        description: "Krunch fillet, spicy mayo, lettuce, sandwiched between a sesame seed bun",
        price: 310,
        image: "https://www.kfcpakistan.com/images/b438e990-bc23-11ee-be0d-ed0e61ce8a3a-Untitleddesign(5)-min_variant_0-2024-01-26082002.png"
      },{
        id: 200,
        name: "Zinger Burger",
        description: "Zinger fillet, signature mayo, lettuce, sandwiched between a sesame seed bun",
        price: 550,
        image: "https://www.kfcpakistan.com/images/afc4e8b0-ff99-11ed-8640-872ee63b5da0-alacart-2023-05-31095826.png"
      }
    ],
  
    cards: [
      { id: 1, title: "Everyday Value", image: require("../assets/everyday.png") },
      { id: 2, title: "Ala-Carte-&-Combos", image: require("../assets/combo.png") },
      { id: 3, title: "Signature-Boxes", image: require("../assets/boxes.png") },
      { id: 4, title: "Promotion", image: require("../assets/promo.png") },
      { id: 5, title: "Sharing", image: require("../assets/sharing.png") },
    ],
};

export default function KFCHome() {
  const navigation = useNavigation();
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header2}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color="black" />
            <View>
              <Text style={styles.pickupText}>Pickup From</Text>
              <Text style={styles.locationText}>{"QDEVAAN"}</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Image 
            source={require('../assets/KFClogo.png')} 
            style={styles.logo2}
          />
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <DeliveryToggle/>

      <ScrollView style={styles.content}>
        {/* Promotions */}
        <View style={styles.sectionCard}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What's new</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data.promotions.map((promo) => (
                <TouchableOpacity key={promo.id} onPress={() => showToast(`Clicked on promotion ${promo.id}`)}>
                  <PromotionCard {...promo} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Reorder Button */}
        <TouchableOpacity style={styles.reorderButton} onPress={() => showToast('Reorder Button Clicked')}>
          <Text style={styles.reorderButtonText}>REORDER</Text>
        </TouchableOpacity>

        {/* Menu Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Menu</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
              <Text style={styles.viewAllText}>VIEW ALL</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.container2, { flex: 0.1 }]}>
            {/* View 1: Main Card */}
            <View style={styles.singleCardView}>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Menu')}>
                <Text style={styles.title}>{data.cards[0].title}</Text>
                <Image source={data.cards[0].image} style={styles.image} />
              </TouchableOpacity>
            </View>

            {/* View 2: Two data.cards */}
            <View style={styles.doubleCardView}>
              {data.cards.slice(1, 3).map((card) => (
                <TouchableOpacity key={card.id} style={styles.card} onPress={() => { navigation.navigate('Menu', { categoryId: card.id }); console.log(`Clicked on card ${card.id}`); }}>
                  <Text style={styles.title}>{card.title}</Text>
                  <Image source={card.image} style={styles.image} />
                </TouchableOpacity>
              ))}
            </View>

            {/* View 3: Two data.cards */}
            <View style={styles.doubleCardView}>
              {data.cards.slice(3).map((card) => (
                <TouchableOpacity key={card.id} style={styles.card} onPress={() => { navigation.navigate('Menu', { categoryId: card.id }); console.log(`Clicked on card ${card.id}`); }}>
                  <Text style={styles.title}>{card.title}</Text>
                  <Image source={card.image} style={styles.image} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Best Sellers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Sellers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.bestSellers.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => { console.log(`Clicked on best seller ${item.id}`); navigation.navigate('Description', { id: item.id }); }}>
                <BestSellerCard {...item} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Top Deals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Deals</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.topDeals.map((deal) => (
              <TouchableOpacity key={deal.id} onPress={() => { console.log(`Clicked on top deal ${deal.id}`); navigation.navigate('Description', { id: deal.id }); }}>
                <TopDealCard {...deal} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <Image 
            source={{ uri: "https://www.kfcpakistan.com/static/media/pickup-banner.01fde5a7db5ef06f7bce.png" }} 
            style={{ width: '100%', height: 200 }} 
          />
        </View>
      </ScrollView>

      {/* Fixed Bucket Icon */}
      <TouchableOpacity style={styles.bucketIcon} onPress={() => navigation.navigate('Bucket')}>
        <Image 
          source={require('../assets/bucket-icon.png')}
          style={{ width: 80, height: 80 }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingTop: 35,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  addressText: {
    fontSize: 14,
    marginLeft: 8,
    
  },
  logo: {
    width: 60,
    height: 30,
  },
  deliveryToggle: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  content: {
    flex: 1,
  },
  sectionCard: {
    width: '120%',
    paddingHorizontal: 16,
    marginHorizontal:-16,
    
  },
  section: {
    // marginBottom: 12,
    marginHorizontal: 16,
  },
  sectionTitle: {
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  viewAllText: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',

  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  reorderButton: {
    backgroundColor: '#dc2626',
    padding: 10,
    borderRadius: 3,
    marginHorizontal: 6,
    marginBottom: 6,
  },
  reorderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerTitle: {
    fontWeight: 'bold',
  },
  footerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  orderNowButton: {
    borderWidth: 1,
    borderColor: '#dc2626',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  orderNowButtonText: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
  bucketIcon: {
    position: 'absolute',
    bottom: 30,
    right: 16,
    backgroundColor: '#dc2626',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  container2: {
    flex: 0.5,
    backgroundColor: "white", // Black background
    // padding: 8,
    borderStyle: 'dotted',
    borderColor: 'grey',
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: -5,
    },
    singleCardView: {
    flex: 1,
    marginRight: 3,
    paddingTop: 5,
    marginLeft:2,
    
    justifyContent: "center",
    alignItems: "center",
    borderStyle: 'dotted',
    borderColor: 'grey',
    height: '100%',
    // paddingBottom: 8,
    paddingBottom: -5,

    },
    doubleCardView: {
    paddingTop:5,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    // marginBottom: 8,
    // marginLeft: 6,
    borderStyle: 'dotted',
    borderColor: 'grey',
    // paddingBottom: -5,
    // paddingRight: -5,
    marginRight: -5,
    marginLeft: 5,

    },
    card: {
    // backgroundColor: "white",
    flex: 1,
    width: "95%", // Adjust size to fit two per row
    marginBottom: 5,
    marginHorizontal: -5,
    paddingHorizontal: -5,
    borderRadius: 3,
    alignItems: "center",
    //paddingRight: 10,
    borderStyle: 'dotted',
    borderColor: 'grey',
    borderWidth: 1,
    // justifyContent: 'flex-end', // Ensure image is at the bottom
    // justifyContent: 'flex-start', // Ensure text is at the top
    },
    image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginTop: 'auto', // Push image to the bottom
    },
    title: {
    color: "black", // White text
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  header2: {
    // paddingTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pickupText: {
    fontSize: 12,
    color: '#666',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logo2: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
});