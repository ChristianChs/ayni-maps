import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/shared/CustomButton'
import { router } from 'expo-router'

const App = () => {
    return (
        <SafeAreaView>
            <View className='px-10 mt-10'>
                <Text className='color-green-600 font-work-regular'>Hola Mundo!</Text>
                <CustomButton
                    color='green'
                    onPress={() => router.push('/login')}
                >
                    Login
                </CustomButton>
            </View>
        </SafeAreaView>
    )
}

export default App