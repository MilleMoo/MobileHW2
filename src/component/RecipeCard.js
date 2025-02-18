import React from "react";
import { View,Text,Image,TouchableOpacity,StyleSheet} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const RecipeCard = ({recipe, onPress}) =>{
    return(
        <TouchableOpacity style = {styles.card} 
            onPress={onPress}>
            <Image style = {styles.image} source={{uri: recipe.strMealThumb}}/>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{recipe.strMeal}</Text>
                <View style = {styles.footer}>
                    <Text style={styles.category}>{recipe.Area || "Category"}</Text>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="black" />
                </View>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    card:{
        flexDirection:"row",
        backgroundColor:"#fff",
        borderRadius:12,
        marginHorizontal:10,
        marginVertical:6,
        padding:10,
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.2,
        shadowRadius:4,
        elevation:3
    },
    image:{
        width:80,
        height:80,
        borderRadius:10
    },
    textContainer:{
        flex:1,
        paddingLeft:12,
        justifyContent:'center'
    },
    title:{fontSize:18,
        fontWeight:'bold',
        color:'#333'
    },
    category:{
        fontSize:14,
        color:'#777',
        marginTop:4
    },
    footer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },

})
export default RecipeCard;
