import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Alert, ScrollView } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CarritoModal = ({ isVisible, onHideModal, items, onUpdateQuantity }) => {
  // Estado para almacenar el total de la compra
  const [total, setTotal] = useState(calculateTotal());

  // Función para calcular el total de la compra
  function calculateTotal() {
    let total = 0;
    for (const item of items) {
      const priceAsNumber = parseFloat(item.price);
      if (!isNaN(priceAsNumber)) {
        total += priceAsNumber * item.quantity;
      }
    }
    return total.toFixed(2);
  }

  // Función para disminuir la cantidad de un artículo en el carrito
  const decreaseQuantity = (index) => {
    if (items[index].quantity > 1) {
      const updatedItems = [...items];
      updatedItems[index].quantity -= 1;
      onUpdateQuantity(updatedItems);
      setTotal(calculateTotal());
    } else {
      Alert.alert(
        'Eliminar artículo',
        '¿Deseas eliminar este artículo del carrito?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Eliminar',
            onPress: () => {
              const updatedItems = [...items];
              updatedItems.splice(index, 1);
              onUpdateQuantity(updatedItems);
              setTotal(calculateTotal());
            },
          },
        ],
        { cancelable: false }
      );
    }
  };

  // Función para aumentar la cantidad de un artículo en el carrito
  const increaseQuantity = (index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity += 1;
    onUpdateQuantity(updatedItems);
    setTotal(calculateTotal());
  };

  return (
    // Componente de Modal que muestra el carrito de compras
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onHideModal}
    >
      <View style={styles.cartModal}>
        {/* Título del modal */}
        <Text style={styles.cartModalTitle}>Detalle de la Compra</Text>
        <ScrollView>
          <View style={styles.cartItemsContainer}>
            {/* Encabezado de la tabla */}
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Artículo</Text>
              <Text style={styles.tableHeaderText}>Cantidad</Text>
              <Text style={styles.tableHeaderText}>Subtotal</Text>
            </View>
            {/* Lista de artículos en el carrito */}
            {items.map((item, index) => (
              <View key={item.id} style={styles.cartItem}>
                <Text style={styles.cartItemName}>
                  {item.name}
                </Text>
                {/* Controles para aumentar y disminuir la cantidad */}
                <View style={styles.cartItemControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => decreaseQuantity(index)}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => increaseQuantity(index)}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                {/* Subtotal del artículo */}
                <Text style={styles.cartItemSubtotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
        {/* Total de la compra */}
        <Text style={styles.totalText}>Total: ${total}</Text>
        {/* Contenedor de botones */}
        <View style={styles.buttonsContainer}>
          {/* Botón para seguir comprando */}
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={onHideModal}
          >
            <FontAwesome name="arrow-left" size={20} color="#FFFFFF" />
            <Text style={styles.continueShoppingButtonText}>
              Seguir Comprando
            </Text>
          </TouchableOpacity>
          {/* Botón para finalizar la compra */}
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              // Aqui Iria Toda la Logica para Finalizar la Compra y las Opciones de Pago
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

// Estilos del componente
const styles = StyleSheet.create({
  // Estilo del modal principal
  cartModal: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingTop: 50,
    paddingHorizontal: 20,
    width: '100%',
    alignSelf: 'center',
  },
  // Estilo del título del modal
  cartModalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  // Estilo del contenedor de los elementos del carrito
  cartItemsContainer: {
    marginBottom: 40,
  },
  // Estilo del encabezado de la tabla
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  // Estilo de los encabezados de la tabla
  tableHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  // Estilo de un artículo en la lista del carrito
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  // Estilo del nombre del artículo
  cartItemName: {
    fontSize: 18,
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  // Estilo de la cantidad del artículo
  cartItemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
    textAlign: 'center',
  },
  // Estilo del subtotal del artículo
  cartItemSubtotal: {
    fontSize: 16,
    color: '#777777',
    flex: 1,
    textAlign: 'center',
  },
  // Estilo de los controles de cantidad (+ y -)
  cartItemControls: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  // Estilo del botón de cantidad (+ y -)
  quantityButton: {
    backgroundColor: '#0047AB',
    borderRadius: 5,
    padding: 5,
  },
  // Estilo del texto de los botones de cantidad (+ y -)
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // Estilo del texto que muestra el total de la compra
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
    textAlign: 'center',
  },
  // Estilo del contenedor de botones
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Estilo del botón para seguir comprando
  continueShoppingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0047AB',
    borderRadius: 5,
    padding: 10,
    marginBottom: 35, // Margen inferior añadido
  },
  // Estilo del texto del botón para seguir comprando
  continueShoppingButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  // Estilo del botón para finalizar la compra
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00CC00',
    borderRadius: 5,
    padding: 10,
    marginBottom: 35, // Margen inferior añadido
  },
  // Estilo del texto del botón para finalizar la compra
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  }
});

export default CarritoModal;
