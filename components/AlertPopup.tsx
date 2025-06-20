import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
//import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather'
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
        return '#fff'; // Green
      case 'error':
        return '#fff'; // Red
      case 'warning':
        return '#fff'; // Orange
      case 'info':
      default:
        return '#fff'; // blue
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
    switch(type) {
      case 'success':
        return <Feather name="check-circle" size={42} color="#FF3B30"/>;
      case 'error':
        return <Feather name="alert-circle" size={42} color="#FF3B30"/>; // Red color for error
      case 'warning':
        return <Feather name="alert-octagon" size={42} color="#FF3B30"/>;
      case 'info':
      default:42
        return <Feather name="info" size={42} color="#FF3B30"/>;
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
          <View style={styles.circleContainer}>{renderIcon()}</View>
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
  circleContainer: {
    width: 76, // Ajusta el tamaño del círculo según tu preferencia
    height: 76, // Debe ser igual al width para un círculo perfecto
    borderRadius: 38, // La mitad del width/height para hacerlo circular
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15, // Mantén el margen inferior que tenías
    backgroundColor: 'rgba(255, 0, 0, 0.2)', // Ejemplo de rojo transparente (RGBA)
},
});

export default AlertPopup;