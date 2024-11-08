import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const LoginScreen = () => {
    return (
        <SafeAreaView>
            <View className='px-10 pt-10'>
                <Text>LoginScreen</Text>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen