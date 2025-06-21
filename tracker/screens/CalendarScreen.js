import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getExpenses } from '../utils/storage';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyExpenses, setDailyExpenses] = useState([]);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    loadExpensesForDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    markExpenseDays();
  }, []);

  const loadExpensesForDate = async (date) => {
    const allExpenses = await getExpenses();
    const filtered = allExpenses.filter(exp => exp.date === date);
    setDailyExpenses(filtered);
  };

  const markExpenseDays = async () => {
    const allExpenses = await getExpenses();
    const datesWithExpenses = {};

    allExpenses.forEach(expense => {
      if (!datesWithExpenses[expense.date]) {
        datesWithExpenses[expense.date] = { marked: true, dotColor: '#00adf5' };
      }
    });

    // Добавяме избрания ден със специален стил
    datesWithExpenses[selectedDate] = {
      ...(datesWithExpenses[selectedDate] || {}),
      selected: true,
      selectedColor: '#00adf5',
    };

    setMarkedDates(datesWithExpenses);
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    loadExpensesForDate(day.dateString);
    markExpenseDays();
  };

  const renderExpense = ({ item }) => (
    <View style={styles.expenseItem}>
      <Text style={styles.expenseText}>{item.description} - {item.amount} лв.</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        theme={{
          calendarBackground: '#192f6a',
          textSectionTitleColor: '#fff',
          dayTextColor: '#fff',
          monthTextColor: '#fff',
          arrowColor: '#fff',
          todayTextColor: '#00adf5',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#fff',
          dotColor: '#00adf5',
          selectedDotColor: '#fff',
        }}
      />
      <Text style={styles.header}>Разходи за {selectedDate}:</Text>
      <FlatList
        data={dailyExpenses}
        keyExtractor={item => item.id.toString()}
        renderItem={renderExpense}
        ListEmptyComponent={<Text style={styles.emptyText}>Няма разходи за този ден</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#192f6a' },
  header: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginVertical: 10 },
  expenseItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  expenseText: { color: '#dfe6e9' },
  emptyText: { color: '#dfe6e9', textAlign: 'center', marginTop: 20 },
});
