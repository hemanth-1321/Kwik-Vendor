import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import Background1 from "../components/background1";
import Icon from "react-native-vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const ThankYouPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId, subcategoryId } = route.params || {};

  // Logging categoryId and subcategoryId from the route
  console.log("From route params - categoryId:", categoryId);
  console.log("From route params - subcategoryId:", subcategoryId);

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      // Prevent the default behavior of going back
      e.preventDefault();
    });

    return unsubscribe;
  }, [navigation]);

  const handleGoHomePress = () => {
    navigation.navigate("Home", {
      categoryId,
      subcategoryId,
    }); // Navigate to Home screen
  };
  console.log(categoryId, subcategoryId); 
  const fadeIn = {
    0: { opacity: 0, translateY: -20 },
    1: { opacity: 1, translateY: 0 },
  };

  return (
    <Background1>
      <View style={styles.container}>
        {/* Animated Thank You Text */}
        <Animatable.Text animation={fadeIn} delay={300} style={styles.title}>
          Thank You!
        </Animatable.Text>

        {/* Animated Subtitle */}
        <Animatable.Text animation={fadeIn} delay={600} style={styles.subtitle}>
          We appreciate your interest in joining our vendor community.
        </Animatable.Text>

        {/* Go to Home Button */}
        <Animatable.View animation="fadeInUp" delay={900}>
          <TouchableOpacity style={styles.button} onPress={handleGoHomePress}>
            <View style={styles.buttonContent}>
              <Icon name="home-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>Go to Home</Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </Background1>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: wp("5%"),
  },
  title: {
    fontSize: hp("4%"),
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: hp("2%"),
  },
  subtitle: {
    fontSize: hp("2%"),
    color: "#000",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: hp("3%"),
  },
  button: {
    backgroundColor: "#8bce1c",
    paddingVertical: hp("2.5%"),
    paddingHorizontal: wp("10%"),
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    marginLeft: wp("2%"),
  },
});
