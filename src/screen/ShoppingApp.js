import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import ItemCard from '../component/ItemCard';
import TotalSummary from '../component/TotalSummary';

const categories = ["ของสด", "ของใช้ในบ้าน", "เครื่องดื่ม", "ของหวาน"];

const ShoppingApp = () => {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemImage, setItemImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [filterCategory, setFilterCategory] = useState('ทั้งหมด');
    const [darkMode, setDarkMode] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        loadItems();
    }, []);

    useEffect(() => {
        saveItems();
    }, [items]);

    const loadItems = async () => {
        try {
            const storedItems = await AsyncStorage.getItem('shoppingItems');
            if (storedItems) setItems(JSON.parse(storedItems));
        } catch (error) {
            console.error('Failed to load items', error);
        }
    };

    const saveItems = async () => {
        try {
            await AsyncStorage.setItem('shoppingItems', JSON.stringify(items));
        } catch (error) {
            console.error('Failed to save items', error);
        }
    };

    const addItem = () => {
        if (!itemName.trim()) {
            Alert.alert('ข้อผิดพลาด', 'กรุณากรอกชื่อสินค้า');
            return;
        }
        if (!itemPrice.trim() || isNaN(itemPrice) || parseFloat(itemPrice) <= 0) {
            Alert.alert('ข้อผิดพลาด', 'ราคาต้องเป็นตัวเลขบวก');
            return;
        }
        if (editingItem) {
            setItems(items.map(item => item.id === editingItem.id ? { ...item, name: itemName, price: parseFloat(itemPrice), image: itemImage, category: selectedCategory } : item));
            setEditingItem(null);
        } else {
            const newItem = { id: Date.now().toString(), name: itemName, price: parseFloat(itemPrice), purchased: false, image: itemImage, category: selectedCategory };
            setItems([...items, newItem]);
        }
        setItemName('');
        setItemPrice('');
        setItemImage(null);
    };

    const editItem = (item) => {
        setItemName(item.name);
        setItemPrice(item.price.toString());
        setItemImage(item.image);
        setSelectedCategory(item.category);
        setEditingItem(item);
    };

    const togglePurchased = (id) => {
        setItems(items.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
    };

    const removeItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const clearAll = () => {
        setItems([]);
    };

    const totalRemaining = items.reduce((sum, item) => (!item.purchased ? sum + item.price : sum), 0);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterCategory === 'ทั้งหมด' || item.category === filterCategory)
    );

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <View style={[styles.container, darkMode && styles.darkContainer]}>
            <Text style={styles.title}>เพื่อนรักนักช้อป</Text>
            <TouchableOpacity style={styles.toggleButton} onPress={toggleDarkMode}>
                <MaterialIcons name={darkMode ? 'dark-mode' : 'light-mode'} size={24} color={darkMode ? 'white' : 'black'} />
            </TouchableOpacity>
            <TextInput placeholder="ค้นหา" value={searchQuery} onChangeText={setSearchQuery} style={styles.input} />
            <View style = {[styles.input,{padding: 0}]}>
                <Text style = {{ fontSize : 15, paddingLeft: 5 }}>ค้นหา</Text>
                <Picker selectedValue={filterCategory} onValueChange={(value) => setFilterCategory(value)}>
                    <Picker.Item label="ทั้งหมด" value="ทั้งหมด" />
                    {categories.map(category => <Picker.Item key={category} label={category} value={category} />)}
                </Picker>
            </View>
            <TextInput placeholder="ชื่อสินค้า" value={itemName} onChangeText={setItemName} style={styles.input} />
            <TextInput placeholder="ราคาสินค้า" value={itemPrice} onChangeText={setItemPrice} keyboardType="numeric" style={styles.input} />
            <View style = {[styles.input,{padding: 0}]}>
                <Text style = {{ fontSize : 15, paddingLeft: 5}}>เพิ่มในหมวดหมู่</Text>
                <Picker selectedValue={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
                    {categories.map(category => <Picker.Item key={category} label={category} value={category} />)}
                </Picker>
            </View>
            <Button title={editingItem ? "แก้ไขสินค้า" : "เพิ่มสินค้า"} onPress={addItem} color={"green"}/>
            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ItemCard item={item} onTogglePurchased={togglePurchased} onRemove={removeItem} onEdit={editItem} />
                )}
            />
            <TotalSummary total={totalRemaining} />
            <Button title="ลบทั้งหมด" onPress={clearAll} color="red" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20 
    },
    darkContainer: { 
        backgroundColor: 'grey', 
        color: '#fff' 
    },
    title: { fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 10 
    },
    input: { borderWidth: 1, 
        padding: 8, 
        marginBottom: 10, 
        backgroundColor: 'white' 
    },
    toggleButton: { 
        alignSelf: 'flex-end', 
        padding: 10 
    }
});

export default ShoppingApp;
