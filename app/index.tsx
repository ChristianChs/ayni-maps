import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/shared/CustomButton'
import { Redirect, router } from 'expo-router'

const App = () => {
    return (
        // <Redirect href="/home"/>
        <Redirect href="/tabs"/>
    )
}

export default App