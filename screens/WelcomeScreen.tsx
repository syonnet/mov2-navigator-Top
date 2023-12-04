import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen({navigation}: any) {
  return (
    <View>
      <Text>Welcome</Text>
      <Button title='Ir a Usuario' onPress={()=> navigation.navigate('Usuario')}/>
    </View>
  )
}

const styles = StyleSheet.create({})