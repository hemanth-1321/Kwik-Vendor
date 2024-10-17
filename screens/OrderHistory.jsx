import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image } from "react-native";
import Background1 from "../components/background1";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Dummy order history data
const dummyOrders = [
  {
    id: "1",
    itemName: "Pizza",
    orderDate: "2024-09-29",
    price: "₹200",
  },
  {
    id: "2",
    itemName: "Burger",
    orderDate: "2024-09-25",
    price: "₹200",
  },
  {
    id: "3",
    itemName: "Sushi",
    orderDate: "2024-09-20",
    price: "₹200",
  },
];

export const OrderHistory = () => {
  // Render each item
  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.itemName}>{item.itemName}</Text>
      <Text style={styles.orderDate}>Ordered on: {item.orderDate}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );

  return (
    <Background1>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/kwik-bucketz/kwik%20spot.png",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.headerText}>My History</Text>
        </View>
        <FlatList
          data={dummyOrders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id} 
        />
      </SafeAreaView>
    </Background1>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    width: "100%",
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  orderItem: {
    backgroundColor: "#fff",
    borderWidth: 1,

    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    width: "100%",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  orderDate: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
    color: "#28a745",
  },
});
