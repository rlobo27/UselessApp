import { StyleSheet, Text, View, SafeAreaView, TextInput, Image, TouchableOpacity} from 'react-native';
//import { Image } from 'expo-image';

export default function App() {

  const nada = (): void =>{
      console.log("Freecover")
    };

  return (
    <SafeAreaView style={styles.container}>

      <View>
        <Image
          source={require('../assets/images/vida-muerte.jpg')}
          style={styles.logo}
        />
      </View>
      <View>
        <Text style={styles.tittle}>Nothing</Text>
        <Text>No information to show? aaaa</Text>
        <TextInput style={styles.input}
        />
        <TouchableOpacity 
        style={styles.button}
        onPress={nada}
        >
          <Text style={styles.bottontext}>Boton</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 0,
  },

  bottontext:{
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginTop:100,
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

  input: {
    borderWidth: 2,
    backgroundColor: 'lightgray',
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    marginTop:10,
    fontSize: 16,
  },

  button: {
    backgroundColor: 'black',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    borderColor: 'white',
    marginBottom: 20,
  },
});
