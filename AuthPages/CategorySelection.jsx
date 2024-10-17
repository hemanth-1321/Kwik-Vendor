import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  Dimensions,
  useColorScheme,
  Image,
  PixelRatio,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Background1 from "../components/background1";
import { ErrorModal } from "../components/ErrorModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../axiosInstance";

const { width, height } = Dimensions.get("window");

// Function to scale font size based on screen density
const scaleFontSize = (size) => size * PixelRatio.getFontScale();

export const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingCategoryId, setLoadingCategoryId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    const checkSelectedCategory = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axiosInstance.get("/vendors/check-category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.categorySelected) {
          navigation.navigate("ThankYou");
        } else {
          fetchCategories();
        }
      } catch (error) {
        setErrorMessage("Error checking selected category");
        setErrorModalVisible(true);
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axiosInstance.get("/vendors/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (error) {
        setErrorMessage("Error fetching categories");
        setErrorModalVisible(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkSelectedCategory();
  }, []);

  const handleSelectCategory = async (categoryId) => {
    try {
      setLoadingCategoryId(categoryId);
      const token = await AsyncStorage.getItem("authToken");

      const selectResponse = await axiosInstance.post(
        "/vendors/select/category",
        { categoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (selectResponse.data.redirectTo === "/Home") {
        navigation.navigate("Home");
        return;
      }

      const response = await axiosInstance.get(
        `/vendors/category/${categoryId}/subcategories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.length > 0) {
        navigation.navigate("SubCategoryPage", { categoryId });
      } else {
        navigation.navigate("ThankYou", { categoryId });
        console.log(categoryId);
      }
    } catch (error) {
      setErrorMessage("Error selecting category");
      setErrorModalVisible(true);
    } finally {
      setLoadingCategoryId(null);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.categoryTile, isDarkMode && styles.categoryTileDark]}
      onPress={() => handleSelectCategory(item.id)}
    >
      {loadingCategoryId === item.id ? (
        <ActivityIndicator size="large" color={isDarkMode ? "#fff" : "#000"} />
      ) : (
        <View style={styles.tileContent}>
          {/* Black Circle */}
          <View style={styles.blackCircle} />
          <Text
            style={[styles.categoryText, isDarkMode && styles.categoryTextDark]}
          >
            {item.name}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Background1>
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={isDarkMode ? "#fff" : "#000"}
          />
        ) : (
          <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.categoriesContainer}
          />
        )}

        <ErrorModal
          visible={isErrorModalVisible}
          message={errorMessage}
          onClose={() => setErrorModalVisible(false)}
        />
      </SafeAreaView>
    </Background1>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingTop: Platform.OS === "android" ? 44 : 0,
  },
  categoriesContainer: {
    flexGrow: 1,
    paddingHorizontal: "3%",
    paddingBottom: "5%",
    paddingTop: height * 10,
  },
  categoryTile: {
    flex: 1,
    margin: "3%",
    height: height * 0.2, // Height dynamically based on screen size
    backgroundColor: "#d6a62d",
    borderRadius: 100,
    resizeMode: "contain",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  categoryTileDark: {
    backgroundColor: "#333",
  },
  tileContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%", // Make sure the content takes up full tile width
    aspectRatio: 1, // Ensures the content inside scales proportionally
  },
  blackCircle: {
    position: 'absolute',
    width: '80%', // Adjust width based on the tile size
    height: '80%', // Adjust height based on the tile size
    borderRadius: 100, // Make it a circle
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Ensure it's behind the text
  },
  categoryText: {
    fontSize: scaleFontSize(width * 0.045), // Scale text size based on screen width
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    zIndex: 2, // Ensure text is above the circle
  },
  categoryTextDark: {
    color: "#fff",
  },
});
