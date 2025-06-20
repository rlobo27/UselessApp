import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export type AlertPosition = 'center' | 'top' | 'bottom';

export interface AlertPopupProps {
}

export interface AlertPopupRef {
  show: (options: {
    message: string;
    type?: AlertType;
    onConfirm?: () => void;
    onCancel?: () => void;
    showCancelButton?: boolean;
    showConfirmButton?: boolean;
    title?: string;
    position?: AlertPosition;
  }) => void;
  hide: () => void;
}

const AlertPopup = forwardRef<AlertPopupRef, AlertPopupProps>((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [type, setType] = useState<AlertType>('info');
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | null>(null);
  const [onCancelCallback, setOnCancelCallback] = useState<(() => void) | null>(null);
  const [showCancelButton, setShowCancelButton] = useState<boolean>(false);
  const [showConfirmButton, setShowConfirmButton] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [position, setPosition] = useState<AlertPosition>('center'); 

  useImperativeHandle(ref, () => ({
    show: ({
      message,
      type = 'info',
      onConfirm = null,
      onCancel = null,
      showCancelButton = false,
      showConfirmButton = false,
      title = '',
      position = 'center', 
    }) => {
      setMessage(message);
      setType(type);
      setOnConfirmCallback(() => onConfirm); 
      setOnCancelCallback(() => onCancel);
      setShowCancelButton(showCancelButton);
      setShowConfirmButton(showConfirmButton);
      setTitle(title);
      setPosition(position); 
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
      setMessage('');
      setType('info');
      setOnConfirmCallback(null);
      setOnCancelCallback(null);
      setShowCancelButton(false);
      setShowConfirmButton(false);
      setTitle('');
      setPosition('center'); 
    },
  }));

  const handleConfirm = () => {
    setVisible(false);
    if (onConfirmCallback) {
      onConfirmCallback();
    }
  };

  const handleCancel = () => {
    setVisible(false);
    if (onCancelCallback) {
      onCancelCallback();
    }
  };

  const getBackgroundColor = (): string => {
    switch (type) {
      case 'success':
        return '#4CAF50'; // Green
      case 'error':
        return '#fff'; // Red
      case 'warning':
        return '#FFC107'; // Orange
      case 'info':
      default:
        return '#2196F3'; // blue
    }
  };

  const getTitleText = (): string => {
    if (title) return title;
    switch (type) {
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
    if (type === 'error') {
      return (
        <Icon name="error-outline" size={50} color="#FF3B30" style={styles.icon} /> // Red color for error
      );
    }
  };

  
  const getJustifyContent = () => {
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

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={[styles.centeredView, { justifyContent: getJustifyContent() }]}>
        <View style={[styles.modalView, { backgroundColor: getBackgroundColor() }]}>
          {renderIcon()}
          <Text style={styles.modalTitle}>{getTitleText()}</Text>
          <Text style={styles.modalText}>{message}</Text>
          <View style={styles.buttonContainer}>
            {showCancelButton && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
            )}
            {showConfirmButton && (
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
  icon: {
    marginBottom: 15,
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
    backgroundColor: '#FF3B30',
  },
  cancelButton: {
    backgroundColor: '#D32F2F', // Rojo oscuro
    marginRight: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AlertPopup;