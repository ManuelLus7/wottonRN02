import React from 'react';
import { Modal as NewModal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ItemListModal = ({ modalVisible, onHandleDelete, nombreItem, closeModal }) => {
  return (
    // Modal utilizado para mostrar la confirmación de eliminación
    <NewModal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Título del modal */}
          <View style={styles.modalTitle}>
            <Text style={styles.modalTitleText}>Confirmar Eliminación</Text>
          </View>
          {/* Mensaje de confirmación */}
          <View style={styles.modalMessage}>
            <Text style={styles.modalMessageText}>
              ¿Estás seguro de eliminar el elemento "{nombreItem}"?
            </Text>
          </View>
          {/* Botones de acción */}
          <View style={styles.modalButtons}>
            {/* Botón de Cancelar */}
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={closeModal}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            {/* Botón de Eliminar */}
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
  // Contenedor principal del modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Contenido del modal
  modalContent: {
    backgroundColor: '#FFFFFF', // Fondo azul claro
    borderRadius: 25,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#0047AB', // Azul oscuro para la sombra
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Efecto de elevación en Android
  },
  // Título del modal
  modalTitle: {
    borderBottomWidth: 1,
    borderBottomColor: '#0047AB', // Borde azul oscuro
    marginBottom: 15,
  },
  modalTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: '#0047AB', // Texto azul oscuro
  },
  // Mensaje de confirmación
  modalMessage: {
    marginBottom: 20,
  },
  modalMessageText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#0047AB', // Texto azul oscuro
  },
  // Contenedor de botones
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  // Estilo base para botones
  modalButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  // Estilo para el botón de Cancelar
  cancelButton: {
    backgroundColor: '#ccc', // Gris claro
  },
  // Estilo para el botón de Eliminar
  deleteButton: {
    backgroundColor: '#ff6347', // Rojo
  },
  // Estilo para el texto de los botones
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Texto blanco
  },
  // Estilo para el texto del botón de Eliminar
  deleteButtonText: {
    color: '#fff', // Texto blanco
  },
});

export default ItemListModal;
