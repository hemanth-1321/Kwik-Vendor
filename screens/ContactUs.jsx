import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Background1 from "../components/background1";
const { width } = Dimensions.get("window");

export const ContactUs = () => {
  return (
    <Background1>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/kwik-bucketz/kwik%20spot.png",
            }}
            style={styles.logo}
          />
        </View>

        <View style={styles.contactContainer}>
          <Text style={styles.contactHeader}>Contact Us</Text>

          <Text style={styles.contactDetails}>Mobile: +91 98802 53091</Text>
          <Text style={styles.contactDetails}>Movile: +91 96206 83849</Text>
          <Text style={styles.contactDetails}>
            Email: alamo.queries@gmail.com
          </Text>
          <Text style={styles.contactDetailsADD}>
            Address: 844/1, Dr.B.R. Ambedkar Road Robertsonpet, KGF, Karnataka,
            India
          </Text>
        </View>
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
  contactContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderRadius: 20,
    marginTop: "50%",
  },
  contactHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  contactDetails: {
    fontSize: 18,
    marginBottom: 6,
    color: "#fff",
  },
  contactDetailsADD: {
    fontSize: 16,
    marginBottom: 6,
    color: "#fff",
    textAlign: "center",
  },
});
