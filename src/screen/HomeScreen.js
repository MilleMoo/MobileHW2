import axios from "axios";
import React, {useEffect, useState} from "react";
import { View,Text,StyleSheet,TextInput,Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import SearchBox from "../component/SearchBox";
import RecipeCard from "../component/RecipeCard";
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () =>{
        const navigation = useNavigation();
        const[search,setSearch] = useState('');
        const[recipes,setRecipes]=useState([]);


        useEffect(()=>{
            fetchRecipe();
        },[])


        const fetchRecipe = async ()=>{
            try {
                const response = await axios.get(
                'https://www.themealdb.com/api/json/v1/1/search.php?s=');
                setRecipes(response.data.meals);
            }catch(error) {
                console.error("Error fetching",error);
            }
        };


    return (
        <View>
            <SearchBox
                placeholder="Search Recipe by Name"
                value={search}
                onChangeText={(value)=> setSearch(value)}
            />
            <FlatList
                data={recipes.filter((recipes)=>
                    recipes.strMeal.toLowerCase().includes(search.toLowerCase())
                )}
                keyExtractor={(item) => item.idMeal}
                renderItem={({item})=> (
                    // <View style={{marginHorizontal:10,flexDirection:'row'}}>
                    //     <Image style ={{width:100,height:100}}
                    //     source={{uri:item.strMealThumb}}
                    //     />
                    //     <Text style={{fontSize:20,marginHorizontal:10}}>{item.strMeal}</Text>
                    // </View>
                    <RecipeCard recipe ={item} onPress={() => navigation.navigate('RecipeDetail', { mealId: item.idMeal })}/>
                )}
            />
        </View>
    );
};


const styles = StyleSheet.create();


export default HomeScreen;
