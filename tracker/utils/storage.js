import AsyncStorage from '@react-native-async-storage/async-storage';

const EXPENSES_KEY = 'expenses';

export async function getExpenses() {
  try {
    const jsonValue = await AsyncStorage.getItem(EXPENSES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error reading expenses', e);
    return [];
  }
}

export async function saveExpense(expense) {
  try {
    const expenses = await getExpenses();
    expenses.push(expense);
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (e) {
    console.error('Error saving expense', e);
  }
}

export async function deleteExpense(id) {
  try {
    let expenses = await getExpenses();
    expenses = expenses.filter(exp => exp.id !== id);
    await AsyncStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  } catch (e) {
    console.error('Error deleting expense', e);
  }
}
