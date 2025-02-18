import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ItemCard = ({ item, onTogglePurchased, onRemove, onEdit }) => (
    <TouchableOpacity onPress={() => onTogglePurchased(item.id)} style={[styles.item, item.purchased && styles.purchased]}>
        {item.image && <Image source={{ uri: item.image }} style={styles.itemImage} />}
        <View style={styles.itemDetails}>
            <Text style={styles.itemText}>{item.name} - {item.price} บาท</Text>
            <Text style={styles.categoryText}>หมวดหมู่: {item.category}</Text>
        </View>
        <MaterialIcons 
            name={item.purchased ? 'check-circle' : 'cancel'} 
            size={24} 
            color={item.purchased ? 'green' : 'red'} 
            style={styles.statusIcon} 
        />
        <TouchableOpacity onPress={() => onEdit(item)}>
            <MaterialIcons name="edit" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onRemove(item.id)}>
            <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    item: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: 10, 
        borderBottomWidth: 1 
    },
    purchased: { 
        backgroundColor: '#ddd' 
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
    },
    itemText: { 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
    categoryText: { 
        fontSize: 14, 
        color: 'black' 
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
    }
});

export default ItemCard;
