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

const Event = () => {
 const navigation = useNavigation();
  const images = [
    {
      source: require('../assets/weevent.png'),
      label: 'We Event Planners',
    },
    {
      source: require('../assets/blissevent.png'),
      label: 'Bliss Event Management',
    },
    {
      source: require('../assets/ossumevent.png'),
      label: 'Ossum Event & Entertainment',
    },
    {
      source: require('../assets/7delightsevent.png'),
      label: '7 Delights Event Planner',
    },
  ];

  const handleAddItem = (itemNumber) => {
    console.log(`Add button pressed for Item ${itemNumber}`);
  };

  return (
    <Background>
      <View style={styles.mainContainer}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('LandingPage')}>
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
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddItem(index + 1)}>
                  <Text style={styles.addButtonText}>Book</Text>
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
    paddingBottom: 40,
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
    paddingTop: 150,
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

export default Event;
