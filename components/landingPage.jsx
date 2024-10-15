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
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons for the search icon
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Background from '../components/backgrond2';
import { BlurView } from 'expo-blur';

const LandingPage = () => {
  const navigation = useNavigation(); // Use the navigation hook

  return (
    <Background>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.cartButton}>
            <Image
              source={require('../assets/cart2.png')}
              style={styles.cartIcon}
            />
          </TouchableOpacity>

          <View style={styles.centeredContainer}>
            <BlurView style={styles.blurBackground} intensity={70} blurType="bold">
              <Image source={require('../assets/icon1.png')} style={styles.logo} />
            </BlurView>

            <View style={styles.searchSection}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#fff"
              />
              <TouchableOpacity style={styles.searchIcon}>
                <Ionicons name="search" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Image Buttons */}
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate('Grocery')}
              >
                <Image source={require('../assets/grocery.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Groceries</Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate('VegeFruits')}
              >
                <Image source={require('../assets/vege.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Veggies & Fruits</Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate('Restaurant')}
              >
                <Image source={require('../assets/restaurant.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Restaurant</Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate('Movies')}
              >
                <Image source={require('../assets/cinema.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Movie Tickets</Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate('Cafes')}
              >
                <Image source={require('../assets/cafe.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Cafes</Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate('Chaats')}
              >
                <Image source={require('../assets/chats.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Chats</Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate('Catering')}
              >
                <Image source={require('../assets/catering.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Catering</Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate('Events')}
              >
                <Image source={require('../assets/event.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Event Management</Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate('ComingSoon')}
              >
                <Image source={require('../assets/comingsoon.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Coming Soon</Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate('ComingSoon')}
              >
                <Image source={require('../assets/comingsoon.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}>Coming Soon</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

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
    paddingTop: 30,
    paddingBottom: 90,
  },
  logo: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
  },
  cartButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
  cartIcon: {
    width: 30,
    height: 30,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  buttonWrapper: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButton: {
    width: 140,
    height: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 8, // Android shadow (required for shadow on Android)
  },
  buttonImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 0,
    textAlign: 'center',
  },
  blurBackground: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 40,
    marginTop: 100,
  },
  searchSection: {
    width: 200,
    flexDirection: 'row',
    backgroundColor: '#933253',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
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

export default LandingPage;
