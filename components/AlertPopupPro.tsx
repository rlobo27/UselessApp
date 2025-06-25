import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const { width } = Dimensions.get('window');

// --- Type Definitions ---
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

// --- AlertPopup Component ---
const AlertPopup = forwardRef<AlertPopupRef, {}>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<AlertPopupOptions>({
    message: '',
    type: 'info',
    showCancelButton: false,
    showConfirmButton: false,
    title: '',
    position: 'center',
  });

  // Consolidate state and default values for better management
  useImperativeHandle(ref, () => ({
    show: (newOptions) => {
      setOptions(prevOptions => ({
        ...prevOptions, // Keep previous defaults if not overridden
        ...newOptions, // Apply new options
      }));
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
      // Reset to initial state or sensible defaults after hiding
      setOptions({
        message: '',
        type: 'info',
        showCancelButton: false,
        showConfirmButton: false,
        title: '',
        position: 'center',
      });
    },
  }));

  const handleConfirm = () => {
    setVisible(false);
    options.onConfirm?.(); // Use optional chaining for conciseness
  };

  const handleCancel = () => {
    setVisible(false);
    options.onCancel?.(); // Use optional chaining for conciseness
  };

  // Memoize these calculations if they become complex or are called frequently
  // For now, they are simple enough not to require it.
  const getBackgroundColor = (): string => {
    // Colors are intentionally kept as #fff as per requirement "sin cambiar colores"
    switch (options.type) {
      case 'success':
      case 'error':
      case 'warning':
      case 'info':
      default:
        return '#fff';
    }
  };

  const getTitleText = (): string => {
    if (options.title) return options.title;
    switch (options.type) {
      case 'success':
        return 'Éxito';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Advertencia';
      case 'info':
      default:
        return 'Información';
    }
  };

  const renderIcon = () => {
    const iconColor = '#FF3B30'; // Specific color as per your original code
    switch (options.type) {
      case 'success':
        return <Feather name="check-circle" size={42} color={iconColor} />;
      case 'error':
        return <Feather name="alert-circle" size={42} color={iconColor} />;
      case 'warning':
        return <Feather name="alert-octagon" size={42} color={iconColor} />;
      case 'info':
      default:
        return <Feather name="info" size={42} color={iconColor} />;
    }
  };

  const getJustifyContent = () => {
    switch (options.position) {
      case 'top':
        return 'flex-start';
      case 'bottom':
        return 'flex-end';
      case 'center':
      default:
        return 'center';
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={[styles.centeredView, { justifyContent: getJustifyContent() }]}>
        <View style={[styles.modalView, { backgroundColor: getBackgroundColor() }]}>
          <View style={styles.circleContainer}>{renderIcon()}</View>
          <Text style={styles.modalTitle}>{getTitleText()}</Text>
          <Text style={styles.modalText}>{options.message}</Text>
          <View style={styles.buttonContainer}>
            {options.showCancelButton && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
            )}
            {options.showConfirmButton && (
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.textStyle}>Aceptar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
});

// --- Styles ---
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 20,
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
    width: width * 0.8,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
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
    backgroundColor: '#FF3B30', // Your original red
  },
  cancelButton: {
    backgroundColor: '#A0A0A0', // Your original dark red
    marginRight: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  circleContainer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 0, 0, 0.2)', // Your original transparent red
  },
});

export default AlertPopup;