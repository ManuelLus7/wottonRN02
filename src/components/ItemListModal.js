import React from 'react';
import { Modal as NewModal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ItemListModal = ({ modalVisible, onHandleDelete, nombreItem, closeModal }) => {
  return (
    <NewModal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTitleText}>Confirmar Eliminación</Text>
          </View>
          <View style={styles.modalMessage}>
            <Text style={styles.modalMessageText}>
              ¿Estás seguro de eliminar el elemento "{nombreItem}"?
            </Text>
          </View>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={closeModal}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.deleteButton]}
              onPress={() => {
                onHandleDelete();
                closeModal();
              }}
            >
              <Text style={[styles.buttonText, styles.deleteButtonText]}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </NewModal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#FFFFFF', // Fondo azul claro
      borderRadius: 25,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#0047AB', // Azul oscuro para la sombra
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      borderBottomWidth: 1,
      borderBottomColor: '#0047AB', // Azul oscuro para el borde
      marginBottom: 15,
    },
    modalTitleText: {
      fontSize: 18,
      fontWeight: 'bold',
      padding: 10,
      color: '#0047AB', // Azul oscuro para el texto del título
    },
    modalMessage: {
      marginBottom: 20,
    },
    modalMessageText: {
      fontSize: 16,
      textAlign: 'center',
      color: '#0047AB', // Azul oscuro para el texto del mensaje
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    cancelButton: {
      backgroundColor: '#ccc', // Gris claro para el botón de cancelar
    },
    deleteButton: {
      backgroundColor: '#ff6347', // Rojo para el botón de eliminar
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff', // Texto blanco para los botones
    },
    deleteButtonText: {
      color: '#fff', // Texto blanco para el botón de eliminar
    },
  });
    

export default ItemListModal;
