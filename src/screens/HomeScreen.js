import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import ItemCard from "../components/ItemCard";
import ItemListModal from "../components/ItemListModal";
import CarritoModal from "../components/CarritoModal";
import Footer from "../components/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const HomeScreen = ({ navigation }) => {
  // Estados para gestionar los datos y la interfaz
  const [textValue, setTextValue] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelectedName, setItemSelectedName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false);

  // Cargar datos desde AsyncStorage cuando se monta el componente
  useEffect(() => {
    AsyncStorage.getItem("itemsList")
      .then((storedItems) => {
        if (storedItems) {
          setItemsList(JSON.parse(storedItems));
        }
      })
      .catch((error) => console.error(error));
  }, []);

  // Guardar los datos en AsyncStorage
  const saveItemsToStorage = () => {
    AsyncStorage.setItem("itemsList", JSON.stringify(itemsList))
      .then(() => console.log("Lista de artículos guardada en AsyncStorage"))
      .catch((error) => console.error(error));
  };

  // Función para manejar el cambio en el campo de texto
  const onHandleChangeItem = (text) => setTextValue(text);

  // Función para agregar un nuevo artículo o guardar uno existente
  const addItem = () => {
    if (
      textValue === "" ||
      selectedCategory === "" ||
      itemPrice === "" ||
      itemQuantity === ""
    ) {
      return;
    }

    if (isEditing) {
      // Editar un artículo existente
      const updatedItems = [...itemsList];
      updatedItems[itemSelected].name = textValue;
      updatedItems[itemSelected].category = selectedCategory;
      updatedItems[itemSelected].price = parseFloat(itemPrice);
      updatedItems[itemSelected].quantity = parseInt(itemQuantity);
      setItemsList(updatedItems);
      setIsEditing(false);
    } else {
      // Agregar un nuevo artículo
      setItemsList((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          name: textValue,
          category: selectedCategory,
          price: parseFloat(itemPrice),
          quantity: parseInt(itemQuantity),
        },
      ]);
    }

    // Limpiar los campos
    setTextValue("");
    setSelectedCategory("");
    setItemPrice("");
    setItemQuantity("");
    saveItemsToStorage();
  };

  // Función para renderizar cada elemento en la lista de artículos
  const renderListItem = ({ item, index }) => (
    <View style={styles.itemCardContainer}>
      <ItemCard
        item={item}
        onPressDelete={() => onHandleModal(index, item.name)}
        onPressEdit={() => onEditItem(index)}
      />
    </View>
  );

  // Editar un artículo existente
  const onEditItem = (index) => {
    const itemToEdit = itemsList[index];
    setTextValue(itemToEdit.name);
    setSelectedCategory(itemToEdit.category);
    setItemPrice(itemToEdit.price.toString());
    setItemQuantity(itemToEdit.quantity.toString());
    setIsEditing(true);
    setItemSelected(index);
  };

  // Confirmar la eliminación de un artículo
  const confirmDeleteItem = () => {
    let arr = [...itemsList];
    arr.splice(itemSelected, 1);
    setItemsList(arr);
    setModalVisible(false);
    saveItemsToStorage();
  };

  // Cerrar el modal de confirmación de eliminación
  const closeModal = () => {
    setModalVisible(false);
  };

  // Manejar el evento de tocar un artículo para mostrar el modal de confirmación
  const onHandleModal = (index, name) => {
    setItemSelected(index);
    setItemSelectedName(name);
    setModalVisible(true);
  };

  // Borrar todos los datos almacenados en AsyncStorage
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setItemsList([]);
      console.log("Memoria de AsyncStorage borrada correctamente.");
    } catch (error) {
      console.error("Error al borrar la memoria de AsyncStorage:", error);
    }
  };

  // Actualizar la cantidad de artículos en el carrito
  const actualizarCantidad = (updatedItems) => {
    setItemsList(updatedItems);
  };

  return (
    <View style={styles.container}>
      {/* Título de la pantalla */}
      <Text style={styles.title}>Lista de Compras</Text>
      {/* Encabezado con información de carrito y botón para limpiar */}
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.cartButton}
            onPress={() => setCartModalVisible(true)}
          >
            <FontAwesome name="shopping-cart" size={32} color="#0047AB" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{itemsList.length} artículos</Text>
        </View>
        <TouchableOpacity style={styles.clearButton} onPress={clearStorage}>
          <Text style={styles.clearButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>
      {/* Formulario para agregar/editar artículos */}
      <View style={styles.inputContainer}>
        {/* Campos de entrada de datos */}
        <TextInput
          style={styles.input}
          placeholder="Nuevo Artículo"
          value={textValue}
          onChangeText={onHandleChangeItem}
        />
        <TextInput
          style={styles.input}
          placeholder="Categoría"
          value={selectedCategory}
          onChangeText={setSelectedCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={itemPrice === "" ? "" : itemPrice.toString()}
          onChangeText={(text) => {
            if (!isNaN(text)) {
              setItemPrice(parseFloat(text));
            }
          }}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Cantidad de Unidades"
          value={itemQuantity}
          onChangeText={setItemQuantity}
          keyboardType="numeric"
        />
        {/* Botón para agregar/editar artículo */}
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>
            {isEditing ? "Guardar" : "AGREGAR +"}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Lista de artículos */}
      <FlatList
        data={itemsList}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />

            {/* Añad0 el componente Footer */}
            <Footer />

      {/* Modal de confirmación de eliminación de artículo */}
      <ItemListModal
        modalVisible={modalVisible}
        onHandleDelete={confirmDeleteItem}
        nombreItem={itemSelectedName}
        closeModal={closeModal}
      />
      {/* Modal del carrito de compras */}
      <CarritoModal
        isVisible={cartModalVisible}
        onHideModal={() => setCartModalVisible(false)}
        items={itemsList}
        onUpdateQuantity={actualizarCantidad} // Asegúrate de pasar la función aquí
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 45,
    backgroundColor: "#F6F6F6",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#0047AB",
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#0047AB",
    borderRadius: 25,
    padding: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  clearButton: {
    backgroundColor: "#FF0000",
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemCardContainer: {
    flex: 1,
    margin: 10,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cartButton: {
    marginRight: 10,
  },
});

export default HomeScreen;
