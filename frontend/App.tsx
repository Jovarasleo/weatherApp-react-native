/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Button,
  InputAccessoryView,
} from 'react-native';
import SearchButton from './components/button';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  children?: any;
}> = ({children}) => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const [input, setInput] = useState('');
  const [data, setData] = useState({city: '', temp: ''});
  const [text, onChangeText] = React.useState('');
  const getData = useCallback(async () => {
    console.log('try fetch', input);
    try {
      let fetchResponse = await fetch(`http://192.168.50.64:4000/${input}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let responseJSON = await fetchResponse.json();
      setData({temp: responseJSON.temp, city: responseJSON.city});
      console.log(responseJSON);
    } catch (error) {
      console.log(error);
    }
  }, [input, setData]);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Section>Weather App</Section>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={styles.searchContainer}>
            <TextInput
              onChangeText={newtext => setInput(newtext)}
              style={styles.input}
            />
            <SearchButton onPress={getData} />
          </View>
          <Section>{data.city}</Section>
          {data.city ? <Section>{data.temp} °C</Section> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    position: 'relative',
  },
  input: {
    paddingLeft: 20,
    borderWidth: 2,
    borderColor: '#8aa2b5',
    position: 'relative',
    width: '90%',
    borderRadius: 25,
    height: 50,
    fontSize: 16,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
