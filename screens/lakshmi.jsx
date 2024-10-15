import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../components/background1';
import { BlurView } from 'expo-blur';

const Lakshmi = () => {
 const navigation = useNavigation(); 

  return (
    <Background>
      <View style={styles.container}>
      
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.navigate('Movies')}
          >
            <Icon name="arrow-back" size={24} color="#fff" />
          </Pressable>

        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >

          {/* Image Buttons */}
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate()}
              >
                <BlurView intensity={50} style={styles.blurView} />
                <Image source={require('../assets/show.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}></Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate()}
              >
                <BlurView intensity={50} style={styles.blurView} />
                <Image source={require('../assets/show.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}></Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate()}
              >
                <BlurView intensity={50} style={styles.blurView} />
                <Image source={require('../assets/show.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}></Text>
              </Pressable>
            </View>

            <View style={styles.buttonWrapper}>
              <Pressable
                style={styles.imageButton}
                onPress={() => navigation.navigate()}
              >
                <BlurView intensity={50} style={styles.blurView} />
                <Image source={require('../assets/show.png')} style={styles.buttonImage} />
                <Text style={styles.buttonText}></Text>
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
    paddingTop: 350,
    paddingBottom: 90,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10, // Adjust as needed
    left: 10, // Adjust as needed
    zIndex: 10,
    paddingTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 25,
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
    marginTop: 10,
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

export default Lakshmi;
