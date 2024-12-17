import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { menuCategories } from '../../data/menuData';

interface MenuSectionProps {
  isDelivery: boolean;
  username: string;
}

const MenuSection: React.FC<MenuSectionProps> = ({ isDelivery, username }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Explore Menu</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Menu', { 
          categoryId: menuCategories[0].id, 
          isDelivery: isDelivery,
          username: username
        })}>
          <Text style={styles.viewAllText}>VIEW ALL</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.container, { flex: 0.1 }]}>
        <View style={styles.singleCardView}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Menu', { 
            categoryId: menuCategories[0].id, 
            isDelivery: isDelivery,
            username: username
          })}>
            <Text style={styles.title}>{menuCategories[0].title}</Text>
            <Image source={{ uri: menuCategories[0].image }} style={styles.image} />
          </TouchableOpacity>
        </View>

        <View style={styles.doubleCardView}>
          {menuCategories.slice(1, 3).map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.card}
              onPress={() => {
                navigation.navigate('Menu', { 
                  categoryId: card.id, 
                  isDelivery: isDelivery,
                  username: username
                });
              }}
            >
              <Text style={styles.title}>{card.title}</Text>
              <Image source={{ uri: card.image }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.doubleCardView}>
          {menuCategories.slice(3).map((card) => (
            <TouchableOpacity
              key={card.id}
              style={styles.card}
              onPress={() => {
                navigation.navigate('Menu', { 
                  categoryId: card.id, 
                  isDelivery: isDelivery,
                  username: username
                });
              }}
            >
              <Text style={styles.title}>{card.title}</Text>
              <Image source={{ uri: card.image }} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  viewAllText: {
    fontSize: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: -5,
  },
  singleCardView: {
    flex: 1,
    marginRight: 3,
    paddingTop: 5,
    marginLeft: 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: 'dotted',
    borderColor: 'grey',
    height: '100%',
    paddingBottom: -5,
  },
  doubleCardView: {
    paddingTop: 5,
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
});

export default MenuSection;

