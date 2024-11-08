import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
    return (
        <SafeAreaView>
            <View className='mt-10'>
                <Text className='color-green-600 font-work-regular'>Hola Mundo!</Text>
            </View>
        </SafeAreaView>
    )
}

export default App