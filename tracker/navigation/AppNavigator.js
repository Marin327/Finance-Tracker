import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import IncomeScreen from '../screens/IncomeScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* Само Screen компоненти тук */}
      <Stack.Screen name="Начална" component={HomeScreen} />
      <Stack.Screen name="Добави разход" component={AddExpenseScreen} />
      <Stack.Screen name="Приходи" component={IncomeScreen} />
    </Stack.Navigator>
  );
}
