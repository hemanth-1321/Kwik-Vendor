import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import Background1 from "../components/background1";
import * as Animatable from "react-native-animatable";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Destructure categoryId and subcategoryId from route.params
  const { categoryId, subcategoryId } = route.params || {};

  // Log categoryId and subcategoryId for debugging
  console.log("CategoryID:", categoryId, "Subcategory ID:", subcategoryId);

  const handleSignOut = async () => {
    try {
      // Clear all stored data including tokens (if applicable)
      navigation.replace("LandingPage");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  return (
    <Background1>
      <View style={styles.container}>
        <Animatable.View
          animation="bounceIn"
          duration={1500}
          style={styles.logoContainer}
        >
          <Image
            source={{
              uri: "https://storage.googleapis.com/kwik-bucketz/kwik%20spot.png",
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animatable.View>

        <Text style={styles.storeName}>Your Store</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Received")}
        >
          <Text style={styles.buttonText}>RECEIVED ORDERS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("OrderHistory")}
        >
          <Text style={styles.buttonText}>ORDER HISTORY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("PostItem", { categoryId, subcategoryId })
          }
        >
          <Text style={styles.buttonText}>ADD ITEMS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ContactUs")}
        >
          <Text style={styles.buttonText}>CONTACT US</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </Background1>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? 30 : 50,
    paddingHorizontal: wp("5%"),
  },
  logo: {
    width: wp("60%"),
    height: hp("10%"),
    resizeMode: "contain",
  },
  storeName: {
    fontSize: hp("3%"),
    fontWeight: "bold",
    color: "white",
    marginBottom: hp("2%"),
  },
  button: {
    backgroundColor: "#8bce1c",
    borderRadius: 25,
    paddingVertical: hp("2%"),
    width: wp("80%"),
    marginVertical: hp("1%"),
    alignItems: "center",
  },
  signOutButton: {
    backgroundColor: "black",
    borderRadius: 25,
    paddingVertical: hp("2%"),
    width: wp("50%"),
    marginVertical: hp("1%"),
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: hp("2.5%"),
    fontWeight: "bold",
  },
});
