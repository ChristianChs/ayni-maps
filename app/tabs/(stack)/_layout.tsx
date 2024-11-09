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
        name='login/index'
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name='routes/index'
        options={{
          title: 'Rutas',
        }}
      />
    </Stack>
  )
}

export default StackLayout