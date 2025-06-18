import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, TouchableOpacity} from 'react-native';
import { router } from 'expo-router';
import AlertPopup, { AlertPopupRef } from '../components/AlertPopup';


export default function App() {

  const [username, setUsername] = useState<string>('');
  const alertRef = useRef<AlertPopupRef>(null);

  const goHome = (): void =>{
    router.replace('home');
  };

  const nada = (): void =>{
    alertRef.current?.show({
          title: 'Hey',
          message: username,
          type: 'info',
          position: 'center',
          showConfirmButton: true,
          onConfirm:() => {
            console.log("popup alert clsoed")
          },
          
        });
      console.log("Freecovernpm ")
      setUsername('')
    };

  return (
    <SafeAreaView style={styles.container}>

      <View>
        <Image
          source={require('../assets/images/vida-muerte.jpg')}
          style={styles.logo}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.tittle}>Login</Text>
        <TextInput style={styles.input} placeholder='hiiiii' //input user
        value={username}
        onChangeText={setUsername}
        />
        <TextInput style={styles.input} //input password
        />
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
          
        <TouchableOpacity 
        style={styles.button}
        onPress={goHome}
        >
          <Text style={styles.bottontext}>Iniciar Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        style={styles.button}
        onPress={nada}
        >
          <Text style={styles.bottontext}>Boton 2</Text>
        </TouchableOpacity>
        <AlertPopup ref={alertRef} />
      </View>
    </SafeAreaView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start', 
    marginTop: 0,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    marginTop: 100, 
    borderRadius: 30,
    overflow: 'hidden',
  },
  tittle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  form: {
    width: '85%',
    flex: 1,
  },
  input: {
    borderWidth: 2,
    borderColor: '#666',
    borderRadius: 7,
    padding: 10,
    marginBottom: 15,
    marginTop: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'black',
    borderRadius: 7,
    paddingVertical: 15,
    alignItems: 'center',
    borderColor: 'white',
    marginBottom: 20,
  },
  bottontext: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 20,
  },
});
