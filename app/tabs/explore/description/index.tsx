import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline } from 'react-native-maps';

type RecommendedRoute = {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type Comment = {
  id: string;
  userName: string;
  userSince: string;
  postedAgo: string;
  commentText: string;
};

const RouteDescriptionScreen = () => {
  const recommendedRoutes: RecommendedRoute[] = [
    { id: '1', name: 'Plaza de Armas de Arequipa', icon: 'business' },
    { id: '2', name: 'Monasterio de Santa Catalina', icon: 'business' },
    { id: '3', name: 'Catedral de Arequipa', icon: 'business' },
    { id: '4', name: 'Mirador de Yanahuara', icon: 'business' },
    { id: '5', name: 'Museo Santuarios Andinos', icon: 'business' },
  ];

  const comments: Comment[] = [
    { id: '1', userName: 'Niel', userSince: '3 años en la app', postedAgo: 'Hace 2 semanas', commentText: 'Un lugar histórico y lleno de cultura.' },
    { id: '2', userName: 'Laura', userSince: '1 año en la app', postedAgo: 'Hace 1 mes', commentText: 'Una experiencia inolvidable, especialmente el mirador.' },
    { id: '3', userName: 'Carlos', userSince: '2 años en la app', postedAgo: 'Hace 3 semanas', commentText: 'El Monasterio de Santa Catalina es impresionante.' },
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={comments}  
        ListHeaderComponent={() => (
          <>
            {/* Navbar */}
            <View style={styles.navbar}>
              <Ionicons name="map" size={24} color="#8FD14F" />
              <Text style={styles.navbarText}>Ruta de Arequipa</Text>
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
                  strokeColor="#8FD14F"
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

            {/* Request Guide Button Section */}
            <View style={styles.requestGuideContainer}>
              <TouchableOpacity style={styles.requestGuideButton} onPress={() => console.log('Solicitar guía turístico')}>
                <Text style={styles.requestGuideText}>Solicitar guía turístico</Text>
              </TouchableOpacity>
            </View>

            {/* Description Section */}
            <View style={styles.descriptionContainer}>
              <Text style={styles.sectionTitle}>Descripción</Text>
              <Text style={styles.descriptionText}>
                Descubre los lugares más emblemáticos de Arequipa en esta ruta llena de historia y cultura. Visita la Plaza de Armas,
                el Monasterio de Santa Catalina y otros puntos de interés que te sumergirán en la esencia de la ciudad.
              </Text>
            </View>

            {/* Recommended Routes */}
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

            
            <Text style={styles.sectionTitle}>Comentarios</Text>
          </>
        )}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <View style={styles.commentContent}>
              <Text style={styles.userName}>{item.userName}</Text>
              <Text style={styles.userSince}>{item.userSince}</Text>
              <Text style={styles.postedAgo}>{item.postedAgo}</Text>
              <Text style={styles.commentText}>{item.commentText}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 10,
    elevation: 1,
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
  requestGuideContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  requestGuideButton: {
    backgroundColor: '#8FD14F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  requestGuideText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginHorizontal: 20,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    marginHorizontal: 20,
    color: '#555',
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
  commentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userSince: {
    fontSize: 12,
    color: '#777',
  },
  postedAgo: {
    fontSize: 12,
    color: '#777',
    marginVertical: 2,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default RouteDescriptionScreen;
