import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footerContainer}>
      <Text>Segunda PreEntrega</Text>
      <Text>Alumno: Manuel Lus</Text>
      <Text>Comisión: 55490</Text>
      <Text>CoderHouse</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#F6F6F6',
    padding: 10,
    alignItems: 'center',
  },
});

export default Footer;
