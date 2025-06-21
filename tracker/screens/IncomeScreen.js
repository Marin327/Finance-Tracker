import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert } from 'react-native';

export default function IncomeScreen() {
  const [incomeList, setIncomeList] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const addIncome = () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Грешка', 'Моля въведи валидна сума.');
      return;
    }
    const newIncome = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      description,
    };
    setIncomeList([newIncome, ...incomeList]);
    setAmount('');
    setDescription('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Дневник на приходите</Text>

      <TextInput
        style={styles.input}
        placeholder="Сума"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TextInput
        style={styles.input}
        placeholder="Описание"
        value={description}
        onChangeText={setDescription}
      />

      <Button title="Добави приход" onPress={addIncome} />

      <FlatList
        style={styles.list}
        data={incomeList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.amount}>+ {item.amount.toFixed(2)} лв.</Text>
            <Text style={styles.desc}>{item.description || 'Без описание'}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Няма добавени приходи.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  list: {
    marginTop: 20,
  },
  item: {
    backgroundColor: '#e0f7fa',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  amount: {
    fontWeight: 'bold',
    color: '#00796b',
  },
  desc: {
    marginTop: 4,
    color: '#004d40',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#aaa',
  },
});
