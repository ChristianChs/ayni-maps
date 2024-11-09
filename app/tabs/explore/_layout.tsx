import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown:false,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: 'white'
        }
      }}>
      <Stack.Screen
        name='home/index'
        options={{
          title: 'Home'
        }}
      />
      <Stack.Screen
        name='route/index'
        options={{
          title: 'Rutas',
          animation: 'default'
        }}
      />
      <Stack.Screen
        name='description/index'
        options={{
          title: 'Rutas',
          animation: 'default'
        }}
      />
    </Stack>
  )
}

export default StackLayout