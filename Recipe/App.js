
import React from 'react';
import { Constants } from 'expo';
import { StyleSheet, View } from 'react-native';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';
import { createStackNavigator } from 'react-navigation';
import {RecipeList,CreateRecipeForm,RecipeDetail} from './components'
//https://api.graph.cool/simple/v1/cjj6owoeu0lzt0183s299lbgf
const client = new ApolloClient({
  uri: 'https://api.graph.cool/simple/v1/cjj8hsz615xjr013464fodxdi'
});
const RootStack = createStackNavigator(
  {
    
    RecipeList: {
      screen: RecipeList
    },
    RecipeDetail: {
      screen: RecipeDetail
    },
    CreateRecipeForm: {
      screen: CreateRecipeForm
    },
    

  },
  {
    initialRouteName: 'RecipeList',
  });
class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <RootStack />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex:1
  },
});

export default App;