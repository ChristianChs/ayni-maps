import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

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
    { id: '1', name: 'Plaza Mayor', icon: 'business' },
    { id: '2', name: '200 casas', icon: 'business' },
    { id: '3', name: 'Qorikancha', icon: 'business' },
    { id: '4', name: 'Mercado de San Pedro', icon: 'business' },
    { id: '5', name: '200 casas', icon: 'business' },
  ];

  const userRoutes: UserRoute[] = [
    { id: '1', name: 'Machu Picchu', distance: 'A 50km', image: require('../../../../assets/images/rutasExplorar.png') },
    { id: '2', name: 'Centro de Cusco', distance: 'A 2km', image: require('../../../../assets/images/rutasExplorar.png') },
    { id: '3', name: 'Fiestas Cusco', distance: 'A 3km', image: require('../../../../assets/images/rutasExplorar.png') },
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
        <Text style={styles.navbarText}>Ruta de acceso</Text>
      </View>

      <TouchableOpacity style={styles.mapContainer} onPress={handleConfirmPress}>
        <Image source={require('../../../../assets/images/mapaExplorar.jpg')} style={styles.mapImage} />
        <View style={styles.mapTitleContainer}>
          <Text style={styles.mapTitle}>Explora los lugares</Text>
        </View>
      </TouchableOpacity>

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
    position: 'relative',
    margin: 20,
    borderRadius: 15,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: 200,
  },
  mapTitleContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white', 
  },
});

export default RouteExploreScreen;