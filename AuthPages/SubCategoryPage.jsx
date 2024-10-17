import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  Platform,
  useColorScheme,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Background1 from "../components/background1";
import { ErrorModal } from "../components/ErrorModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../axiosInstance";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

export const SubCategoryPage = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorModalVisible, setErrorModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const categoryId = route.params?.categoryId;
  const colorScheme = useColorScheme();

  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const response = await axiosInstance.get(
          `/vendors/category/${categoryId}/subcategories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubCategories(response.data);
        console.log(response.data);
      } catch (error) {
        setErrorMessage("Error fetching subcategories");
        console.log(error.message);
        setErrorModalVisible(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubCategories();
  }, [categoryId]);

  const handleSelectSubCategory = async (subcategoryId) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      // Send POST request to the backend to save the selected subcategory
      const response = await axiosInstance.post(
        "/vendors/select/subcategory", // Ensure this matches your backend route
        { subcategoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming response contains a success message
      if (response.data.message) {
        console.log(response.data.message);
        navigation.navigate("ThankYou", { categoryId, subcategoryId }); // Navigate to the next page after success
      }
      console.log(categoryId, subcategoryId);
    } catch (error) {
      console.error("Error selecting subcategory:", error.message);
      setErrorMessage("Error selecting subcategory");
      setErrorModalVisible(true);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.subCategoryTile, isDarkMode && styles.subCategoryTileDark]}
      onPress={() => handleSelectSubCategory(item.id)} // Call the function on click
    >
      <Image
        source={{ uri: item.imgUrl }}
        style={styles.subCategoryImage}
        resizeMode="cover"
      />
      <Text
        style={[
          styles.subCategoryText,
          isDarkMode && styles.subCategoryTextDark,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Background1>
      <SafeAreaView style={styles.container}>
        <View style={[styles.header, isDarkMode && styles.headerDark]}>
          <Text
            style={[styles.headerText, isDarkMode && styles.headerTextDark]}
          >
            Choose a Subcategory
          </Text>
        </View>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={isDarkMode ? "#fff" : "#000"}
          />
        ) : (
          <FlatList
            data={subCategories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numRows={2}
            contentContainerStyle={styles.subCategoriesContainer}
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
    width: width,
    height: height,
    paddingTop: Platform.OS === "android" ? hp("3%") : hp("1%"),
  },
  header: {
    alignItems: "center",
    paddingVertical: hp("2%"),
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginBottom: "20%",
  },
  headerDark: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  headerText: {
    fontSize: hp("3.5%"),
    fontWeight: "bold",
    color: "#333",
  },
  headerTextDark: {
    color: "#fff",
  },
  subCategoriesContainer: {
    flexGrow: 1,
    flexDirection: "column",
    paddingHorizontal: wp("2%"),
    paddingBottom: hp("2%"),
    paddingTop: hp("10%"),
  },
  subCategoryTile: {
    flex: 1,
    flexDirection: "column",
    margin: wp("2%"),
    height: hp("20%"), // Adjusted height to fit images
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  subCategoryTileDark: {
    backgroundColor: "#333",
  },
  subCategoryImage: {
    width: "100%",
    height: "70%",
    borderRadius: 16,
  },
  subCategoryText: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  subCategoryTextDark: {
    color: "#fff",
  },
});
