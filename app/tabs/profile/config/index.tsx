import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { router } from 'expo-router'

const ProfileEditScreen: React.FC = () => {
  const handleEditPersonalInfo = () => {
    router.push('/tabs/profile/modify');
    Alert.alert('Información personal', 'Editar información personal.');
  };

  const handlePublishedRoutes = () => {
    Alert.alert('Rutas publicadas', 'Ver y editar rutas publicadas.');
  };

  const handleNotifications = () => {
    Alert.alert('Notificaciones', 'Gestionar notificaciones.');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileImageContainer}>
        <Image source={{ uri: 'https://via.placeholder.com/120' }} style={styles.profileImage} />
        <View style={styles.editIconContainer}>
          <Icon name="edit" size={20} color="gray" />
        </View>
      </TouchableOpacity>
      <Text style={styles.name}>Beder Montenegro</Text>

      <TouchableOpacity style={styles.optionContainer} onPress={handleEditPersonalInfo}>
        <Icon name="person" size={28} color="green" />
        <Text style={styles.optionText}>Información personal</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer} onPress={handlePublishedRoutes}>
        <Icon name="map" size={28} color="green" />
        <Text style={styles.optionText}>Rutas publicadas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionContainer} onPress={handleNotifications}>
        <Icon name="notifications" size={28} color="green" />
        <Text style={styles.optionText}>Notificaciones</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#d9d9d9',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a55',
    marginTop: 10,
    marginBottom: 30,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 5,
  },
  optionText: {
    fontSize: 18,
    color: '#1a1a55',
    marginLeft: 15,
    fontWeight: 'bold',
  },
});

export default ProfileEditScreen;