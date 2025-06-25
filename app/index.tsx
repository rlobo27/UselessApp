import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import CustomAlert from '../components/CustomAlert';

const MyScreen = () => {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handlePrimaryAction = () => {
    console.log('Acción principal ejecutada!');
    setIsAlertVisible(false); // Cierra la alerta después de la acción
  };

  const handleSecondaryAction = () => {
    console.log('Acción secundaria ejecutada!');
    setIsAlertVisible(false); // Cierra la alerta después de la acción
  };

  return (
    <View style={styles.container}>
      <Button title="Mostrar Alerta" onPress={() => setIsAlertVisible(true)} />

      <CustomAlert
        visible={isAlertVisible}
        title="¡Atención!"
        message="Esta es una alerta personalizada de ejemplo con dos botones."
        primaryText="Aceptar"
        onPrimary={handlePrimaryAction}
        secondaryText="Cancelar"
        onSecondary={handleSecondaryAction}
      />

      {/* También puedes usarla con un solo botón */}
      <Button title="Mostrar Alerta (Solo un botón)" onPress={() => setIsAlertVisible(true)} />

      <CustomAlert
        visible={isAlertVisible} // Puedes usar otra variable de estado si quieres dos alertas independientes
        title="¡Éxito!"
        message="Tu operación se ha completado correctamente."
        primaryText="Entendido"
        onPrimary={() => setIsAlertVisible(false)} // Cierra la alerta directamente
        // No se pasan secondaryText ni onSecondary para que solo muestre un botón
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyScreen;