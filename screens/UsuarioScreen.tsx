import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { ref, set, onValue, update, remove } from "firebase/database";
import { db } from '../components/Config';

export default function UsuarioScreen() {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [email, setEmail] = useState('');
  const [lista, setLista] = useState([]);


// -----------------GUARDAR------------

function guardar(cedula: string, nombre: string, ciudad: string, email: string) {
  set(ref(db, 'usuarios/' + cedula), {
    name: nombre,
    city: ciudad,
    email: email
  });
  
  setCedula('');
  setNombre('');
  setCiudad('');
  setEmail('');
}
// -----------------LEER------------

function leer() {
  const starCountRef = ref(db, 'usuarios/');
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    let arreglo: any = Object.keys(data).map(key => ({
      key, ...data[key]
    }));
    setLista(arreglo);
  });
}

// -----------------ACTUALIZAR------------
function actualizar() {
  update(ref(db, 'usuarios/' + cedula), {
    name: nombre,
    city: ciudad,
    email: email
  });
}
// -----------------ELIMINAR------------

function eliminar() {
  remove(ref(db, 'usuarios/' + cedula));
}

type usuario = {
  cedula: string,
  name: string,
  city: string,
  email: string,
  key: string
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRO DE USUARIOS</Text>
      {/* // -------------ESCRIBIR------------ */}
      <View>
        <TextInput
          placeholder='Ingrese cédula'
          style={styles.input}
          onChangeText={(texto) => (setCedula(texto))}
          value={cedula}
        />
        <TextInput
          placeholder='Ingrese nombre completo'
          style={styles.input}
          onChangeText={(texto) => (setNombre(texto))}
          value={nombre}
        />
        <TextInput
          placeholder='Ingrese ciudad'
          style={styles.input}
          onChangeText={(texto) => (setCiudad(texto))}
          value={ciudad}
        />
        <TextInput
          placeholder='Ingrese email'
          style={styles.input}
          onChangeText={(texto) => (setEmail(texto))}
          value={email}
        />
        <View style={styles.buttonContainer}>
          <Button title='Guardar' onPress={() => (guardar(cedula, nombre, ciudad, email))} />
          <Button title='Leer' onPress={() => leer()} />
        </View>
      </View>
      <View style={styles.divider} />
      <View>
        <View style={styles.inputRow}>
          <TextInput
            placeholder='Cédula'
            style={styles.input2}
            onChangeText={(texto) => (setCedula(texto))}
            value={cedula}
          />
          {/* // -------------ACTUALIZAR------------ */}
          <TextInput
            placeholder='Nombre'
            style={styles.input2}
            onChangeText={(texto) => (setNombre(texto))}
            value={nombre}
          />
          <TextInput
            placeholder='Ciudad'
            style={styles.input2}
            onChangeText={(texto) => (setCiudad(texto))}
            value={ciudad}
          />
          <TextInput
            placeholder='Email'
            style={styles.input2}
            onChangeText={(texto) => (setEmail(texto))}
            value={email}
          />
        </View>
        <Button title='Actualizar' onPress={() => (actualizar())} />
      </View>
      {/* // -------------ELIMINAR----------- */}
      <View style={styles.divider} />
      <View style={styles.inputRow}>
        <TextInput
          placeholder='Ingrese cédula'
          style={styles.input2}
          onChangeText={(texto) => (setCedula(texto))}
        />
        <Button title='Eliminar' color={'red'} onPress={() => eliminar()} />
      </View>
      <View style={styles.divider} />
      {/* // -------------ESCRIBIR------------ */}
      <FlatList
        data={lista}
        renderItem={({ item }: { item: usuario }) =>
          <View style={styles.item}>
            <Text style={styles.text}>{item.key}</Text>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.city}</Text>
            <Text style={styles.text}>{item.email}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff', 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    height: 40,
    width: '80%',
    marginVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderColor: 'black',
  },
  input2: {
    borderWidth: 1,
    height: 40,
    width: '22%',
    margin: 2,
    borderRadius: 20,
    paddingHorizontal: 16,
    borderColor: 'black', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#007AFF', 
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    width: '100%',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 16,
  },
  divider: {
    borderColor: 'gray',
    borderWidth: 1,
    width: '95%',
    margin: 3,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
