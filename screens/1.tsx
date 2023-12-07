import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { ref, set, onValue, update, remove } from "firebase/database";
import { db } from '../components/Config';


export default function UsuarioScreen() {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [email, setEmail] = useState('');
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, 'usuarios/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let arreglo: any = Object.keys(data).map(key => ({ key, ...data[key] }));
      setLista(arreglo);
    });
  }, []);

  function guardar() {
    set(ref(db, `usuarios/${cedula}`), {
      name: nombre,
      city: ciudad,
      email: email
    });
    limpiarInputs();
  }

  function actualizar() {
    update(ref(db, `usuarios/${cedula}`), {
      name: nombre,
      city: ciudad,
      email: email
    });
    limpiarInputs();
  }

  function eliminar() {
    remove(ref(db, `usuarios/${cedula}`));
    limpiarInputs();
  }

  function limpiarInputs() {
    setCedula('');
    setNombre('');
    setCiudad('');
    setEmail('');
  }

  type Usuario = {
    key: string;
    name: string;
    city: string;
    email: string;
  };

  


  return (
    <View style={styles.container}>
      <Text style={styles.title}>REGISTRO DE USUARIOS</Text>
      {/* Sección de ingreso */}
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
          <Button title='Guardar' onPress={guardar} />
          <Button title='Actualizar' onPress={actualizar} />
          <Button title='Eliminar' color='red' onPress={eliminar} />
        </View>
      </View>

      {/* FlatList como tabla */}
      <View style={styles.tableContainer}>
        <FlatList
          data={lista}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={styles.cell}>{item.key}</Text>
              <Text style={styles.cell}>{item.name}</Text>
              <Text style={styles.cell}>{item.city}</Text>
              <Text style={styles.cell}>{item.email}</Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.headerText}>Cédula</Text>
              <Text style={styles.headerText}>Nombre</Text>
              <Text style={styles.headerText}>Ciudad</Text>
              <Text style={styles.headerText}>Email</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    height: 35,
    width: '80%',
    margin: 2,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 10,
  },
  tableContainer: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
