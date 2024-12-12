import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, ToastAndroid, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PromotionCard from './PromotionCard';
import BestSellerCard from './BestSellerCard';
import TopDealCard from './TopDealCard';
import DeliveryToggle from './DeliveryToggle';
import SideMenu from './SideMenu';
import data from './data.json';

export default function KFCHome() {
  const navigation = useNavigation();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isSideMenuOpen ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isSideMenuOpen]);

  const handleLogin = () => {
    showToast('Login clicked');
    setIsSideMenuOpen(false);
  };

  const handleAbout = () => {
    navigation.navigate('About');
    setIsSideMenuOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      {/* Header */}
      <View style={styles.header2}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => setIsSideMenuOpen(true)} accessibilityLabel="Open menu">
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
          <TouchableOpacity onPress={() => showToast('Search clicked')} accessibilityLabel="Search">
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
                <Image source={{ uri: data.cards[0].image }} style={styles.image} />
              </TouchableOpacity>
            </View>

            {/* View 2: Two data.cards */}
            <View style={styles.doubleCardView}>
              {data.cards.slice(1, 3).map((card) => (
                <TouchableOpacity
                  key={card.id}
                  style={styles.card}
                  onPress={() => {
                    navigation.navigate('Menu', { categoryId: card.id });
                    console.log(`Clicked on card ${card.id}`);
                  }}
                >
                  <Text style={styles.title}>{card.title}</Text>
                  <Image source={{ uri: card.image }} style={styles.image} />
                </TouchableOpacity>
              ))}
            </View>

            {/* View 3: Two data.cards */}
            <View style={styles.doubleCardView}>
              {data.cards.slice(3).map((card) => (
                <TouchableOpacity
                  key={card.id}
                  style={styles.card}
                  onPress={() => {
                    navigation.navigate('Menu', { categoryId: card.id });
                    console.log(`Clicked on card ${card.id}`);
                  }}
                >
                  <Text style={styles.title}>{card.title}</Text>
                  <Image source={{ uri: card.image }} style={styles.image} />
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
      <TouchableOpacity style={styles.bucketIcon} onPress={() => navigation.navigate('Bucket')} accessibilityLabel="View bucket">
        <Image 
          source={require('../assets/bucket-icon.png')}
          style={{ width: 80, height: 80 }}
        />
      </TouchableOpacity>

      {/* Side Menu Overlay */}
      {isSideMenuOpen && (
        <Animated.View 
          style={[
            styles.sideMenuOverlay,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity 
            style={StyleSheet.absoluteFill} 
            onPress={() => setIsSideMenuOpen(false)}
            accessibilityLabel="Close menu"
          />
        </Animated.View>
      )}

      {/* Side Menu */}
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        onLogin={handleLogin}
        onAbout={handleAbout}
      />
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
    paddingBottom: -5,
  },
  doubleCardView: {
    paddingTop:5,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginRight: -5,
    marginLeft: 5,
  },
  card: {
    flex: 1,
    width: "95%",
    marginBottom: 5,
    marginHorizontal: -5,
    paddingHorizontal: -5,
    borderRadius: 3,
    alignItems: "center",
    borderStyle: 'dotted',
    borderColor: 'grey',
    borderWidth: 1,
  },
  image: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginTop: 'auto',
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  header2: {
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
  sideMenuOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
});

