import React from 'react';
import { StyleSheet,View, Text,TouchableOpacity,Share} from 'react-native';


export default class RecipeDetail extends React.Component {
  static navigationOptions = {
    title: 'RECIPE DETAIL',
  };
  
  recipe = this.props.navigation.getParam('recipe','default')
  ShareMessage=()=>
    {
      Share.share(
            {
                
              message: this.recipe.title
            
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
    }
  render() {
    return (
      
      <View style={styles.container}>
        
          <View>
            <Text style={styles.title}>
              {this.recipe.title}
            </Text>
            <Text>
              Description:{this.recipe.description}
            </Text>
            <Text>
              Ingredients:{this.recipe.ingredients}
            </Text>
            <Text>
              Instructions:{this.recipe.instructions}
            </Text>
            </View>
            <TouchableOpacity
                  style={styles.saveButton}
                  onPress={ this.ShareMessage }>
              <Text>
                    SHARE
                  </Text>
                </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex:1
  },
  title:{
    fontSize:20,
    margin:10,
    textAlign:'center',
    fontWeight: 'bold'
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
