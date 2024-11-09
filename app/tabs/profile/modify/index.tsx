import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

const PersonalInfoScreen: React.FC = () => {
  const [username, setUsername] = useState('beder_mon');
  const [city, setCity] = useState('Tacna');
  const [password, setPassword] = useState('********');
  const [confirmPassword, setConfirmPassword] = useState('********');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSaveChanges = () => {
    router.push('/tabs/profile/home');
    Alert.alert('Guardar cambios', 'Los cambios han sido guardados.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>INFORMACIÓN PERSONAL</Text>

        <Text style={styles.label}>Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Nombre de usuario"
        />

        <Text style={styles.label}>Ciudad de residencia</Text>
        <TextInput
          style={styles.input}
          value={city}
          onChangeText={setCity}
          placeholder="Ciudad de residencia"
        />

        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon name={showPassword ? 'eye-off' : 'eye'} type="ionicon" size={24} color="green" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirmar contraseña</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmar contraseña"
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} type="ionicon" size={24} color="green" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Guardar cambios</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a55',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a55',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingRight: 10,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#8FD14F',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white', // puedes configurar un fondo si es necesario
  },
});

export default PersonalInfoScreen;