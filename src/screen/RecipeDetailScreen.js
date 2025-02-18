import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import axios from "axios";

const RecipeDetailScreen = ({ route }) => {
    const { mealId } = route.params;
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchRecipeDetail();
    }, []);

    const fetchRecipeDetail = async () => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
            if (response.data.meals) {
                setRecipe(response.data.meals[0]);
            } else {
                setRecipe(null);
            }
        } catch (error) {
            console.error("Error fetching recipe details:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    if (!recipe) {
        return <Text style={styles.errorText}>Recipe not found</Text>;
    }

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({ name: ingredient, measure: measure });
        }
    }

    return (
        <FlatList
            data={ingredients}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            ListHeaderComponent={(
                <View style={styles.header}>
                    <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
                    <Text style={styles.title}>{recipe.strMeal}</Text>
                    <Text style={styles.category}>Category: {recipe.strCategory}</Text>
                    <Text style={styles.area}>Origin: {recipe.strArea}</Text>
                    <Text style={styles.sectionTitle}>Ingredients</Text>
                </View>
            )}
            renderItem={({ item }) => (
                <View style={styles.ingredientItem}>
                    <Image 
                        source={{ uri: `https://www.themealdb.com/images/ingredients/${item.name}-Small.png` }}
                        style={styles.ingredientImage}
                    />
                    <Text style={styles.ingredientText}>{item.name}</Text>
                    <Text style={styles.measureText}>{item.measure}</Text>
                </View>
            )}
            ListFooterComponent={(
                <View style={styles.footer}>
                    <Text style={styles.sectionTitle}>Instructions</Text>
                    <Text style={styles.instructions}>{recipe.strInstructions}</Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 16,
        backgroundColor: "#fff",
    },
    footer: {
        padding: 16,
    },
    image: {
        width: "100%",
        height: 250,
        borderRadius: 10,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    category: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
        color: "#555",
    },
    area: {
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
        color: "#777",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#ccc",
        paddingBottom: 5,
    },
    ingredientItem: {
        alignItems: "center",
        margin: 10,
        width: "30%",
    },
    ingredientImage: {
        width: 60,
        height: 60,
        marginBottom: 5,
    },
    ingredientText: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    measureText: {
        fontSize: 12,
        color: "#666",
        textAlign: "center",
    },
    instructions: {
        fontSize: 14,
        lineHeight: 22,
        textAlign: "justify",
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        textAlign: "center",
        fontSize: 18,
        color: "red",
        marginTop: 20,
    },
});

export default RecipeDetailScreen;
