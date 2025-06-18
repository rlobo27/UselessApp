// app/home.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  const handleLogout = () => {
    console.log('Cerrando sesión...');
    router.replace('/'); // Vuelve a la pantalla de login (ruta raíz)
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>¡Bienvenido a Home!</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
}