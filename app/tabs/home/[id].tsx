import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_APIKEY } from '@env';
import Modal from 'react-native-modal';
import InsigniaImage from '@/assets/images/avatar.png';
import { useLocalSearchParams } from 'expo-router';

type PointType = {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
};

type RouteType = {
  id: number;
  name: string;
  points: PointType[];
};

const routesData: RouteType[] = [
  {
    id: 1,
    name: "Arequipa Historic Route",
    points: [
      { id: 1, latitude: -16.3988031, longitude: -71.5369606, title: "Plaza de Armas" },
      { id: 2, latitude: -16.3991056, longitude: -71.5399013, title: "Monasterio de Santa Catalina" },
      { id: 3, latitude: -16.3987028, longitude: -71.5372193, title: "Catedral de Arequipa" },
      { id: 4, latitude: -16.3982476, longitude: -71.5312342, title: "Museo Santuarios Andinos" },
      { id: 5, latitude: -16.3999352, longitude: -71.5360913, title: "Mirador de Yanahuara" }
    ]
  },
  {
    id: 2,
    name: "Arequipa Gastronomic Route",
    points: [
      { id: 1, latitude: -16.4018, longitude: -71.5359, title: "Mercado San Camilo" },
      { id: 2, latitude: -16.4008, longitude: -71.5353, title: "Calle Jerusalén" },
      { id: 3, latitude: -16.4029, longitude: -71.5334, title: "La Nueva Palomino" }
    ]
  },
  {
    id: 3,
    name: "Arequipa Nature Route",
    points: [
      { id: 1, latitude: -16.3497, longitude: -71.5407, title: "Reserva Nacional de Salinas" },
      { id: 2, latitude: -16.3265, longitude: -71.5461, title: "Laguna de Salinas" },
      { id: 3, latitude: -16.3633, longitude: -71.5333, title: "Volcán Misti" }
    ]
  },
  {
    id: 4,
    name: "Arequipa Adventure Route",
    points: [
      { id: 1, latitude: -15.6414, longitude: -71.9816, title: "Cañón del Colca" },
      { id: 2, latitude: -15.6426, longitude: -71.6092, title: "Chivay" },
      { id: 3, latitude: -15.6419, longitude: -71.9808, title: "Cruz del Cóndor" }
    ]
  },
  {
    id: 5,
    name: "Arequipa Handicraft Route",
    points: [
      { id: 1, latitude: -16.3983, longitude: -71.5367, title: "Callejón de las Peñas" },
      { id: 2, latitude: -16.4029, longitude: -71.5359, title: "Mercado San Camilo" },
      { id: 3, latitude: -16.4044, longitude: -71.5369, title: "Feria de Yanahuara" }
    ]
  },
  {
    id: 6,
    name: "Arequipa Thermal Waters Route",
    points: [
      { id: 1, latitude: -16.3532, longitude: -71.5749, title: "Baños Termales de Yura" },
      { id: 2, latitude: -15.6426, longitude: -71.6092, title: "Chivay" },
      { id: 3, latitude: -15.6231, longitude: -71.5934, title: "Aguas Calientes en Colca" }
    ]
  },
  {
    id: 7,
    name: "Arequipa Astronomical Observation Route",
    points: [
      { id: 1, latitude: -16.4386, longitude: -71.5402, title: "Molino de Sabandía" },
      { id: 2, latitude: -16.3474, longitude: -71.5703, title: "Mirador de Chachani" },
      { id: 3, latitude: -16.3633, longitude: -71.5333, title: "Mirador del Misti" }
    ]
  },
  {
    id: 8,
    name: "Arequipa Colonial Architecture Route",
    points: [
      { id: 1, latitude: -16.3988, longitude: -71.5369, title: "Catedral de Arequipa" },
      { id: 2, latitude: -16.3992, longitude: -71.5364, title: "Iglesia de la Compañía" },
      { id: 3, latitude: -16.3994, longitude: -71.5356, title: "Palacio Goyeneche" }
    ]
  },
  {
    id: 9,
    name: "Arequipa Local Festivities Route",
    points: [
      { id: 1, latitude: -16.3988, longitude: -71.5369, title: "Plaza de Armas" },
      { id: 2, latitude: -16.4322, longitude: -71.5443, title: "Cerro Juli" },
      { id: 3, latitude: -16.3980, longitude: -71.5353, title: "Campo Redondo" }
    ]
  },
  {
    id: 10,
    name: "Arequipa Art and Culture Route",
    points: [
      { id: 1, latitude: -16.4018, longitude: -71.5359, title: "Barrio de San Lázaro" },
      { id: 2, latitude: -16.3997, longitude: -71.5362, title: "Museo de Arte Virreinal Santa Teresa" },
      { id: 3, latitude: -16.3996, longitude: -71.5353, title: "Centro Cultural Peruano Norteamericano" }
    ]
  }
];


