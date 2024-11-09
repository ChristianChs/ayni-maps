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
    name: "Cusco Cultural Route",
    points: [
      { id: 1, latitude: -13.516667, longitude: -71.978056, title: "Plaza de Armas de Cusco" },
      { id: 2, latitude: -13.5225, longitude: -71.9761, title: "Qorikancha" },
      { id: 3, latitude: -13.5171, longitude: -71.9783, title: "Catedral del Cusco" }
    ]
  },
  {
    id: 3,
    name: "Lima Coastal Route",
    points: [
      { id: 1, latitude: -12.0464, longitude: -77.0428, title: "Plaza Mayor de Lima" },
      { id: 2, latitude: -12.0433, longitude: -77.0283, title: "Malecón de Miraflores" },
      { id: 3, latitude: -12.0458, longitude: -77.0303, title: "Parque Kennedy" }
    ]
  },
  {
    id: 4,
    name: "Tacna Adventure Route",
    points: [
      { id: 1, latitude: -18.0139, longitude: -70.2513, title: "Museo Ferroviario" },
      { id: 2, latitude: -18.0056, longitude: -70.2483, title: "Arco Parabólico" },
      { id: 3, latitude: -18.0078, longitude: -70.2445, title: "Plaza de Tacna" }
    ]
  },
  {
    id: 5,
    name: "Trujillo Colonial Route",
    points: [
      { id: 1, latitude: -8.1095, longitude: -79.0215, title: "Plaza de Armas de Trujillo" },
      { id: 2, latitude: -8.1184, longitude: -79.0324, title: "Huaca del Sol y la Luna" },
      { id: 3, latitude: -8.0805, longitude: -79.1057, title: "Chan Chan" }
    ]
  },
  {
    id: 6,
    name: "Puno Lake Route",
    points: [
      { id: 1, latitude: -15.8402, longitude: -70.0219, title: "Plaza de Armas de Puno" },
      { id: 2, latitude: -15.8282, longitude: -69.9886, title: "Lago Titicaca" },
      { id: 3, latitude: -15.8271, longitude: -69.9937, title: "Uros Floating Islands" }
    ]
  },
  {
    id: 7,
    name: "Iquitos Jungle Route",
    points: [
      { id: 1, latitude: -3.7491, longitude: -73.2538, title: "Plaza de Armas de Iquitos" },
      { id: 2, latitude: -3.7483, longitude: -73.2455, title: "Malecón Tarapacá" },
      { id: 3, latitude: -3.7438, longitude: -73.2516, title: "Belen Market" }
    ]
  },
  {
    id: 8,
    name: "Chiclayo Route",
    points: [
      { id: 1, latitude: -6.7714, longitude: -79.8409, title: "Plaza de Armas de Chiclayo" },
      { id: 2, latitude: -6.7677, longitude: -79.8264, title: "Museo Tumbas Reales de Sipán" },
      { id: 3, latitude: -6.7624, longitude: -79.8457, title: "Pimentel Beach" }
    ]
  },
  {
    id: 9,
    name: "Piura Desert Route",
    points: [
      { id: 1, latitude: -5.1945, longitude: -80.6328, title: "Plaza de Armas de Piura" },
      { id: 2, latitude: -4.8811, longitude: -81.2781, title: "Máncora Beach" },
      { id: 3, latitude: -5.1978, longitude: -80.6305, title: "Catacaos Market" }
    ]
  },
  {
    id: 10,
    name: "Huancayo Highland Route",
    points: [
      { id: 1, latitude: -12.0695, longitude: -75.2062, title: "Cerrito de la Libertad" },
      { id: 2, latitude: -12.0652, longitude: -75.2103, title: "Parque de la Identidad Wanka" },
      { id: 3, latitude: -12.0578, longitude: -75.2145, title: "Plaza Huamanmarca" }
    ]
  }
];

export default function Map() {
  const { id } = useLocalSearchParams();
  const [origin, setOrigin] = useState<{ latitude: number; longitude: number } | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ distance: number; duration: number } | null>(null);
  const [visitedPoints, setVisitedPoints] = useState<number[]>([]);
  const [showCongratsModal, setShowCongratsModal] = useState<boolean>(false);
  const [insigniaOtorgada, setInsigniaOtorgada] = useState<boolean>(false);

  const routeId = Number(id); // Asegúrate de que el id sea un número
  const selectedRoute = routesData.find((r) => r.id === routeId);

  useEffect(() => {
    console.log("ID de la ruta de llegada:", routeId); // Verifica si el id se está recibiendo correctamente

    if (!selectedRoute) {
      console.error("Ruta no encontrada");
      return;
    }

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
    setRouteInfo({
      distance: result.distance,
      duration: result.duration,
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
