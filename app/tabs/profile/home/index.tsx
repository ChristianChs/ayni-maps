import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'rutas' | 'favoritos'>('rutas');

  const user = {
    name: 'Beder Montenegro',
    username: '@beder_mon',
    location: 'Tacna',
    followers: 100,
    routesCompleted: 6,
    routesPublished: 2,
  };

  const routes = [
    { id: '1', name: 'Ruta de Tacna', description: 'Pocollay - G.A. - Paseo Cívico', image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Ruta de Tacna', description: 'Pocollay - G.A. - Paseo Cívico', image: 'https://via.placeholder.com/150' },
  ];

  const favorites = [
    { id: '1', name: 'Ruta Favorita 1', description: 'Favorita - A', image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Ruta Favorita 2', description: 'Favorita - B', image: 'https://via.placeholder.com/150' },
  ];

  const renderRoute = ({ item }: { item: { id: string; name: string; description: string; image: string } }) => (
    <View style={styles.routeContainer}>
      <Image source={{ uri: item.image }} style={styles.routeImage} />
      <Text style={styles.routeName}>{item.name}</Text>
      <Text style={styles.routeDescription}>{item.description}</Text>
    </View>
  );

  const handleConfirmPress = () => {
    router.push('/tabs/profile/config');
  };

  const handleRoutes = () => {
    router.push('/tabs/explore/description');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.configButton} onPress={handleConfirmPress}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.profileInfo}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.username}>{user.username}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{user.routesCompleted}</Text>
              <Text style={styles.statLabel}>Rutas realizadas</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{user.routesPublished}</Text>
              <Text style={styles.statLabel}>Rutas publicadas</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{user.followers}</Text>
              <Text style={styles.statLabel}>Seguidores</Text>
            </View>
          </View>
          <Text style={styles.location}>
            <Icon name="place" size={16} color="green" /> {user.location}
          </Text>
          <Text style={styles.instagramHandle}>
            <Icon name="instagram" type="font-awesome" size={16} /> {user.username}
          </Text>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => setSelectedTab('rutas')} style={[styles.tab, selectedTab === 'rutas' && styles.activeTab]}>
            <Icon name="map" size={24} color={selectedTab === 'rutas' ? 'green' : 'black'} />
            <Text style={[styles.tabLabel, selectedTab === 'rutas' && styles.activeTabLabel]}>RUTAS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSelectedTab('favoritos')} style={[styles.tab, selectedTab === 'favoritos' && styles.activeTab]}>
            <Icon name="favorite" size={24} color={selectedTab === 'favoritos' ? 'green' : 'black'} />
            <Text style={[styles.tabLabel, selectedTab === 'favoritos' && styles.activeTabLabel]}>FAVORITOS</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleRoutes}>
          <FlatList
            data={selectedTab === 'rutas' ? routes : favorites}
            renderItem={renderRoute}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.routesList}
          />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  configButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: '#d9d9d9',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    color: '#666',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 15,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a55',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  location: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
  instagramHandle: {
    fontSize: 14,
    color: '#1a1a55',
    marginTop: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginVertical: 10,
  },
  tab: {
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1a1a55',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a55',
    marginTop: 5,
  },
  activeTabLabel: {
    color: '#1a1a55',
  },
  routesList: {
    paddingTop: 10,
  },
  routeContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  routeImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
    marginBottom: 5,
  },
  routeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  routeDescription: {
    fontSize: 12,
    color: '#666',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white', // puedes configurar un fondo si es necesario
  },
});

export default ProfileScreen;
