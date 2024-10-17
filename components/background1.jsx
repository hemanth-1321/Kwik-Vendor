import React from 'react';
import { StyleSheet, View } from 'react-native';

const Background1 = ({ children }) => {
  return (
    <View style={styles.background}>
      <View style={styles.overlay}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white', // Set background to white
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    // Optional: If you want a slight dark overlay, uncomment the following line
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Background1;
