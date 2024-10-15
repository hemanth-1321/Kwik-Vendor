import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Linking, // Import Linking for clickable links
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from '../components/background1';
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gstin, setGstin] = useState('');
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (!isChecked) {
      alert('Please agree to the terms and conditions');
      return;
    }

    // Handle the sign-up logic here
    console.log('User Info:', {
      name,
      email,
      password,
      confirmPassword,
      gstin,
    });

    // Navigate to the HomeScreen after sign-up
    navigation.navigate('Thanks');
  };

  const handleTermsPress = () => {
    // Replace with your actual terms and conditions link
    Linking.openURL('https://www.example.com/terms');
  };

  return (
    <Background>
    <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('LandingPage')}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </Pressable>
        
      <View style={styles.container}>

        <View style={styles.boxContainer}>
          <ImageBackground
            style={styles.glassBackground}
            imageStyle={{ borderRadius: 15 }}
            blurRadius={20}
          >
            <View style={styles.formContainer}>
              <Text style={styles.title}>Create New Account</Text>

              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="GSTIN"
                value={gstin}
                onChangeText={setGstin}
              />

              {/* Checkbox Section */}
              <View style={styles.checkboxContainer}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => setIsChecked(!isChecked)}
                >
                  {isChecked && (
                    <Ionicons name="checkmark" size={24} color="#0088FF" />
                  )}
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>
                  I agree to the{' '}
                  <Text style={styles.link} onPress={handleTermsPress}>
                    terms and conditions
                  </Text>
                </Text>
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <ImageBackground
                  source={require('../assets/rectangle-21.png')}
                  style={styles.buttonImage}
                  imageStyle={styles.imageStyle}>
                  <View style={styles.textOverlay}>
                    <Text style={styles.buttonText}>Register & Continue</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    paddingTop: 10,
  },
  boxContainer: {
    width: '90%',
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    marginBottom: 30,
  },
  glassBackground: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 15,
    padding: 1,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    height: 50,
    width: 280,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  checkbox: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderColor: '#0088FF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#fff',
  },
  link: {
    color: '#0088FF',
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonImage: {
    width: 300,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  imageStyle: {
    borderRadius: 5,
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default Register;
