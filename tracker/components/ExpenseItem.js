import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { categories } from '../utils/categories';

export default function ExpenseItem({ expense, onDelete }) {
  const categoryInfo = categories[expense.category] || categories['Други'];

  const confirmDelete = () => {
    Alert.alert(
      'Изтриване',
      `Сигурни ли сте, че искате да изтриете "${expense.title}"?`,
      [
        { text: 'Отказ', style: 'cancel' },
        { text: 'Изтрий', style: 'destructive', onPress: () => onDelete(expense.id) },
      ]
    );
  };

  return (
    <View style={[styles.item, { borderLeftColor: categoryInfo.color }]}>
      <MaterialIcons
        name={categoryInfo.icon}
        size={24}
        color={categoryInfo.color}
        style={{ marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.date}>{expense.date} • {expense.category}</Text>
      </View>

      <View style={styles.rightSide}>
        <Text style={[styles.amount, { color: categoryInfo.color }]}>- {expense.amount.toFixed(2)} лв.</Text>

        <TouchableOpacity onPress={confirmDelete} style={styles.deleteBtn}>
          <MaterialIcons name="delete" size={24} color="#d63031" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f2f6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderLeftWidth: 5,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#636e72',
  },
  amount: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  deleteBtn: {
    padding: 4,
  },
});
