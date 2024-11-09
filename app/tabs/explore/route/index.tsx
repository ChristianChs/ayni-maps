import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';

type RecommendedRoute = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type UserRoute = {
  id: string;
  name: string;
  distance: string;
  image: any;
};

const RouteExploreScreen = () => {
  const recommendedRoutes: RecommendedRoute[] = [
    { id: '1', name: 'Plaza de Armas de Arequipa', icon: 'business' },
    { id: '2', name: 'Monasterio de Santa Catalina', icon: 'business' },
    { id: '3', name: 'Catedral de Arequipa', icon: 'business' },
    { id: '4', name: 'Museo Santuarios Andinos', icon: 'business' },
    { id: '5', name: 'Mirador de Yanahuara', icon: 'business' },
  ];

  const userRoutes: UserRoute[] = [
    { id: '1', name: 'Reserva Nacional de Salinas', distance: 'A 50km', image: require('../../../../assets/images/rutasExplorar.png') },
    { id: '2', name: 'Centro Histórico de Arequipa', distance: 'A 2km', image: require('../../../../assets/images/rutasExplorar.png') },
    { id: '3', name: 'Rutas Gastronómicas', distance: 'A 3km', image: require('../../../../assets/images/rutasExplorar.png') },
  ];

  const routePoints = [
    { id: '1', latitude: -16.3988031, longitude: -71.5369606, title: "Plaza de Armas de Arequipa" },
    { id: '2', latitude: -16.3991056, longitude: -71.5399013, title: "Monasterio de Santa Catalina" },
    { id: '3', latitude: -16.3987028, longitude: -71.5372193, title: "Catedral de Arequipa" },
    { id: '4', latitude: -16.3982476, longitude: -71.5312342, title: "Museo Santuarios Andinos" },
    { id: '5', latitude: -16.3999352, longitude: -71.5360913, title: "Mirador de Yanahuara" },
  ];

  const handlePress = (routeName: string) => {
    console.log(`Pressed: ${routeName}`);
  };

  const handleConfirmPress = () => {
    router.push('/tabs/explore/description');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.navbar}>
          <Ionicons name="map" size={24} color="#8FD14F" />
          <Text style={styles.navbarText}>Explora Arequipa</Text>
        </View>

        {/* Mapa con ruta y marcadores */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: -16.3988031,
              longitude: -71.5369606,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {routePoints.map((point) => (
              <Marker
                key={point.id}
                coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                title={point.title}
              />
            ))}
            <Polyline
              coordinates={routePoints.map((point) => ({
                latitude: point.latitude,
                longitude: point.longitude,
              }))}
              strokeColor="#8FD14F" // Color de la línea
              strokeWidth={3}
            />
          </MapView>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.creatorContainer}>
            <Ionicons name="person" size={16} color="#2e2e50" />
            <Text style={styles.creatorText}>Cesar Huayta Callisaya</Text>
          </View>
          <View style={styles.likeContainer}>
            <Text style={styles.likeText}>¿Te gustó?</Text>
            <TouchableOpacity style={styles.likeButton} onPress={() => console.log('Liked!')}>
              <Ionicons name="thumbs-up" size={20} color="#8FD14F" />
              <Text style={styles.likeCount}>313</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Rutas Recomendadas</Text>
        <FlatList
          horizontal
          data={recommendedRoutes}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.routeItem} onPress={() => handlePress(item.name)}>
              <Ionicons name={item.icon} size={16} color="#2e2e50" />
              <Text style={styles.routeText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>Explorar rutas por usuarios</Text>
        <FlatList
          horizontal
          data={userRoutes}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.userRouteItem} onPress={handleConfirmPress}>
              <Image source={item.image} style={styles.userRouteImage} />
              <Text style={styles.distanceText}>{item.distance}</Text>
              <Text style={styles.userRouteText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  navbarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  mapContainer: {
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
    height: 200,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  creatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  likeContainer: {
    alignItems: 'center',
  },
  likeText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  likeCount: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#E6F4EA',
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  routeText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  userRouteItem: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginHorizontal: 8,
    marginBottom: 20,
  },
  userRouteImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  distanceText: {
    fontSize: 12,
    color: '#8FD14F',
    marginVertical: 5,
  },
  userRouteText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    maxWidth: 100, // Asegúrate de que el ancho sea adecuado para contener dos líneas de texto
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: 'white', 
  },
});

export default RouteExploreScreen;
