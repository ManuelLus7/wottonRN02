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
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CarritoModal from "../components/CarritoModal"; // Importa el componente del carrito

const HomeScreen = ({ navigation }) => {
  const [textValue, setTextValue] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [itemSelected, setItemSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelectedName, setItemSelectedName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false); // Estado para mostrar/ocultar el modal del carrito

  useEffect(() => {
    AsyncStorage.getItem("itemsList")
      .then((storedItems) => {
        if (storedItems) {
          setItemsList(JSON.parse(storedItems));
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const saveItemsToStorage = () => {
    AsyncStorage.setItem("itemsList", JSON.stringify(itemsList))
      .then(() => console.log("Lista de artículos guardada en AsyncStorage"))
      .catch((error) => console.error(error));
  };

  const onHandleChangeItem = (text) => setTextValue(text);

  const addItem = () => {
    console.log("Agregando artículo...");
    console.log("textValue:", textValue);
    console.log("selectedCategory:", selectedCategory);
    console.log("itemPrice:", itemPrice);
    console.log("itemQuantity:", itemQuantity);
    if (
      textValue === "" ||
      selectedCategory === "" ||
      itemPrice === "" ||
      itemQuantity === ""
    ) {
      return;
    }

    if (isEditing) {
      const updatedItems = [...itemsList];
      updatedItems[itemSelected].name = textValue;
      updatedItems[itemSelected].category = selectedCategory;
      updatedItems[itemSelected].price = itemPrice;
      updatedItems[itemSelected].quantity = itemQuantity;
      setItemsList(updatedItems);
      setIsEditing(false);
    } else {
      setItemsList((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          name: textValue,
          category: selectedCategory,
          price: itemPrice,
          quantity: itemQuantity,
        },
      ]);
    }

    setTextValue("");
    setSelectedCategory("");
    setItemPrice("");
    setItemQuantity("");
    saveItemsToStorage();
  };

  const renderListItem = ({ item, index }) => (
    <View style={styles.itemCardContainer}>
      <ItemCard
        item={item}
        onPressDelete={() =>
          onHandleModal(
            index,
            item.name,
            item.category,
            item.price,
            item.quantity
          )
        }
      />
    </View>
  );

  const editItem = (index, name, category, price, quantity) => {
    setItemSelected(index);
    setModalVisible(false);
    setIsEditing(true);
    setTextValue(name);
    setSelectedCategory(category);
    setItemPrice(price);
    setItemQuantity(quantity);
  };

  const onHandleDelete = () => {
    let arr = [...itemsList];
    arr.splice(itemSelected, 1);
    setItemsList(arr);
    setModalVisible(false);
    saveItemsToStorage();
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onHandleModal = (index, name, category, price, quantity) => {
    console.log("Mostrando modal...");
    console.log("index:", index);
    console.log("name:", name);
    console.log("category:", category);
    console.log("price:", price);
    console.log("quantity:", quantity);

    setItemSelected(index);
    setItemSelectedName(name);
    setSelectedCategory(category);
    setItemPrice(price);
    setItemQuantity(quantity);
    setModalVisible(true);
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setItemsList([]);
      console.log("Memoria de AsyncStorage borrada correctamente.");
    } catch (error) {
      console.error("Error al borrar la memoria de AsyncStorage:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Compras</Text>
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
      <View style={styles.inputContainer}>
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
          value={itemPrice === "" ? "" : itemPrice.toString()} // Convierte el valor a cadena si no está vacío
          onChangeText={(text) => {
            // Verifica si el texto es un número antes de asignarlo
            if (!isNaN(text)) {
              setItemPrice(parseFloat(text)); // Convierte el texto a un número decimal
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
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>
            {isEditing ? "Guardar" : "AGREGAR +"}
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={itemsList}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
      <ItemListModal
        modalVisible={modalVisible}
        onHandleDelete={onHandleDelete}
        nombreItem={itemSelectedName}
        closeModal={closeModal}
        onHandleEdit={editItem}
      />
      <CarritoModal
        isVisible={cartModalVisible}
        onHideModal={() => setCartModalVisible(false)}
        items={itemsList} // Pasa la lista de items al modal del carrito
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
});

export default HomeScreen;
