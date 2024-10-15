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
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../components/background1';
import { useNavigation } from '@react-navigation/native';

const Vegetables = () => {
 const navigation = useNavigation();
  const images = [
    {
      source: require('../assets/tomato.png'),
      label: 'Tomato',
      pickerItems: ['1 kg', '5 kg', '10 kg'],
      price: '₹ 50.71',
    },
    {
      source: require('../assets/brinjal.png'),
      label: 'Brinjal',
      pickerItems: ['500 g', '1 kg', '2 kg'],
      price: '₹ 40.00',
    },
    {
      source: require('../assets/potato.png'),
      label: 'Potato',
      pickerItems: ['1 kg', '2 kg', '5 kg'],
      price: '₹ 60.00',
    },
    {
      source: require('../assets/carrot.png'),
      label: 'Carrot',
      pickerItems: ['500 g', '1 kg', '2 kg'],
      price: '₹ 40.00',
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
          onPress={() => navigation.navigate('VegeFruits')}>
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
                <View style={styles.pickerContainer}>
                  <Text style={styles.pickerLabel}>{item.label}</Text>
                  <View style={styles.pickerWrapper}>
                    <Picker
                      selectedValue={item.pickerItems[0]} // default selection
                      style={styles.picker}
                    >
                      {item.pickerItems.map((pickerItem, pickerIndex) => (
                        <Picker.Item
                          key={pickerIndex}
                          label={pickerItem}
                          value={pickerItem}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <Text style={styles.priceLabel}>
                  {item.price}
                </Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddItem(index + 1)}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
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
  pickerContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  pickerLabel: {
    color: 'black',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  pickerWrapper: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    overflow: 'hidden', // ensures the picker fits within the rounded borders
  },
  picker: {
    color: 'black',
  },
  priceLabel: {
    width: 80,
    height: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    textAlign: 'center',
    marginRight: 10,
    lineHeight: 40, // Center text vertically
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

export default Vegetables;
