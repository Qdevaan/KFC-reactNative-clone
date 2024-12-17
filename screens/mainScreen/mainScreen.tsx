import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, ScrollView, ToastAndroid, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Image, Animated, PanResponder } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import BestSellerCard from './BestSellerCard';
import TopDealCard from './TopDealCard';
import DeliveryToggle from './DeliveryToggle';
import SideMenu from './SideMenu';
import { promotions, bestSellers, topDeals, getProductsByIds } from '../../data/menuData';
import Carousel from './Carousel';
import { useCart } from '../cartScreen/CartContext';
import MenuSection from './menuSection';

export default function KFCHome() {
  const navigation = useNavigation();
  const route = useRoute();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isDelivery, setIsDelivery] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pan = useRef(new Animated.ValueXY()).current;
  const { cart } = useCart();

  let isDragging = false;

const panResponder = PanResponder.create({
  onMoveShouldSetPanResponder: (evt, gestureState) => {
    // Only set the pan responder for significant movement
    isDragging = Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
    return isDragging;
  },
  onPanResponderMove: Animated.event(
    [
      null,
      { dx: pan.x, dy: pan.y },
    ],
    { useNativeDriver: false }
  ),
  onPanResponderRelease: () => {
    pan.extractOffset();
    isDragging = false; // Reset drag state
  },
});

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user);
      if (route.params?.user) {
        setUser(route.params.user);
        fetchUserProfile(route.params.user);
      }
    };

    fetchSession();
  }, [route.params?.user]);

  const fetchUserProfile = async (user) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url, full_name')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

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
    navigation.navigate('Login');
    setIsSideMenuOpen(false);
  };

  const handleAbout = () => {
    navigation.navigate('About');
    setIsSideMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setUserProfile(null);
      setIsSideMenuOpen(false);
      showToast('Logged out successfully');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
      showToast('Error logging out');
    }
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
              <Text style={styles.pickupText}>{isDelivery ? 'Delivery to' : 'Pickup from'}</Text>
              <Text style={styles.locationText}>{userProfile?.full_name || 'Guest'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Image 
            source={require('../assets/KFClogo.png')} 
            style={styles.logo2}
          />
        </View>
      </View>

      <DeliveryToggle isDelivery={isDelivery} setIsDelivery={setIsDelivery} />

      <ScrollView style={styles.content}>
        {/* Promotions */}
        <View style={styles.sectionCard}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What's new</Text>
            <Carousel data={promotions} />
          </View>
        </View>

        {/* Reorder Button */}
        <TouchableOpacity style={styles.reorderButton} onPress={() => showToast('Reorder Button Clicked')}>
          <Text style={styles.reorderButtonText}>REORDER</Text>
        </TouchableOpacity>

        {/* Menu Section */}
        <MenuSection isDelivery={isDelivery} username={userProfile?.full_name || userProfile?.username || 'Guest'} />


        {/* Best Sellers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Sellers</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {getProductsByIds(bestSellers).map((item) => (
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
            {getProductsByIds(topDeals).map((deal) => (
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

      {/* Moveable Bucket Icon */}
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          position: 'absolute',
          bottom: 30,
          right: 16,
        }}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={styles.bucketIcon}
          onPress={() => {
            if (!isDragging) {
              navigation.navigate('Bucket', { 
                isDelivery: isDelivery,
                username: userProfile?.full_name || userProfile?.username || 'Guest',
              });
            }
          }}
          accessibilityLabel="View cart"
        >
          <Image 
            source={require('../assets/bucket-icon.png')}
            style={{ width: 65, height: 65 }}
          />
          {cart.length > 0 && (
            <View style={styles.redDot} />
          )}
        </TouchableOpacity>
      </Animated.View>

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
        onLogout={handleLogout}
        onAbout={handleAbout}
        user={user}
        userProfile={userProfile}
        navigation={navigation}
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
    // paddingHorizontal: 16,
    marginBottom: 6,
  },
  viewAllText: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  reorderButton: {
    backgroundColor: '#dc2626',
    padding: 10,
    borderRadius: 3,
    marginHorizontal: 12,
    marginBottom: 6,
  },
  reorderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  footerSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  bucketIcon: {
    // backgroundColor: '#dc2626',
    width: 'auto',
    height: 'auto',
    borderRadius: 35,
    borderStyle: 'dotted',
    // borderWidth: 1,
    // borderColor: '#dc2626',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: -5,
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
  redDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'red',
  },
});