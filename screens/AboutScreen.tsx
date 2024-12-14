import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Developer {
  name: string;
  regNumber: string;
  image: string;
}

const developers: Developer[] = [
  { name: "Umair Rasheed", regNumber: "FA22-BCS-075-G2", image: "https://i.pinimg.com/736x/b5/98/05/b5980553af4ff6f878108a13fef7aaf4.jpg" },
  { name: "Adeel Ahmad", regNumber: "FA22-BCS-0XX-G2", image: "https://i.pinimg.com/736x/5b/54/32/5b54328a37362977c94042f04933d084.jpg" },
  { name: "Muhammad Ahmad", regNumber: "FA22-BCS-0025-G2", image: "https://i.pinimg.com/736x/ca/c3/78/cac3788b0b83d397f968dbc8b5613aa5.jpg" },
];

const AboutScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Meet Our Team</Text>

        <View style={styles.developersContainer}>
          {developers.map((dev, index) => (
            <View key={index} style={styles.developerCard}>
              <Image source={{ uri: dev.image }} style={styles.developerImage} />
              <Text style={styles.developerName}>{dev.name}</Text>
              <Text style={styles.developerReg}>Reg: {dev.regNumber}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About the Project</Text>
          <Text style={styles.sectionDescription}>
            This KFC app clone was developed as part of our mobile application development course. The project aims to replicate the core functionalities of the KFC mobile app, providing users with an interface to browse menus, place orders, and explore promotions.
          </Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Technologies Used</Text>
          <View style={styles.technologiesContainer}>
            <View style={styles.technologyCard}>
              <MaterialCommunityIcons name="react" size={40} color="#61dafb" />
              <Text style={styles.technologyText}>React Native</Text>
            </View>
            <View style={styles.technologyCard}>
              <MaterialCommunityIcons name="alpha-e-box" size={40} color="#000" />
              <Text style={styles.technologyText}>Expo</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#dc2626',
  },
  developersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  developerCard: {
    width: '45%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  developerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  developerName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  developerReg: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  sectionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#dc2626',
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
    // textAlign: 'justify',
    alignContent: 'center',
    textAlign: 'center',

  },
  technologiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  technologyCard: {
    alignItems: 'center',
    // backgroundColor: '#f3f4f6',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.1,
    // shadowRadius: 2,
    // elevation: 3,
  },
  technologyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 5,
  },
});

export default AboutScreen;
