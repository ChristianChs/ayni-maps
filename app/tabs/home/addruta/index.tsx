import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Photo {
  id: string;
  src: string;
}

const AddNewRouteScreen = () => {
  const [stops, setStops] = useState([
    { id: '1', name: 'Altar de heroes', address: 'C. Arica 203' },
    { id: '2', name: 'Mirador "El Condor"', address: 'Av. Grau 153' },
    { id: '3', name: 'Casa de Luis', address: 'C. Cuzco 136' },
  ]);

  const [photos, setPhotos] = useState<Photo[]>([]);

  const handleAddPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newPhoto = { id: Date.now().toString(), src: result.assets[0].uri };
      setPhotos([...photos, newPhoto]);
    }
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const renderPhoto = ({ item }: { item: Photo }) => (
    <View style={styles.photoContainer}>
      <Image source={{ uri: item.src }} style={styles.photo} />
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeletePhoto(item.id)}>
        <Ionicons name="close-circle" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
    data={stops}
    ListHeaderComponent={
      <>
        {/* Navbar */}
        <View style={styles.navbar}>
          <Ionicons name="locate-outline" size={24} color="#8FD14F" />
          <Text style={styles.navbarText}>AGREGAR NUEVA RUTA</Text>
        </View>

        <Text style={styles.sectionTitle}>Paradas</Text>
        <Image source={{ uri: 'https://example.com/map-image.jpg' }} style={styles.mapImage} />

        <TextInput style={styles.searchInput} placeholder="Escribir lugar" />
        <TouchableOpacity style={styles.selectButton}>
          <Text style={styles.selectButtonText}>Seleccionar en el mapa</Text>
        </TouchableOpacity>

        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>#</Text>
          <Text style={styles.tableHeaderText}>Parada</Text>
          <Text style={styles.tableHeaderText}>Dirección</Text>
        </View>
      </>
    }
    renderItem={({ item }) => (
      <View style={styles.stopRow}>
        <Text style={styles.stopText}>{item.id}</Text>
        <Text style={styles.stopText}>{item.name}</Text>
        <Text style={styles.stopText}>{item.address}</Text>
      </View>
    )}
    keyExtractor={(item) => item.id}
    ListFooterComponent={
      <>
        <Text style={styles.sectionTitle}>Agregar fotografías</Text>
        <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
          <Ionicons name="add" size={30} color="green" />
        </TouchableOpacity>
        <FlatList
          data={photos}
          renderItem={renderPhoto}
          keyExtractor={(item) => item.id}
          horizontal
          style={styles.photosList}
        />

        <Text style={styles.sectionTitle}>Describe tu recorrido, cuéntales que se encontrarán!</Text>
        <TextInput style={styles.textArea} placeholder="Escribe aquí la descripción" multiline />

        <Text style={styles.sectionTitle}>Algunos consejos que quieras compartir?</Text>
        <TextInput style={styles.textArea} placeholder="Escribe aquí tus consejos" multiline />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </>
    }
  />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    width: '100%',
  },
  navbarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8FD14F',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  selectButton: {
    backgroundColor: '#8FD14F',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 16,
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
    marginBottom: 5,
    paddingHorizontal: 16,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e2e50',
    flex: 1,
    textAlign: 'center',
  },
  stopsList: {
    marginBottom: 20,
  },
  stopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 16,
  },
  stopText: {
    fontSize: 14,
    color: '#2e2e50',
    flex: 1,
    textAlign: 'center',
  },
  addPhotoButton: {
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 30,
    padding: 8,
  },
  photosList: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  photoContainer: {
    position: 'relative',
    marginRight: 10,
    alignItems: 'center',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  textArea: {
    height: 80,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
    marginHorizontal: 16,
  },
  saveButton: {
    backgroundColor: '#8FD14F',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
    marginHorizontal: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white', 
  },
});

export default AddNewRouteScreen;
