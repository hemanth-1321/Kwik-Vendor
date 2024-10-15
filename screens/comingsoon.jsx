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

const ComingSoon = () => {
  const navigation = useNavigation();


  return (
    <Background>
    <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('LandingPage')}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </Pressable>
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          {/* Icon at the top of the box container */}
          <Image source={require('../assets/comingsoonpng.png')} style={styles.csImage} />
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    paddingTop: 10,
  },
  csImage: {
    width: '100%',
    alignItems: 'center',
    resizeMode: 'contain',
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
});

export default ComingSoon;
