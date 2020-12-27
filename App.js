import React from 'react';
import { StyleSheet, Text, View, Dimensions, Button, ActivityIndicator } from 'react-native';
import Navigation from './navigation';
import Home from './screens/Home';
export default class App extends React.Component {

  state = {
    user: {}
  }

  async componentDidMount() {
    try {
    } catch (error) {
      console.log("error loading app.js", home);
    }
  }

  render() {
    return (
      <Navigation />
      // <View style={styles.container}>
      //   <Home />
      // </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  }
});

