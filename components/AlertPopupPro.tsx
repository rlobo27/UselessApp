import React, { useState, forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const { width } = Dimensions.get('window');

// --- Types ---
export type AlertType = 'success' | 'error' | 'warning' | 'info';
export type AlertPosition = 'center' | 'top' | 'bottom';

export interface AlertPopupOptions {
  message: string;
  type?: AlertType;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  title?: string;
  position?: AlertPosition;
}

export interface AlertPopupRef {
  show: (options: AlertPopupOptions) => void;
  hide: () => void;
}

// --- Translations ---
const translations = {
  es: {
    successTitle: 'Éxito',
    errorTitle: 'Error',
    warningTitle: 'Advertencia',
    infoTitle: 'Información',
    cancelButton: 'Cancelar',
    confirmButton: 'Aceptar',
  },
  en: {
    successTitle: 'Success',
    errorTitle: 'Error',
    warningTitle: 'Warning',
    infoTitle: 'Information',
    cancelButton: 'Cancel',
    confirmButton: 'Accept',
  },
};

// --- Alert Configurations ---
// Centralized configuration for icons and colors per alert type
const alertConfigs = {
  success: {
    icon: 'check-circle',
    color: '#28a745', // Green
    circleColor: 'rgba(40, 167, 69, 0.2)', // Green with transparency
  },
  error: {
    icon: 'alert-circle',
    color: '#dc3545', // Red
    circleColor: 'rgba(220, 53, 69, 0.2)', // Red with transparency
  },
  warning: {
    icon: 'alert-octagon',
    color: '#ffc107', // Orange
    circleColor: 'rgba(255, 193, 7, 0.2)', // Orange with transparency
  },
  info: {
    icon: 'info',
    color: '#007bff', // Blue
    circleColor: 'rgba(0, 123, 255, 0.2)', // Blue with transparency
  },
};

const AlertPopup = forwardRef<AlertPopupRef, {}>((_, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  // Using a single state object for all options for cleaner management
  const [options, setOptions] = useState<AlertPopupOptions>({
    message: '',
    type: 'info',
    showCancelButton: false,
    showConfirmButton: false,
    position: 'center',
  });

  // Use refs for callbacks to prevent stale closures with useImperativeHandle
  const onConfirmRef = useRef<(() => void) | null>(null);
  const onCancelRef = useRef<(() => void) | null>(null);

  useImperativeHandle(ref, () => ({
    show: (newOptions) => {
      // Merge new options with current state, allowing partial updates
      setOptions((prevOptions) => ({
        ...prevOptions,
        ...newOptions,
      }));
      // Store callbacks in refs to ensure they are always up-to-date
      onConfirmRef.current = newOptions.onConfirm || null;
      onCancelRef.current = newOptions.onCancel || null;
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
      // Reset options and refs after hiding, or keep them if you prefer persistence
      setOptions({
        message: '',
        type: 'info',
        showCancelButton: false,
        showConfirmButton: false,
        language: 'es',
        position: 'center',
      });
      onConfirmRef.current = null;
      onCancelRef.current = null;
    },
  }));

  // Using useCallback for stable function references
  const handleConfirm = useCallback(() => {
    setVisible(false);
    onConfirmRef.current?.(); // Call directly from the ref
  }, []); // Dependencies array is empty as onConfirmRef is stable

  const handleCancel = useCallback(() => {
    setVisible(false);
    onCancelRef.current?.(); // Call directly from the ref
  }, []); // Dependencies array is empty as onCancelRef is stable

  const getTitleText = (): string => {
    const { title, type, language = 'es' } = options; // Destructure language with default
    if (title) return title;
    // Safely get translation, fall back to default ES if type translation is missing
    return translations[language][`${type}Title`] || translations.es[`${type}Title`];
  };

  const renderIcon = () => {
    const { type } = options;
    const config = alertConfigs[type] || alertConfigs.info; // Fallback to info config
    return <Feather name={config.icon} size={42} color={config.color} />;
  };
  
  const getJustifyContent = () => {
    const { position = 'center' } = options; // Destructure position with default
    switch (position) {
      case 'top':
        return 'flex-start';
      case 'bottom':
        return 'flex-end';
      case 'center':
      default:
        return 'center';
    }
  };

  // Destructure options for easier access in JSX
  const { type, message, showCancelButton, showConfirmButton, language = 'es' } = options;
  const currentConfig = alertConfigs[type] || alertConfigs.info; // Get current alert type configuration

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => setVisible(false)} // Allows closing with hardware back button on Android
    >
      <View style={[styles.centeredView, { justifyContent: getJustifyContent() }]}>
        <View style={styles.modalView}>
          {/* Icon wrapped in a circle container with dynamic background color */}
          <View style={[styles.circleContainer, { backgroundColor: currentConfig.circleColor }]}>
            {renderIcon()}
          </View>
          {/* Title text with dynamic color based on alert type */}
          <Text style={[styles.modalTitle, { color: currentConfig.color }]}>{getTitleText()}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonContainer}>
            {showCancelButton && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.textStyle}>
                  {translations[language].cancelButton}
                </Text>
              </TouchableOpacity>
            )}
            {showConfirmButton && (
              <TouchableOpacity
              // Confirm button background color matches the alert type's primary color
              style={[styles.button, styles.confirmButton, { backgroundColor: currentConfig.color }]}
              onPress={handleConfirm}
            >
              <Text style={styles.textStyle}>
                {translations[language].confirmButton}
              </Text>
            </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background behind the modal
    paddingVertical: 20, // Add some vertical padding for top/bottom positions
  },
  modalView: {
    margin: 20,
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width * 0.8, // Modal width responsive to screen size
    backgroundColor: '#fff', // Consistent white background for the modal content
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    // Color set dynamically based on alert type
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    minWidth: 120,
    alignItems: 'center',
  },
  confirmButton: {
    // Background color set dynamically based on alert type
  },
  cancelButton: {
    backgroundColor: '#6c757d', // A more neutral gray for the cancel button
    marginRight: 10, // Maintain space if both buttons are present
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  circleContainer: {
    width: 76,
    height: 76,
    borderRadius: 38, // Half of width/height for a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    // Background color set dynamically based on alert type
  },
});

export default AlertPopup;