export default function Map() {
  const { id } = useLocalSearchParams();
  console.log("Route ID from params:", id); // Verifica si `id` está siendo recibido

  const routeId = Number(id); 
  const selectedRoute = routesData.find((r) => r.id === routeId);

  if (!selectedRoute) {
    console.error("Ruta no encontrada con el ID:", routeId);
  }

  const [origin, setOrigin] = useState<{ latitude: number; longitude: number } | null>(null);
  const [routeInfo, setRouteInfo] = useState<{
    distance: number;
    duration: number;
    walkingDuration: number;
    drivingDuration: number;
  } | null>(null);
  const [visitedPoints, setVisitedPoints] = useState<number[]>([]);
  const [showCongratsModal, setShowCongratsModal] = useState<boolean>(false);
  const [insigniaOtorgada, setInsigniaOtorgada] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedRoute) return;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const initialLocation = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: initialLocation.coords.latitude,
        longitude: initialLocation.coords.longitude,
      });

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 2 },
        (location) => {
          const newOrigin = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          };

          if (!origin || getDistance(origin, newOrigin) > 50) {
            setOrigin(newOrigin);
            checkProximityToPoints(newOrigin);
          }
        }
      );
    })();
  }, [origin, routeId]);

  const checkProximityToPoints = (location: { latitude: number; longitude: number }) => {
    selectedRoute?.points.forEach((point) => {
      const distance = getDistance(location, {
        latitude: point.latitude,
        longitude: point.longitude,
      });

      if (distance < 50 && !visitedPoints.includes(point.id)) {
        setVisitedPoints([...visitedPoints, point.id]);
      }
    });

    if (visitedPoints.length === selectedRoute?.points.length && !insigniaOtorgada) {
      setShowCongratsModal(true);
      setInsigniaOtorgada(true);
    }
  };

  const getDistance = (
    loc1: { latitude: number; longitude: number },
    loc2: { latitude: number; longitude: number }
  ) => {
    const R = 6371e3;
    const φ1 = (loc1.latitude * Math.PI) / 180;
    const φ2 = (loc2.latitude * Math.PI) / 180;
    const Δφ = ((loc2.latitude - loc1.latitude) * Math.PI) / 180;
    const Δλ = ((loc2.longitude - loc1.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const handleDirectionsReady = (result: { distance: number; duration: number }) => {
    const walkingSpeed = 5; // km/h
    const drivingSpeed = 40; // km/h

    const walkingDuration = (result.distance / walkingSpeed) * 60;
    const drivingDuration = (result.distance / drivingSpeed) * 60;

    setRouteInfo({
      distance: result.distance,
      duration: result.duration,
      walkingDuration,
      drivingDuration,
    });
  };

  if (!origin) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={origin} title="Ubicación Actual" pinColor="blue" />

        <Circle
          center={origin}
          radius={20}
          strokeColor="rgba(0, 122, 255, 0.5)"
          fillColor="rgba(0, 122, 255, 0.2)"
        />

        {selectedRoute?.points.map((point, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: point.latitude, longitude: point.longitude }}
            title={point.title}
          />
        ))}

        {selectedRoute && selectedRoute.points.length > 0 && (
          <MapViewDirections
            origin={origin}
            destination={selectedRoute.points[selectedRoute.points.length - 1]}
            waypoints={selectedRoute.points.slice(0, -1).map((point) => ({
              latitude: point.latitude,
              longitude: point.longitude,
            }))}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="blue"
            optimizeWaypoints={true}
            onReady={handleDirectionsReady}
            onError={(errorMessage) => {
              console.error('MapViewDirections error:', errorMessage);
            }}
          />
        )}
      </MapView>

      <View style={styles.infoContainer}>
        {routeInfo && (
          <>
            <Text style={styles.infoText}>
              Distancia: {routeInfo.distance.toFixed(2)} km
            </Text>
            <Text style={styles.infoText}>
              Tiempo aproximado a pie: {routeInfo.walkingDuration.toFixed(0)} minutos
            </Text>
            <Text style={styles.infoText}>
              Tiempo aproximado en carro: {routeInfo.drivingDuration.toFixed(0)} minutos
            </Text>
          </>
        )}
      </View>

      <Modal isVisible={showCongratsModal} onBackdropPress={() => setShowCongratsModal(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.congratsText}>¡Felicidades!</Text>
          <Image source={InsigniaImage} style={styles.badgeImage} />
          <Text style={styles.modalMessage}>
            Has ganado la insignia por completar todos los puntos de interés de esta ruta.
          </Text>
          <Button title="Cerrar" onPress={() => setShowCongratsModal(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 100,
    left: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 10,
  },
  badgeImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
