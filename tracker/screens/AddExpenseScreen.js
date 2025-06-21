// screens/AddExpenseScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { saveExpense } from '../utils/storage';

export default function AddExpenseScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = async () => {
    if (!title || !amount || !category) {
      Alert.alert('Грешка', 'Моля, попълнете всички полета.');
      return;
    }

    const newExpense = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString(),
    };

    await saveExpense(newExpense);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Име на разход:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Сума:</Text>
      <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" />

      <Text style={styles.label}>Категория:</Text>
      <TextInput style={styles.input} value={category} onChangeText={setCategory} />

      <Button title="Запази" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 4,
  },
});
