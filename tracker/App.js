import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import CalendarScreen from './screens/CalendarScreen';
import AddExpenseScreen from './screens/AddExpenseScreen'; // трябва да го направиш ти или да искаш помощ
import IncomeScreen from './screens/IncomeScreen'; // ако искаш и дневник на приходи

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#192f6a' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="Начало" component={HomeScreen} />
        <Stack.Screen name="Календар" component={CalendarScreen} />
        <Stack.Screen name="Добави разход" component={AddExpenseScreen} />
        <Stack.Screen name="Приходи" component={IncomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
