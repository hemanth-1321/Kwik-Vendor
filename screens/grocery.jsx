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


const Grocery = () => {
  const navigation = useNavigation();
  const images = [
    {
      source: require('../assets/rice.png'),
      label: 'Rice',
      pickerItems: ['1 kg', '5 kg', '10 kg'],
      price: '₹ 989.89',
    },
    {
      source: require('../assets/sugar.png'),
      label: 'Sugar',
      pickerItems: ['500 g', '1 kg', '2 kg'],
      price: '₹ 40.00',
    },
    {
      source: require('../assets/goldwinner.png'),
      label: 'Gold Winner',
      pickerItems: ['1 L', '2 L', '5 L'],
      price: '₹ 115.00',
    },
    {
      source: require('../assets/dal2.png'),
      label: 'Dhal',
      pickerItems: ['500 g', '1 kg', '2 kg'],
      price: '₹ 60.00',
    },
    {
      source: require('../assets/cornflakes.png'),
      label: 'Corn Flakes',
      pickerItems: ['250 g', '500 g', '1 kg'],
      price: '₹ 200.00',
    },
    {
      source: require('../assets/dettol.png'),
      label: 'Dettol',
      pickerItems: ['100 ml', '250 ml', '500 ml'],
      price: '₹ 45.00',
    },
    {
      source: require('../assets/aashirvad.png'),
      label: 'Aashirvad',
      pickerItems: ['1 kg', '5 kg', '10 kg'],
      price: '₹ 70.00',
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
          onPress={() => navigation.goBack()}>
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
                  <Picker style={styles.picker}>
                    {item.pickerItems.map((pickerItem, pickerIndex) => (
                      <Picker.Item
                        key={pickerIndex}
                        label={pickerItem}
                        value={pickerItem}
                      />
                    ))}
                  </Picker>
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
  picker: {
    color: 'black',
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
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

export default Grocery;
