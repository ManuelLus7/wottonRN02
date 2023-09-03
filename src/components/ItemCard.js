import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ItemCard = ({ item, onPressDelete }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.textItem}>{item.name}</Text>
        <Text style={styles.categoryText}>Categoría: {item.category}</Text>
        <Text style={styles.priceText}>Precio: ${item.price}</Text>
        <Text style={styles.quantityText}>Cantidad: {item.quantity}</Text>
        <Text style={styles.quantityText}>Total: ${item.quantity*item.price}</Text>
      </View>
      <TouchableOpacity onPress={onPressDelete} style={styles.deleteButton}>
        <FontAwesome name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFFFFF', // Fondo blanco
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  itemInfo: {
    flex: 1,
  },
  textItem: {
    fontSize: 18,
    color: '#0047AB', // Azul oscuro para el texto del artículo
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 16,
    color: '#0047AB', // Color de texto para la categoría
  },
  priceText: {
    fontSize: 16,
    color: '#0047AB', // Color de texto para el precio
  },
  quantityText: {
    fontSize: 16,
    color: '#0047AB', // Color de texto para la cantidad
  },
  deleteButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ItemCard;
