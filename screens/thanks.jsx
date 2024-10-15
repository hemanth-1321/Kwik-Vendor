import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from '../components/backgrond2';
import Icon from 'react-native-vector-icons/Ionicons';

const Thanks = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Handle the login logic here
    console.log('User pressed login');

    // Navigate to the HomeScreen after login
    navigation.navigate('Home');
  };

  return (
    <Background>
        
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          {/* Icon at the top of the box container */}
          <Image source={require('../assets/securityicon.png')}  />

          {/* Label with text */}
          <Text style={styles.labelText}>
           {'Thank you \n Please check your Registered Email \n for the link to Proceed.'}
          </Text>

          {/* Normal button with Login text */}
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LandingPage')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
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
  boxContainer: {
    width: 300,
    height: '40%',
    alignItems: 'center',
    borderRadius: 15,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    marginBottom: 180,
  },
  labelText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Thanks;
