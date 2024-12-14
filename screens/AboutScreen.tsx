import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

interface Developer {
  name: string;
  regNumber: string;
  image: string;
}

const developers: Developer[] = [
  { name: "Umair Rasheed", regNumber: "FA22-BCS-0XX-G2", image: "https://i.pinimg.com/736x/b5/98/05/b5980553af4ff6f878108a13fef7aaf4.jpg" },
  { name: "Adeel Ahmad", regNumber: "FA22-BCS-075-G2", image: "https://i.pinimg.com/736x/5b/54/32/5b54328a37362977c94042f04933d084.jpg" },
  { name: "Muhammad Ahmad", regNumber: "FA22-BCS-0XX-G2", image: "https://i.pinimg.com/736x/ca/c3/78/cac3788b0b83d397f968dbc8b5613aa5.jpg" },
];

const AboutScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>About Our Team</Text>
        
        <View style={styles.developersContainer}>
          {developers.map((dev, index) => (
            <View key={index} style={styles.developerCard}>
              <Image source={{ uri: dev.image }} style={styles.developerImage} />
              <Text style={styles.developerName}>{dev.name}</Text>
              <Text style={styles.developerReg}>Reg: {dev.regNumber}</Text>
            </View>
          ))}
        </View>

        <View style={styles.projectInfo}>
          <Text style={styles.projectTitle}>About the Project</Text>
          <Text style={styles.projectDescription}>
            This KFC app clone was developed as part of our mobile application development course. 
            The project aims to replicate the core functionalities of the KFC mobile app, 
            providing users with an interface to browse menus, place orders, and explore promotions.
          </Text>
          <Text style={styles.projectDescription}>
            Technologies used: React Native, Expo, and various third-party libraries for enhanced UI components and animations.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
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
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  developerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  developerName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  developerReg: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  projectInfo: {
    backgroundColor: 'white',
    textAlign: 'justify',
    borderRadius: 10,
    padding: 20,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#dc2626',
  },
  projectDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
    textAlign: 'justify',
  },
});

export default AboutScreen;
