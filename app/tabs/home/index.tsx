import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, router } from 'expo-router';

type Ruta = {
  id: string;
  nombre: string;
  ubicacion: string;
  favorita: boolean;
};

const rutas: Ruta[] = [
  { id: '1', nombre: 'Ruta de Tacna', ubicacion: 'Pocollay - G.A. - Paseo Cívico', favorita: false },
  { id: '2', nombre: 'Ruta de Tacna', ubicacion: 'Pocollay - G.A. - Paseo Cívico', favorita: true },
  { id: '3', nombre: 'Ruta de Tacna', ubicacion: 'Pocollay - G.A. - Paseo Cívico', favorita: false },
  { id: '4', nombre: 'Ruta de Tacna', ubicacion: 'Pocollay - G.A. - Paseo Cívico', favorita: true },
  { id: '5', nombre: 'Ruta de Tacna', ubicacion: 'Pocollay - G.A. - Paseo Cívico', favorita: false },
  { id: '6', nombre: 'Ruta de Tacna', ubicacion: 'Pocollay - G.A. - Paseo Cívico', favorita: true },
];

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Todos');

  const handleNavPress = (tab: string) => {
    setActiveTab(tab);
  };

  const renderRuta = ({ item }: { item: Ruta }) => (
<Link href={`/tabs/home/${item.id}`} asChild>
  <TouchableOpacity style={styles.rutaContainer}>
    <View style={styles.imageContainer}>
      <Image source={require('../../../assets/images/mapa.png')} style={styles.mapThumbnail} />
      {item.favorita && (
        <FontAwesome name="heart" size={20} color="#8FD14F" style={styles.favoriteIcon} />
      )}
    </View>
    <Text style={styles.rutaNombre}>{item.nombre}</Text>
    <Text style={styles.rutaUbicacion}>{item.ubicacion}</Text>
  </TouchableOpacity>
</Link>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          onPress={() => handleNavPress('Todos')}
          style={[styles.navItem, activeTab === 'Todos' && styles.activeNavItem]}
        >
          <Text style={[styles.navText, activeTab === 'Todos' && styles.activeNavText]}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleNavPress('Mis rutas')}
          style={[styles.navItem, activeTab === 'Mis rutas' && styles.activeNavItem]}
        >
          <Text style={[styles.navText, activeTab === 'Mis rutas' && styles.activeNavText]}>Mis rutas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={rutas}
        renderItem={renderRuta}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity style={styles.newRouteButton}>
        <Text style={styles.newRouteButtonText}>+ Nueva ruta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#ffffff',
  },
  navItem: {
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  navText: {
    fontSize: 18,
    color: '#707070',
  },
  activeNavText: {
    fontWeight: 'bold',
    color: '#8FD14F',
  },
  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#8FD14F',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingBottom: 60,
  },
  rutaContainer: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapThumbnail: {
    width: '100%',
    height: '100%',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,
  },
  rutaNombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e2e50',
    textAlign: 'center',
    marginTop: 8,
  },
  rutaUbicacion: {
    fontSize: 14,
    color: '#707070',
    textAlign: 'center',
  },
  newRouteButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#8FD14F',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  newRouteButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
