import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default function ExpenseList({ expenses, onDelete }) {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.amount}>{item.amount.toFixed(2)} лв.</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
        <Text style={{ color: 'white' }}>Изтрий</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={expenses}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      ListEmptyComponent={<Text style={styles.emptyText}>Няма разходи</Text>}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  desc: { fontWeight: 'bold', color: '#fff' },
  amount: { color: '#74b9ff' },
  date: { fontSize: 12, color: '#dfe6e9' },
  deleteBtn: {
    backgroundColor: '#d63031',
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 5,
  },
  emptyText: {
    color: '#dfe6e9',
    textAlign: 'center',
    marginTop: 20,
  },
});

