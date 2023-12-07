import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,interval } from 'react-native';
const Juego = ({ navigation }) => {
    const [preguntas, setPreguntas] = useState([
        {
            id: 'A',
            pregunta: '¿Quién es el creador de Dragon Ball?',
            respuesta: 'Akira Toriyama'
        },
        {
            id: 'B',
            pregunta: '¿Cuál es el nombre real de Goku?',
            respuesta: 'Kakaroto'
        }
    ]);
    const [numPreguntaActual, setNumPreguntaActual] = useState(0);
    const [respuesta, setRespuesta] = useState('');
    const [tiempoRestante, setTiempoRestante] = useState(60);
    const [estadoPreguntas, setEstadoPreguntas] = useState(Array(preguntas.length).fill(0));
    const [cantidadAcertadas, setCantidadAcertadas] = useState(0);
    const [mostrarPantallaFinal, setMostrarPantallaFinal] = useState(false);
    let intervalId;

    useEffect(() => {
        largarTiempo();
        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, []);

    const cargarPregunta = () => {
        if (numPreguntaActual >= 0 && numPreguntaActual < preguntas.length) {
            const preguntaActual = preguntas[numPreguntaActual];
            console.log('Pregunta actual:', preguntaActual);
        } else {
            console.log('No hay más preguntas');
        }
    };

    const controlarRespuesta = () => {
        // Lógica para controlar la respuesta ingresada por el usuario
        // ...
        cargarPregunta();
    };

    const pasar = () => {
        actualizarPregunta();
        reiniciarTiempo();
    };

    const actualizarPregunta = () => {
        const nextQuestion = numPreguntaActual + 1;
        if (nextQuestion >= preguntas.length) {
            setNumPreguntaActual(0);
        } else {
            setNumPreguntaActual(nextQuestion);
        }
    };

    const reiniciarTiempo = () => {
        clearInterval(intervalId);
        setTiempoRestante(60);
        largarTiempo();
    };

    const largarTiempo = () => {
        intervalId = setInterval(() => {
            setTiempoRestante(prevTime => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(intervalId);
                    setRespuesta('');
                    cargarPregunta();
                    return prevTime;
                }
            });
        }, 1000);
    };

    // Resto del componente...
};
