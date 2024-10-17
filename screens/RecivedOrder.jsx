import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  useColorScheme,
  Image,
  TouchableOpacity, // Import TouchableOpacity for the button
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axiosInstance from "../axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background1 from "../components/background1";
const { width } = Dimensions.get("window");

export const Received = () => {
  const [orders, setOrders] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsFetching(true);
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }
      const response = await axiosInstance.get("/vendors/recivedOrders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    } finally {
      setIsFetching(false);
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
          />
        </View>

        {isFetching ? (
          <ActivityIndicator
            size="large"
            color={isDarkMode ? "#fff" : "#000"}
          />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(order) => order.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.orderContainer}>
                <Text
                  style={[
                    styles.orderMessage,
                    isDarkMode && styles.darkOrderText,
                  ]}
                >
                  Message: {item.message}
                </Text>
                <Text
                  style={[
                    styles.orderTimestamp,
                    isDarkMode && styles.darkOrderText,
                  ]}
                >
                  Ordered at: {new Date(item.timestamp).toLocaleString()}
                </Text>
                <TouchableOpacity style={styles.acceptButton}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
              </View>
            )}
            contentContainerStyle={styles.flatListContent}
          />
        )}
      </SafeAreaView>
    </Background1>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  logoContainer: {
    marginTop: "10%",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10,
  },
  logo: {
    width: wp("60%"),
    height: hp("10%"),
    resizeMode: "contain",
  },
  orderContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderMessage: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  orderOtp: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  orderTimestamp: {
    fontSize: 16,
    color: "#333",
  },
  darkOrderText: {
    color: "#fff",
  },
  acceptButton: {
    backgroundColor: "#8bce1c", // Set the background color for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 12, // Add some space above the button
    alignSelf: "flex-start", // Align the button to the start
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    color: "#fff", // Change text color to white for contrast
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
