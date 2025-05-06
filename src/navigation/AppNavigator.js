import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Products" component={ProductListScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
