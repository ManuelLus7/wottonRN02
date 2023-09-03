import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CarritoModal = ({ isVisible, onHideModal, items }) => {
  const calculateTotal = () => {
    let total = 0;
    for (const item of items) {
      total += item.price * item.quantity;
    }
    return total.toFixed(2);
  };

  console.log('items:', items); // Agregado: Muestra el array de items

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onHideModal}
    >
      <View style={styles.cartModal}>
        <Text style={styles.cartModalTitle}>Detalle de la Compra</Text>
        {/* Lista de items del carrito */}
        <View style={styles.cartItemsContainer}>
          {items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemQuantity}>Cantidad: {item.quantity}</Text>
              <Text style={styles.cartItemPrice}>
                Precio: ${item.price !== undefined ? item.price.toFixed(2) : 'Precio no disponible'}
              </Text>
            </View>
          ))}
        </View>

        {/* Total de la compra */}
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={onHideModal}
          >
            <FontAwesome name="arrow-left" size={20} color="#FFFFFF" />
            <Text style={styles.continueShoppingButtonText}>Seguir Comprando</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              // Agrega aquí la lógica para finalizar la compra
              // Puedes realizar acciones como procesar el pago y más.
              onHideModal();
            }}
          >
            <FontAwesome name="check-circle" size={20} color="#FFFFFF" />
            <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  cartModal: {
    flex: 1,
    backgroundColor: '#F6F6F6', // Color de fondo
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  cartModalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  cartItemsContainer: {
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cartItemName: {
    fontSize: 18,
    color: '#333333',
  },
  cartItemQuantity: {
    fontSize: 16,
    color: '#777777',
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  continueShoppingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0047AB',
    borderRadius: 5,
    padding: 10,
  },
  continueShoppingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00CC00',
    borderRadius: 5,
    padding: 10,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default CarritoModal;
