import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { spacing, radius, shadow } from '../constants/spacing';
import { NavigationProps } from '../types/navigation';
import { vocabulary, VocabEntry, VocabCategory } from '../data/vocabulary';

const VocabularioScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState<VocabCategory | 'all'>('all');

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return vocabulary.filter(v => {
      const matchesQuery = q === '' || v.termEs.toLowerCase().includes(q) || v.termEn.toLowerCase().includes(q) || v.definitionEs.toLowerCase().includes(q);
      const matchesCat = category === 'all' || v.category === category;
      return matchesQuery && matchesCat;
    });
  }, [query, category]);

  const renderItem = ({ item }: { item: VocabEntry }) => (
    <View style={styles.card}>
      <Text style={styles.termEs}>{item.termEs}</Text>
      <Text style={styles.termEn}>{item.termEn}</Text>
      <View style={styles.tagsRow}>
        <View style={styles.tag}><Text style={styles.tagText}>{item.category}</Text></View>
        {item.tags?.slice(0, 3).map(t => (
          <View key={t} style={styles.tag}><Text style={styles.tagText}>{t}</Text></View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Volver atrás"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.dark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Vocabulario</Text>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Home')}
            accessibilityLabel="Ir al inicio"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="home" size={24} color={colors.text.dark} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.searchRow}>
          <MaterialCommunityIcons name="magnify" size={20} color={colors.text.dark} />
          <TextInput
            placeholder="Buscar término o definición"
            placeholderTextColor="#777"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <View style={styles.filtersRow}>
          {(['all','government','history','civics'] as const).map(cat => (
            <TouchableOpacity key={cat} style={[styles.filterChip, category===cat && styles.filterChipActive]} onPress={() => setCategory(cat as any)}>
              <Text style={[styles.filterText, category===cat && styles.filterTextActive]}>
                {cat === 'all' ? 'Todos' : cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral?.background || '#f5f5f5',
  },
  header: {
    backgroundColor: '#F5F5F5',
    paddingBottom: spacing.md,
    ...shadow.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: spacing.lg,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.round,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.sm,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.dark,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...shadow.sm,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.sm,
    color: colors.text.dark,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.sm as any,
  },
  filterChip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: '#fff',
  },
  filterChipActive: {
    backgroundColor: colors.primary?.main || '#5637A4',
    borderColor: colors.primary?.dark || '#3d2783',
  },
  filterText: { color: colors.text.dark },
  filterTextActive: { color: '#FFD700', fontWeight: '700' },
  listContent: { paddingBottom: spacing.xl },
  card: {
    backgroundColor: '#fff',
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.sm,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  termEs: { fontSize: 18, fontWeight: '700', color: '#000000', marginBottom: spacing.xs },
  termEn: { fontSize: 16, fontWeight: '600', color: '#2563eb', marginBottom: spacing.sm },
  tagsRow: { flexDirection: 'row', gap: spacing.xs as any, marginTop: spacing.sm },
  tag: { backgroundColor: '#f0f0ff', borderRadius: 999, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  tagText: { color: colors.primary?.dark || '#3d2783', fontSize: 12 },
});

export default VocabularioScreen;
