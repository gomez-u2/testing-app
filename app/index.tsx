import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const professionals = [
  { id: "1", name: "Dr. Ana Souza", category: "Cardiologista", image: "https://via.placeholder.com/100" },
  { id: "2", name: "Dr. João Lima", category: "Dermatologista", image: "https://via.placeholder.com/100" },
  { id: "3", name: "Dra. Maria Silva", category: "Ortopedista", image: "https://via.placeholder.com/100" },
  { id: "4", name: "Dr. Carlos Mendes", category: "Pediatra", image: "https://via.placeholder.com/100" }
];

const categories = ["Todos", "Cardiologista", "Dermatologista", "Ortopedista", "Pediatra"];

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProfessionals = professionals.filter(
    (pro) =>
      (selectedCategory === "Todos" || pro.category === selectedCategory) &&
      pro.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtrar Profissionais</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar pelo nome..."
        value={search}
        onChangeText={setSearch}
      />
   <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.categoryButton, selectedCategory === item && styles.selectedCategory]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text style={[styles.categoryText, selectedCategory === item && styles.selectedCategoryText]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer} style={styles.professionalsList}>
        
        {filteredProfessionals.map((item) => (
          <View key={item.id} style={styles.professionalCard}>
            <Image source={{ uri: item.image }} style={styles.professionalImage} />
            <Text style={styles.professionalName}>{item.name}</Text>
            <Text>{item.category}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Início" component={HomeScreen} options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home-outline" size={size} color={color} />
      ),
    }} />
    <Tab.Screen name="Perfil" component={HomeScreen} options={{
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="person-outline" size={size} color={color} />
      ),
    }} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryButton: {
    padding: 10,
    marginRight: 8,
    backgroundColor: "lightgray",
    borderRadius: 5,
    width: 120, // Largura fixa
    height: 40, // Altura fixa
  },
  
  selectedCategory: {
    backgroundColor: "blue",
  },
  categoryText: {
    color: "black",
  },
  selectedCategoryText: {
    color: "white",
  },
  professionalsList: {
    marginTop: 10,
    
  },
  professionalCard: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
  },
  professionalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  professionalName: {
    fontWeight: "bold",
  },
  contentContainer: {
    paddingTop: 10, 
    paddingBottom: 10, 

  },
  
});

export default AppNavigator;
