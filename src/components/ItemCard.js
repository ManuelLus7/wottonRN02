import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ItemCard = ({ item, onPressDelete, onPressEdit }) => {
  return (
    // Contenedor principal del elemento del artículo
    <View style={styles.itemContainer}>
      {/* Contenedor de información del artículo */}
      <View style={styles.itemInfo}>
        {/* Nombre del artículo */}
        <Text style={styles.textItem}>{item.name}</Text>
        {/* Categoría del artículo */}
        <Text style={styles.categoryText}>Categoría: {item.category}</Text>
        {/* Precio del artículo */}
        <Text style={styles.priceText}>Precio: ${item.price.toFixed(2)}</Text>
        {/* Cantidad del artículo */}
        <Text style={styles.quantityText}>Cantidad: {item.quantity}</Text>
        {/* Total del artículo (cantidad x precio) */}
        <Text style={styles.totalText}>Total: ${item.quantity * item.price}</Text>
      </View>
      {/* Contenedor de botones (Editar y Eliminar) */}
      <View style={styles.buttonsContainer}>
        {/* Botón de editar */}
        <TouchableOpacity onPress={onPressEdit} style={styles.editButton}>
          <FontAwesome name="pencil" size={24} color="#0047AB" />
        </TouchableOpacity>
        {/* Botón de eliminar */}
        <TouchableOpacity onPress={onPressDelete} style={styles.deleteButton}>
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Estilo del contenedor principal del artículo
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'column', // Cambio de dirección a columna
    elevation: 3, // Sombra en Android
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Color de sombra
    shadowOffset: { width: 0, height: 2 }, // Desplazamiento de sombra
    shadowOpacity: 0.8, // Opacidad de sombra
    shadowRadius: 3, // Radio de sombra
  },
  // Estilo del contenedor de información del artículo
  itemInfo: {
    flex: 1, // Ocupa todo el espacio disponible
    marginBottom: 10, // Espacio entre la información y los botones
  },
  // Estilo del nombre del artículo
  textItem: {
    fontSize: 18,
    color: '#0047AB',
    fontWeight: 'bold',
  },
  // Estilo de la categoría del artículo
  categoryText: {
    fontSize: 16,
    color: '#0047AB',
  },
  // Estilo del precio del artículo
  priceText: {
    fontSize: 16,
    color: '#0047AB',
  },
  // Estilo de la cantidad del artículo
  quantityText: {
    fontSize: 16,
    color: '#0047AB',
  },
  // Estilo del total del artículo (cantidad x precio)
  totalText: {
    fontSize: 16,
    color: '#0047AB',
  },
  // Estilo del contenedor de botones
  buttonsContainer: {
    flexDirection: 'row', // Disposición horizontal de los botones
  },
  // Estilo del botón de editar
  editButton: {
    backgroundColor: 'transparent', // Fondo transparente
    paddingHorizontal: 10, // Espaciado horizontal
    marginRight: 10, // Margen derecho
  },
  // Estilo del botón de eliminar
  deleteButton: {
    backgroundColor: 'transparent', // Fondo transparente
    paddingHorizontal: 10, // Espaciado horizontal
  },
});

export default ItemCard;
