import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProductItem = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  info: {
    marginLeft: 12,
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    marginTop: 4,
    color: 'green',
  },
});

export default ProductItem;
