import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    { id: '1', name: 'Plaza Mayor', icon: 'business' },
    { id: '2', name: '200 casas', icon: 'business' },
    { id: '3', name: 'Qorikancha', icon: 'business' },
    { id: '4', name: 'Mercado de San Pedro', icon: 'business' },
    { id: '5', name: '200 casas', icon: 'business' },
  ];

  const comments: Comment[] = [
    { id: '1', userName: 'Niel', userSince: '3 años en la app', postedAgo: 'Hace 2 semanas', commentText: 'Bonito lugar, muy atentos en todo' },
    { id: '2', userName: 'Laura', userSince: '1 año en la app', postedAgo: 'Hace 1 mes', commentText: 'Una experiencia inolvidable, recomendado.' },
    { id: '3', userName: 'Carlos', userSince: '2 años en la app', postedAgo: 'Hace 3 semanas', commentText: 'Me gustó mucho el ambiente y la atención.' },
  ];

  const handlePress = (routeName: string) => {
    console.log(`Pressed: ${routeName}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <Ionicons name="map" size={24} color="#8FD14F" />
          <Text style={styles.navbarText}>Ruta de acceso</Text>
        </View>

        {/* Explore Places Image */}
        <TouchableOpacity style={styles.mapContainer} onPress={() => handlePress('Explora los lugares')}>
          <Image source={require('../../../../assets/images/mapaExplorar.jpg')} style={styles.mapImage} />
          <View style={styles.mapTitleContainer}>
            <Text style={styles.mapTitle}>Explora los lugares</Text>
          </View>
        </TouchableOpacity>

        {/* Creator and Like Section */}
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
          <Text style={styles.descriptionText}>Este es un breve resumen sobre el recorrido y las experiencias que puedes tener en esta ruta. Descubre lugares asombrosos y sumérgete en la cultura local.</Text>
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

        {/* Comments Section */}
        <Text style={styles.sectionTitle}>Comentarios</Text>
        <FlatList
          data={comments}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
    marginHorizontal: 20,
    marginBottom: 10, // Adjusted margin to separate from the request guide button section
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
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#d9d9d9',
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
