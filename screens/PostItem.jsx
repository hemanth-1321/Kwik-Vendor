import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  useColorScheme,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axiosInstance from "../axiosInstance";
import Background1 from "../components/background1";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export const PostItem = ({ storeName }) => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemTime, setItemTime] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const route = useRoute();
  const { categoryId, subcategoryId } = route.params || {};

  // Store categoryId and subcategoryId when they are first available
  useEffect(() => {
    if (categoryId && subcategoryId) {
      storeCategoryAndSubcategory(categoryId, subcategoryId);
    }
  }, [categoryId, subcategoryId]);

  const storeCategoryAndSubcategory = async (categoryId, subcategoryId) => {
    try {
      await AsyncStorage.setItem("categoryId", categoryId.toString());
      await AsyncStorage.setItem("subcategoryId", subcategoryId.toString());
    } catch (error) {
      console.error("Error storing category and subcategory:", error.message);
    }
  };

  // Fetch the stored categoryId and subcategoryId when needed
  const getCategoryAndSubcategory = async () => {
    try {
      const storedCategoryId = await AsyncStorage.getItem("categoryId");
      const storedSubcategoryId = await AsyncStorage.getItem("subcategoryId");
      return {
        categoryId: parseInt(storedCategoryId),
        subcategoryId: parseInt(storedSubcategoryId),
      };
    } catch (error) {
      console.error("Error retrieving category and subcategory:", error.message);
      return { categoryId: null, subcategoryId: null };
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsFetching(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }
      const response = await axiosInstance.get("/vendors/getItems", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error.message);
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddItem = async () => {
    if (!itemName.trim()) {
      Alert.alert("Error", "Please enter a valid item name.");
      return;
    }

    const price = parseFloat(itemPrice);
    if (isNaN(price) || price <= 0) {
      Alert.alert("Error", "Please enter a valid price greater than 0.");
      return;
    }

    setIsLoading(true);
    const token = await AsyncStorage.getItem("authToken");
    const { categoryId, subcategoryId } = await getCategoryAndSubcategory();
    try {
      const itemData = {
        name: itemName,
        price,
        categoryId,
        subcategoryId,
        time: categoryId === 6 ? itemTime : null,
      };

      if (editingIndex !== null) {
        await axiosInstance.put(
          `/vendors/items/${items[editingIndex].id}`,
          itemData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Alert.alert("Success", "Item updated successfully!");
        setEditingIndex(null);
      } else {
        await axiosInstance.post("/vendors/postitem", itemData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Alert.alert("Success", "Item added successfully!");
      }
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error.message);
      Alert.alert("Error", "Failed to add/update item. Please try again.");
    } finally {
      setIsLoading(false);
      setItemName("");
      setItemPrice("");
      setItemTime("");
    }
  };

  const handleEditItem = (index) => {
    const item = items[index];
    setItemName(item.name);
    setItemPrice(item.price.toString());
    setItemTime(item.time || "");
    setEditingIndex(index);
  };

  const handleRemoveItem = async (itemId) => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      await axiosInstance.delete(`/vendors/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchItems();
    } catch (error) {
      console.error("Error removing item:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Background1>
      <SafeAreaView
        style={[styles.container, isDarkMode && styles.darkContainer]}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/kwik-bucketz/kwik%20spot.png",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.title, isDarkMode && styles.darkTitle]}>
          {storeName}
        </Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, isDarkMode && styles.darkLabel]}>
            {editingIndex !== null ? "Edit Item" : "Add Item"}
          </Text>
          <TextInput
            value={itemName}
            onChangeText={setItemName}
            placeholder={categoryId === 6 ? "Movie Name" : "Item Name"}
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
          />
          <TextInput
            value={itemPrice}
            onChangeText={setItemPrice}
            placeholder="Item Price"
            keyboardType="numeric"
            style={[styles.input, isDarkMode && styles.darkInput]}
            placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
          />
          {categoryId === 6 && (
            <TextInput
              value={itemTime}
              onChangeText={setItemTime}
              placeholder="Movie Time"
              style={[styles.input, isDarkMode && styles.darkInput]}
              placeholderTextColor={isDarkMode ? "#ccc" : "#000"}
            />
          )}
          <TouchableOpacity
            onPress={handleAddItem}
            disabled={isLoading}
            style={[styles.addButton, isLoading && styles.disabledButton]}
          >
            <Text style={styles.addButtonText}>
              {editingIndex !== null ? "Update Item" : "Add Item"}
            </Text>
          </TouchableOpacity>
          {isLoading && <ActivityIndicator size="small" color="#8bce1c" />}
        </View>

        <ScrollView
          style={[
            styles.itemsContainer,
            isDarkMode && styles.darkItemsContainer,
          ]}
        >
          {isFetching ? (
            <ActivityIndicator size="large" color={isDarkMode ? "#fff" : "#000"} />
          ) : (
            <View>
              <Text style={[styles.label, isDarkMode && styles.darkLabel]}>
                Items
              </Text>
              {items.map((item, index) => (
                <View key={item.id} style={styles.item}>
                  <View>
                    <Text
                      style={[
                        styles.itemName,
                        isDarkMode && styles.darkItemName,
                      ]}
                    >
                      {categoryId === 6
                        ? `Movie: ${item.name}`
                        : `Item: ${item.name}`}
                    </Text>
                    <Text
                      style={[
                        styles.itemPrice,
                        isDarkMode && styles.darkItemPrice,
                      ]}
                    >
                      Price: ₹{item.price.toFixed(2)}
                    </Text>
                    {item.time && (
                      <Text
                        style={[
                          styles.itemTime,
                          isDarkMode && styles.darkItemTime,
                        ]}
                      >
                        Time: {item.time}
                      </Text>
                    )}
                  </View>
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity
                      style={[
                        styles.editButton,
                        isDarkMode && styles.darkEditButton,
                      ]}
                      onPress={() => handleEditItem(index)}
                    >
                      <Text
                        style={[
                          styles.editButtonText,
                          isDarkMode && styles.darkEditButtonText,
                        ]}
                      >
                        Edit
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.removeButton,
                        isDarkMode && styles.darkRemoveButton,
                      ]}
                      onPress={() => handleRemoveItem(item.id)}
                    >
                      <Text
                        style={[
                          styles.removeButtonText,
                          isDarkMode && styles.darkRemoveButtonText,
                        ]}
                      >
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Background1>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  logoContainer: {
    marginTop: "0.5%",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 10,
  },
  logo: {
    width: wp("60%"),
    height: hp("30%"),
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#000",
  },
  darkTitle: {
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 16,
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000",
  },
  darkLabel: {
    color: "#000",
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#fff",
    padding: 8,
    marginBottom: 8,
    borderRadius: 20,
    width: width * 0.9,
    alignSelf: "center",
    color: "#000",
  },
  darkInput: {
    borderColor: "#555",
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#8bce1c",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: "60%",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  itemsContainer: {
    flex: 1,
    marginTop: 16,
    backgroundColor: "#f5f5f5", // Apply background color to items container
    borderRadius: 10, // Optional: Add rounded corners
    padding: 16, // Optional: Add some padding inside the container
  },
  darkItemsContainer: {
    backgroundColor: "#444", // Dark mode background
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#000",
    paddingHorizontal: 10,
  },
  itemName: {
    fontSize: 16,
    color: "#000",
  },
  darkItemName: {
    color: "#fff",
  },
  itemPrice: {
    fontSize: 16,
    textAlign: "left",
    color: "#000",
  },
  darkItemPrice: {
    color: "#000",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#8bce1c",
    padding: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  darkEditButton: {
    backgroundColor: "#8bce1c",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  darkEditButtonText: {
    color: "#ddd",
  },
  removeButton: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 4,
  },
  darkRemoveButton: {
    backgroundColor: "#8b0000",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  darkRemoveButtonText: {
    color: "#ddd",
  },
  itemTime: {
    fontSize: 14,
    color: "#333",
  },
  darkItemTime: {
    color: "#fff",
  },
});
