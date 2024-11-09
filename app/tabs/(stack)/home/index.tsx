import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/shared/CustomButton'
import { router } from 'expo-router'

const HomeScreen = () => {
    return (
        <SafeAreaView>
            <View className='px-10 mb-2'>
                <CustomButton
                    color='green'
                    onPress={() => router.push('/tabs/(stack)/login')}
                >
                    Login
                </CustomButton>
            </View>
            <View className='px-10'>
                <CustomButton
                    onPress={() => router.push('/tabs/(stack)/routes')}
                >
                    Rutas
                </CustomButton>
            </View>
                
        </SafeAreaView>
    )
}

export default HomeScreen