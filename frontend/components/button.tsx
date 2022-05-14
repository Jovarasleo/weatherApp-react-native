import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import Search from 'react-native-vector-icons/Fontisto';

interface buttonProps {
  text?: string;
  onPress?: any;
}

export default function SearchButton({text, onPress}: buttonProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonWrapper}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          <Search name="search" size={22} />
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  buttonWrapper: {},
  button: {
    marginLeft: -50,
    width: 50,
    height: 50,
    backgroundColor: '#8aa2b5',
    textAlign: 'center',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
