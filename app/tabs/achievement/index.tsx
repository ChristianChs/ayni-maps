import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, Image, ImageSourcePropType, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Achievement {
  id: string;
  title: string;
  image?: ImageSourcePropType;
  icon?: string;
  description?: string;
  progress?: number;
}

const highlightedAchievements: Achievement[] = [
  { id: '1', title: 'Turista de Élite', description: 'Completa todas las rutas de Tacna', image: require('../../../assets/images/1.png') },
  { id: '2', title: 'Explorador del mes', image: require('../../../assets/images/2.png') },
  { id: '3', title: 'Creador de aventuras', image: require('../../../assets/images/3.png') },
];

// Logros en cada categoría con títulos únicos
const categories = [
  {
    title: 'Exploración',
    achievements: [
      { id: 'e1', title: 'Aventurero', image: require('../../../assets/images/4.png'), progress: 80 },
      { id: 'e2', title: 'Descubridor', image: require('../../../assets/images/5.png'), progress: 55 },
      { id: 'e3', title: 'Guía Experto', image: require('../../../assets/images/6.png'), progress: 90 },
      { id: 'e4', title: 'Explorador Legendario', image: require('../../../assets/images/7.png'), progress: 45 },
    ],
  },
  {
    title: 'Contribución',
    achievements: [
      { id: 'c1', title: 'Colaborador', image: require('../../../assets/images/8.png'), progress: 65 },
      { id: 'c2', title: 'Mentor', image: require('../../../assets/images/9.png'), progress: 85 },
      { id: 'c3', title: 'Apoyo Constante', image: require('../../../assets/images/10.png'), progress: 40 },
      { id: 'c4', title: 'Donante Destacado', image: require('../../../assets/images/11.png'), progress: 95 },
    ],
  },
  {
    title: 'Participación en la Comunidad',
    achievements: [
      { id: 'p1', title: 'Líder Comunitario', image: require('../../../assets/images/12.png'), progress: 75 },
      { id: 'p2', title: 'Amigo Fiel', image: require('../../../assets/images/2.png'), progress: 60 },
      { id: 'p3', title: 'Facilitador', image: require('../../../assets/images/3.png'), progress: 80 },
      { id: 'p4', title: 'Influencer Local', image: require('../../../assets/images/4.png'), progress: 55 },
    ],
  },
  {
    title: 'Consistencia y Compromiso',
    achievements: [
      { id: 'cc1', title: 'Dedicación Plena', image: require('../../../assets/images/7.png'), progress: 92 },
      { id: 'cc2', title: 'Ejemplo de Constancia', image: require('../../../assets/images/4.png'), progress: 88 },
      { id: 'cc3', title: 'Compromiso Inquebrantable', image: require('../../../assets/images/5.png'), progress: 78 },
      { id: 'cc4', title: 'Campeón de la Disciplina', image: require('../../../assets/images/6.png'), progress: 65 },
    ],
  },
];

// Logros cercanos, filtrados desde las categorías según el progreso más alto
const closeAchievements: Achievement[] = categories
  .flatMap(category => category.achievements)
  .filter(achievement => achievement.progress && achievement.progress >= 70)
  .sort((a, b) => (b.progress || 0) - (a.progress || 0))
  .map((achievement, index) => ({
    ...achievement,
    id: `${achievement.id}-${index}`,
  }));

const AchievementsScreen = () => {
  const [activeTab, setActiveTab] = useState('Logros');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const handleAchievementPress = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setModalVisible(true);
  };

  const renderAchievement = ({ item }: { item: Achievement }) => (
    <TouchableOpacity style={styles.achievementItem} onPress={() => handleAchievementPress(item)}>
      {item.image && <Image source={item.image} style={styles.achievementImage} />}
      <Text style={styles.achievementText} numberOfLines={1}>
        {item.title.length > 12 ? `${item.title.slice(0, 12)}...` : item.title}
      </Text>
      {item.progress !== undefined ? (
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${item.progress}%` }]} />
        </View>
      ) : (
        <Text style={styles.completedText}>Completado</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Ionicons name="trophy" size={24} color="#8FD14F" />
        <Text style={styles.headerText}>Logros y Recompensas</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Logros' && styles.activeTab]}
            onPress={() => setActiveTab('Logros')}
          >
            <Text style={[styles.tabText, activeTab === 'Logros' && styles.activeTabText]}>Logros</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Recompensas' && styles.activeTab]}
            onPress={() => setActiveTab('Recompensas')}
          >
            <Text style={[styles.tabText, activeTab === 'Recompensas' && styles.activeTabText]}>Recompensas</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.section}>
            <Ionicons name="trophy" size={18} color="#8FD14F" />
            <Text style={styles.sectionTitle}>MIS LOGROS</Text>
          </View>

          <View style={styles.subSection}>
            <Text style={styles.subSectionTitle}>Logros Destacados</Text>
            <FlatList
              horizontal
              data={highlightedAchievements}
              renderItem={({ item }) => (
                <TouchableOpacity key={item.id} style={styles.achievementHighlight} onPress={() => handleAchievementPress(item)}>
                  {item.image && <Image source={item.image} style={styles.achievementImage} />}
                  <Text style={styles.highlightTitle} numberOfLines={1}>{item.title}</Text>
                  {item.description && <Text style={styles.highlightDescription}>{item.description}</Text>}
                  <Text style={styles.completedText}>Completado</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.achievementsRow}
            />
          </View>

          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {selectedAchievement?.image && <Image source={selectedAchievement.image} style={styles.modalImage} />}
                <Text style={styles.modalTitle}>{selectedAchievement?.title}</Text>
                <Text style={styles.modalDescription}>{selectedAchievement?.description || 'No hay descripción disponible.'}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.subSection}>
            <Text style={styles.subSectionTitle}>Logros Cercanos</Text>
            <FlatList
              horizontal
              data={closeAchievements}
              renderItem={renderAchievement}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.achievementsRow}
            />
          </View>

          {categories.map((category) => (
            <View key={category.title} style={styles.subSection}>
              <Text style={styles.subSectionTitle}>{category.title}</Text>
              <FlatList
                horizontal
                data={category.achievements}
                renderItem={renderAchievement}
                keyExtractor={(item, index) => `${category.title}-${index}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.achievementsRow}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e2e50',
    marginLeft: 10,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#2e2e50',
  },
  activeTabText: {
    fontWeight: 'bold',
    color: '#2e2e50',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8FD14F',
    marginLeft: 5,
  },
  subSection: {
    marginBottom: 15,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e2e50',
    marginBottom: 5,
  },
  achievementsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementHighlight: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2e2e50',
    marginTop: 5,
  },
  highlightDescription: {
    fontSize: 12,
    color: '#2e2e50',
    textAlign: 'center',
  },
  achievementImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  achievementItem: {
    alignItems: 'center',
    backgroundColor: '#F0F8E6',
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  achievementText: {
    fontSize: 12,
    color: '#2e2e50',
    marginTop: 5,
  },
  progressBarContainer: {
    height: 6,
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginTop: 5,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#8FD14F',
    borderRadius: 3,
  },
  completedText: {
    fontSize: 12,
    color: '#8FD14F',
    fontWeight: 'bold',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e2e50',
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#2e2e50',
    textAlign: 'center',
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#8FD14F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white', // puedes configurar un fondo si es necesario
  },
});

export default AchievementsScreen;