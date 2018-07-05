import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ActivityIndicator, FlatList, Text,StyleSheet,TouchableOpacity,RefreshControl } from 'react-native';
import ReversedFlatList from 'react-native-reversed-flat-list'
const GET_ALL_RECIPES = gql`
{
  allRecipes {
    id
    title
    description
    instructions
  }
}
`;

class RecipeList extends React.Component{
  state = {
    refreshing: false,
  }
  static navigationOptions = {
    title: 'RECIPE',
  };

 
  handleOnPressed = item => {
    this.props.navigation.navigate('RecipeDetail',{recipe: item})
  }
  keyExtractor = (item) => item.id;
  renderItem = ({item}) => (
    <TouchableOpacity style={styles.container} onPress={() => this.handleOnPressed(item)}>
      <Text style={styles.title}>
        {item.title}
      </Text>
      <Text>
        Description:{item.description}
      </Text>
    </TouchableOpacity>
  )
  

  render() {
    return (
      <Query query={GET_ALL_RECIPES}>
        {({loading, data, error,refetch}) => (
          loading
            ? <ActivityIndicator />
            : 
            (
              <React.Fragment>
                <ReversedFlatList
                  inverted={true}
                  keyExtractor={this.keyExtractor}
                  data={data ? data.allRecipes : []}
                  renderItem={this.renderItem}
                  onRefresh={refetch}
                  refreshing={data.networkStatus === 4}
                />
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={()=>{this.props.navigation.navigate('CreateRecipeForm')}}>
                  <Text>
                    Create New Recipe
                  </Text>
                </TouchableOpacity>
              
              </React.Fragment>
            )
        )}
      </Query>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    marginTop:10,
    width:'95%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:3,
    marginHorizontal:5,
  },
  title:{
    fontSize:20,
    margin:10,
    textAlign:'center',
    fontWeight: 'bold'
  },
  

  descriptionInput: {
    paddingHorizontal: 20,
    height: 100,
    fontSize: 20,
  },

  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(39,174,96,1)',
    height: 50,
    width:'90%',
    borderRadius: 2,
    margin:20
  },
  saveButtonText: {
    color: 'white',
  },

})
export default RecipeList;