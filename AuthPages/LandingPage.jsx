import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LandingPage = () => {
  const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem("authToken");
    setIsAuthenticated(!!token); // If token exists, set isAuthenticated to true
  };

  useEffect(() => {
    checkAuthStatus(); // Call on component mount
  }, []);

  const fadeIn = {
    0: { opacity: 0, translateY: -20 },
    1: { opacity: 1, translateY: 0 },
  };

  const handleRegisterPress = () => {
    if (!isAuthenticated) {
      navigation.navigate("Register");
    } else {
      Alert.alert("Already Registered", "You are already logged in.");
    }
  };

  const handleContactUs = () => {
    navigation.navigate("ContactUs");
  };

  const handleGoHomePress = () => {
    if (isAuthenticated) {
      navigation.navigate("Home");
    } else {
      Alert.alert("Authentication Required", "Please log in to access Home.");
    }
  };

  const handleSignOut = async () => {
    await AsyncStorage.removeItem("authToken");
    setIsAuthenticated(false);
    Alert.alert("Signed Out", "You have been successfully logged out.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Animated Logo */}
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

      {/* Animated Welcome Text */}
      <Animatable.Text animation={fadeIn} delay={500} style={styles.title}>
        Welcome
      </Animatable.Text>

      {/* Animated Subtitle */}
      <Animatable.Text
        animation={fadeIn}
        delay={1000}
        style={styles.subtitle}
      >
        Your one-stop shop.
      </Animatable.Text>

      {/* Conditionally Render Register as Vendor Button */}
      {!isAuthenticated && (
        <Animatable.View animation="fadeInUp" delay={1500}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegisterPress}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Register as a Vendor</Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      )}

      {/* Go to Home Button for Authenticated Users */}
      <Animatable.View
        animation="fadeInUp"
        delay={1800}
        style={styles.homeButtonContainer}
      >
        <TouchableOpacity style={styles.button} onPress={handleGoHomePress}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText2}>Go to Home</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleContactUs}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText2}>Contact Us</Text>
          </View>
        </TouchableOpacity>
      </Animatable.View>

      {/* Sign Out Button for Authenticated Users */}
      {isAuthenticated && (
        <Animatable.View animation="fadeInUp" delay={2500}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.signOutText}>Sign Out</Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    marginTop: "1%",
    alignItems: "center",
    marginBottom: 150,
    paddingVertical: 10,
  },
  logo: {
    width: wp("60%"),
    height: hp("30%"),
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 0,
    marginTop: -100,
  },
  subtitle: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#d6a62d",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10, // Add spacing between buttons
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    width: 180,
    textAlign: "center",
    marginLeft: 0,
  },
  buttonText2: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    width: 180,
    textAlign: "center",
    marginLeft: 0,
  },
  homeButtonContainer: {
    marginTop: 7,
    marginBottom: "15%",
  },
  signOutButton: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  signOutText: {
    color: "black", // Make it less visible
    fontSize: 20,
  },
});
