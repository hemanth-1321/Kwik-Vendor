import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Linking,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import Icon from "react-native-vector-icons/Ionicons";
import { z } from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../axiosInstance";
import * as Location from "expo-location";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// Simplified register schema
const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
  storeName: z.string().min(1, "Store name is required").max(50, "Store name is too long"),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits long"),
});

export const Register = () => {
  const [name, setName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to continue");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  const handleSignUp = async () => {
    if (!isChecked) {
      Alert.alert("Error", "Please agree to the terms and conditions");
      return;
    }

    if (!location) {
      Alert.alert("Error", "Location not available");
      return;
    }

    setIsLoading(true);

    try {
      // Validate input fields using zod schema
      registerSchema.parse({
        name,
        storeName,
        phoneNumber,
      });

      setErrors({});
      setErrorMessage("");

      // Send registration request with location data
      const response = await axiosInstance.post("/vendors/register", {
        name,
        storeName,
        phoneNumber,
        latitude: location.latitude,
        longitude: location.longitude,
      });

      // If registration is successful, store the token and navigate to Category page
      if (response.status === 201) {
        console.log("Registration Successful:", response.data);

        const token = response.data.token;
        await AsyncStorage.setItem("authToken", token);

        navigation.navigate("CategoryPage", { token });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const zodErrors = {};
        error.errors.forEach((err) => {
          zodErrors[err.path[0]] = err.message;
        });
        setErrors(zodErrors);
      } else if (error.response?.data?.message) {
        Alert.alert("Error", error.response.data.message);
      } else {
        setErrorMessage(
          error.message || "Something went wrong. Please try again later."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTermsPress = () => {
    Linking.openURL("https://www.example.com/terms");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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

        <View style={styles.container}>
          <View style={styles.boxContainer}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Create New Account</Text>

              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Store Name"
                value={storeName}
                onChangeText={setStoreName}
              />
              {errors.storeName && (
                <Text style={styles.errorText}>{errors.storeName}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}

              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setIsChecked(!isChecked)}
                >
                  {isChecked && (
                    <Icon name="checkmark" size={24} color="#8bce1c" />
                  )}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>
                  I agree to the{" "}
                  <Text style={styles.link} onPress={handleTermsPress}>
                    terms and conditions
                  </Text>
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handleSignUp}
                disabled={isLoading}
              >
                <View style={styles.textOverlay}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Register & Continue</Text>
                  )}
                </View>
              </TouchableOpacity>

              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center", // Center content vertically
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  logo: {
    width: wp("60%"),
    height: hp("30%"),
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  boxContainer: {
    width: wp("90%"),
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    elevation: 10,
    marginBottom: 10,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "#d6a62d",
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#d6a62d",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
  },
  link: {
    color: "#8bce1c",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  button: {
    width: "100%",
    backgroundColor: "#d6a62d",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#d3d3d3",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  textOverlay: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
});

export default Register;
