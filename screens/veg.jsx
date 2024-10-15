import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../components/background1';
import { useNavigation } from '@react-navigation/native';

const Veg = () => {
  const navigation = useNavigation();
  const images = [
    {
      source: require('../assets/idly.png'),
      label: 'Idly',
      price: '₹ 30',
    },
    {
      source: require('../assets/dosa.png'),
      label: 'Dosa',
      price: '₹ 45',
    },
    {
      source: require('../assets/chapathi.png'),
      label: 'Chapathi',
      price: '₹ 30',
    },
    {
      source: require('../assets/pongal.png'),
      label: 'Pongal',
      price: '₹ 40',
    },
    {
      source: require('../assets/meduvada.png'),
      label: 'Medu Vada',
      price: '₹ 25',
    },
  ];

  const handleAddItem = (itemNumber) => {
    console.log(`Add button pressed for Item ${itemNumber}`);
    // You can also access the price for the specific item here if needed
  };

  return (
    <Background>
      <View style={styles.mainContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('Restaurant')}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </Pressable>

        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            {images.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Image source={item.source} style={styles.image} />
                <View style={styles.labelContainer}>
                  <Text style={styles.labelText}>{item.label}</Text>
                </View>
                <View style={styles.priceAndButtonContainer}>
                  <Text style={styles.priceLabel}>{item.price}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddItem(index + 1)}>
                    <Text style={styles.addButtonText}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
    marginTop: 200,
  },
  itemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  labelContainer: {
    flex: 1,
    marginLeft: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  priceAndButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceLabel: {
    width: 80,
    height: 40,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    textAlign: 'center',
    lineHeight: 40,
  },
  addButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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

export default Veg;
