import React from "react";
import { View,TextInput,StyleSheet } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';


const SearchBox = ({placeHolder,value,onChangeText})=>{
    return(
        <View style = {styles.container}>
            <FontAwesome name="search" size={24} color="black" style={styles.icon} />
            <TextInput
            style={styles.input}
            placeHolder={placeHolder}
            value={value}
            onChangeText={onChangeText}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    container:{
        margin:10,
        flexDirection:"row",
        alignItems:'center',
        backgroundColor:'#f5f5f5',
        borderRadius:12,
        paddingHorizontal:12,
        height:45,
        shadowColor:'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.2,
        shadowRadius:4,
        elevation:3
    },
    icon:{marginRight:8},
    input:{
        flex:1,
        fontSize:18,
        color:'#333',
    },
});


export default SearchBox;
