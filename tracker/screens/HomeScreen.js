import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  TextInput,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getExpenses, deleteExpense } from '../utils/storage';
import ExpenseList from '../components/ExpenseList';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const isFocused = useIsFocused();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocused) loadExpenses();
  }, [isFocused]);

  const loadExpenses = async () => {
    setLoading(true);
    const data = await getExpenses();
    setExpenses(data);
    setLoading(false);

    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleDelete = async (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    await deleteExpense(id);
    loadExpenses();
  };

  const getTotal = () => {
    return expenses.reduce((acc, e) => acc + (e.amount || 0), 0).toFixed(2);
  };

  const getToday = () => {
    return new Date().toLocaleDateString('bg-BG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const filteredExpenses = expenses.filter(e =>
    e.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <Text style={styles.header}>Дневник на разходите</Text>
      <Text style={styles.subHeader}>{getToday()}</Text>

      <View style={styles.summary}>
        <Text style={styles.totalLabel}>Общо:</Text>
        <Text style={styles.totalValue}>{getTotal()} лв.</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Търсене..."
        placeholderTextColor="#bbb"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <ExpenseList expenses={filteredExpenses} onDelete={handleDelete} />
        </Animated.View>
      )}

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Добави разход')}>
          <Text style={styles.buttonText}>+ Добави разход</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.incomeButton]} onPress={() => navigation.navigate('Приходи')}>
          <Text style={styles.buttonText}>Дневник на приходи</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 4, color: '#fff' },
  subHeader: { fontSize: 16, color: '#d1d8e0', marginBottom: 16 },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  totalLabel: { fontSize: 18, color: '#f1f2f6' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#74b9ff' },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: '#fff',
  },
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  button: {
    backgroundColor: '#0984e3',
    padding: 14,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  incomeButton: { backgroundColor: '#00b894' },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: '600', fontSize: 16 },
});
