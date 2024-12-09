import React from 'react';
import { View, Text, Image, TouchableOpacity,ToastAndroid, StyleSheet } from 'react-native';

type TopDealCardProps = {
  name: string;
  price: string;
  image: string;
};

export default function TopDealCard({ name, price, image }: TopDealCardProps) {
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
        {/* <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>VIEW</Text>
        </TouchableOpacity> */}
          <Text style={styles.viewButtonText}>VIEW</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "auto" ,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    
    padding: 16,
    marginRight: 16,
    
    flexDirection: 'row',
    borderStyle: 'dotted',
    borderColor: '#3b3939',

    
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  price: {
    fontSize: 14,
    color: '#dc2626',
    marginTop: 4,
    marginBottom: 8,
    position: 'absolute',
    bottom: -10,
  },
  viewButton: {
    borderWidth: 1,
    borderColor: '#dc2626',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    top: 80,
    alignSelf: 'flex-end',
    position: 'absolute',

    
  },
  viewButtonText: {
    borderWidth: 1,
    borderColor: '#dc2626',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    top: 80,
    alignSelf: 'flex-end',
    position: 'absolute',
    color: '#dc2626',
    fontSize: 12,
    fontWeight: 'bold',
  },
});