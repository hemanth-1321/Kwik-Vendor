import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../components/background1';
import { useNavigation } from '@react-navigation/native';

const VegCater = () => {
 const navigation = useNavigation();
  const items = [
    { label: 'Wahid Catering Services' },
    { label: 'kusum Catering Services' },
    { label: 'Karthick Catering Services' },
    { label: 'Jenna Catering Services' },
    { label: 'Wasim Catering Services' },
  ];

  const handleButtonPress = (itemLabel) => {
    console.log(`${itemLabel} button pressed`);
  };

  return (
    <Background>
      <View style={styles.mainContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('Catering')}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </Pressable>

        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.itemButton}
                onPress={() => handleButtonPress(item.label)}>
                <Text style={styles.buttonText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
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
  mainContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    marginTop: 300,
    paddingBottom: 10,
  },
  itemButton: {
    width: 350,
    backgroundColor: 'white',
    paddingVertical: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  registerContainer: {
    position: 'absolute',
    bottom: 0,
    width: 400,
    backgroundColor: '#5BFF8C',
    padding: 15,
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

export default VegCater;
