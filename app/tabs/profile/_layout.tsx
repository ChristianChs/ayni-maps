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
        name='config/index'
        options={{
          title: 'Config',
          animation: 'default'
        }}
      />
      <Stack.Screen
        name='modify/index'
        options={{
          title: 'Modify',
          animation: 'default'
        }}
      />
    </Stack>
  )
}

export default StackLayout