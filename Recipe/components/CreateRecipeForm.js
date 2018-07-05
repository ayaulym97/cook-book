import {ActivityIndicator, ScrollView, Text, TextInput, View,TouchableOpacity,StyleSheet} from 'react-native';
import {Mutation} from 'react-apollo';
import gql from "graphql-tag";
import React from 'react';

const CREATE_RECIPE = gql`
  mutation addRecipe($title: String!,$description: String!,$ingredients: [String!]!,$instructions: [String!]!) {
    createRecipe(title: $title,description:$description,ingredients:$ingredients,instructions:$instructions) {
      id
      title
      description
      ingredients
      instructions
    }
  }`

class CreateRecipeForm extends React.Component{
  state = {
    titleInputValue: '',
    descriptionInputValue:'',
    ingredients:[],
    instructions:[]
  }
  static navigationOptions = {
    title: 'NEW RECIPE',
  };
  

  handleChangeTitleInputValue = (titleInputValue) => {
    this.setState({titleInputValue})
  }
  handleChangeDescriptionInputValue = (descriptionInputValue) => {
    this.setState({descriptionInputValue})
  }
  handleIngredientsInputValue = (ingredients) => {
    this.setState({ingredients})
  }
  handleInstructionsInputValue = (instructions) => {
    this.setState({instructions})
  }
  
  render() {
    return (
 
      <Mutation mutation={CREATE_RECIPE}>
        {(createRecipe, {data, loading, error}) => (
          <ScrollView alwaysBounceVertical={false}>
              <TextInput
                style={styles.descriptionInput}
                placeholder='Title'
                value={this.state.titleInputValue}
                onChangeText={this.handleChangeTitleInputValue}
              />
              <TextInput
                style={styles.descriptionInput}
                placeholder='Description'
                value={this.state.descriptionInputValue}
                onChangeText={this.handleChangeDescriptionInputValue}
              />
              <TextInput
                style={styles.descriptionInput}
                placeholder='Ingredients'
                value={this.state.ingredients}
                onChangeText={this.handleIngredientsInputValue}
              />
              <TextInput
                style={styles.descriptionInput}
                placeholder='Instructions'
                value={this.state.instructions}
                onChangeText={this.handleInstructionsInputValue}
              />
              <TouchableOpacity
              style={styles.saveButton}
              disabled={loading}
              onPress={() => {
                createRecipe({
                  variables: {
                    title: this.state.titleInputValue,
                    description: this.state.descriptionInputValue,
                    ingredients:this.state.ingredients,
                    instructions:this.state.instructions,
                  }
                })
            
                this.props.navigation.navigate('RecipeList')
                } }>
                {loading ? <ActivityIndicator/>
                :
                <Text>Sumbit</Text>
                }
                
                
              
              </TouchableOpacity>
              <View>
                
              </View>
              
          </ScrollView>
        )}
      </Mutation>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)'
  },
  header:{
    fontSize:20,
    textAlign:'center',
    fontWeight: 'bold'
  },

  descriptionInput: {
    paddingHorizontal: 20,
    marginTop:30,
    height: 50,
    width:'90%',
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal:20,
  },

  saveButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(39,174,96,1)',
    height: 50,
    width:'90%',
    borderRadius: 2,
    marginHorizontal:20,
    margin:10,
  },
  saveButtonText: {
    color: 'white',
  },

})

export default CreateRecipeForm;