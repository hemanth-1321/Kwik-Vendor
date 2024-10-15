import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Background from '../components/background1';

const Pricing = () => {
  const navigation = useNavigation();

  const handleAddItem = (itemNumber) => {
    console.log(`Add button pressed for Item ${itemNumber}`);
  };

  const itemImages = [
    'https://dummyimage.com/50x50/12163F/ffffff.png&text=Item+1',
    'https://dummyimage.com/50x50/12163F/ffffff.png&text=Item+2',
    'https://dummyimage.com/50x50/12163F/ffffff.png&text=Item+3',
    'https://dummyimage.com/50x50/12163F/ffffff.png&text=Item+4',
    'https://dummyimage.com/50x50/12163F/ffffff.png&text=Item+5',
    'https://dummyimage.com/50x50/12163F/ffffff.png&text=Item+6',
  ];

  return (
    <Background>
      <View style={styles.mainContainer}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </Pressable>

        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.container}>
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Image
                  source={{ uri: itemImages[index] }}
                  style={styles.itemImage}
                />
                <View style={styles.pickerContainer}>
                  <Text style={styles.pickerLabel}>Item {item}</Text>
                  <Picker style={styles.picker}>
                    <Picker.Item label={`Item ${item}`} value={`item${item}`} />
                    <Picker.Item label="Value" value="value" />
                  </Picker>
                </View>
                <TextInput
                  style={styles.priceInput}
                  placeholder="₹ 0.00"
                  keyboardType="numeric"
                />
                <TouchableOpacity style={styles.addButton} onPress={() => handleAddItem(item)}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.signupContainer}>
          <View style={styles.signupBox}>
            <Text style={styles.signupText}>
              {'Register Now! \nBecome our Vendor Partner'}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('otherspage')}>
              <Image
                source={require('../assets/signup.png')}
                style={styles.signupButtonImage}
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
  itemImage: {
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
  priceInput: {
    width: 80,
    height: 40,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    textAlign: 'center',
    marginRight: 10,
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
  signupContainer: {
    backgroundColor: '#0088FF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  signupBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButtonImage: {
    width: 150,
    height: 50,
  },
});

export default Pricing;
