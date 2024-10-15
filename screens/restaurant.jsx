import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; 
import Background from '../components/background1';

const Restaurant = () => {
const navigation = useNavigation(); // Use the navigation hook

  return (
    <Background>
      <View style={styles.container}>
       <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('LandingPage')}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </Pressable>

          {/* Image Buttons */}
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate('Veg')}
              >
                <Image source={require('../assets/vegcater.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Veg</Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate('NonVeg')}
              >
                <Image source={require('../assets/noncater.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>NON-VEG</Text>
              </Pressable>
            </View>
          </View>

        {/* Fixed Sign-up Container at the Bottom */}
        <View style={styles.registerContainer}>
          <View style={styles.registerBox}>
            <Text style={styles.registerText}>
              {'Start Your Kwik Store!\n List Your Product'}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Image
                source={require('../assets/registernow.png')}
                style={styles.registerButtonImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 300,
    paddingBottom: 30,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  buttonWrapper: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 0,
  },
  imageButton: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 125,
  },
  buttonImage: {
    width: '80%',
    height: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 0,
    textAlign: 'center',
  },
  registerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#5BFF8C',
    padding: 15,
    borderRadius: 0,
  },
  registerBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButtonImage: {
    width: 150,
    height: 60,
  },
});

export default Restaurant;
