import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

type Cities = {
  id: string;
  name: string;
};

const cities: Cities[] = [
  { id: '1', name: 'Ciudad actual' },
  { id: '2', name: 'Chachapoyas' },
  { id: '3', name: 'Huaraz' },
  { id: '4', name: 'Abancay' },
  { id: '5', name: 'Arequipa' },
  { id: '6', name: 'Ayacucho' },
  { id: '7', name: 'Cajamarca' },
  { id: '8', name: 'Callao' },
  { id: '9', name: 'Cusco' },
  { id: '10', name: 'Huancavelica' },
  { id: '11', name: 'Huánuco' },
  { id: '12', name: 'Ica' },
  { id: '13', name: 'Huancayo' },
  { id: '14', name: 'Trujillo' },
  { id: '15', name: 'Chiclayo' },
  { id: '16', name: 'Lima' },
  { id: '17', name: 'Iquitos' },
  { id: '18', name: 'Puerto Maldonado' },
  { id: '19', name: 'Moquegua' },
  { id: '20', name: 'Cerro de Pasco' },
  { id: '21', name: 'Piura' },
  { id: '22', name: 'Puno' },
  { id: '23', name: 'Moyobamba' },
  { id: '24', name: 'Tacna' },
  { id: '25', name: 'Tumbes' },
  { id: '26', name: 'Pucallpa' },
];

const DestinationScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('1');

  const handleSearchPress = () => {
    console.log("Búsqueda iniciada con:", search);
  };

  const handleConfirmPress = () => {
    router.push('/tabs/explore/route');
    console.log("Ciudad confirmada:", selectedCity);
  };

  const renderCity = ({ item }: { item: Cities }) => (
    <TouchableOpacity style={styles.cityItem} onPress={() => setSelectedCity(item.id)}>
      {selectedCity === item.id && (
        <Ionicons name="location-sharp" size={20} color="#8FD14F" style={styles.icon} />
      )}
      <Text style={styles.cityText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>¿Cuál es tu próximo destino?</Text>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={handleSearchPress}>
            <Ionicons name="search" size={18} color="#707070" />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Escriba la ciudad"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <FlatList
          data={cities}
          renderItem={renderCity}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cityList}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPress}>
            <Ionicons name="checkmark-done-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>CONFIRMAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={handleConfirmPress}>
            <Ionicons name="play-forward" size={18} color="#fff" />
            <Text style={styles.buttonText}>OMITIR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e2e50',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  cityList: {
    paddingBottom: 100,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    marginRight: 10,
  },
  cityText: {
    fontSize: 18,
    color: '#2e2e50',
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8FD14F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8FD14F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white', 
  },
});

export default DestinationScreen;
