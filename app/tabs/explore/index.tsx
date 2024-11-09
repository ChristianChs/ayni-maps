import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { router } from 'expo-router'

const ExploreMain = () => {
  return (
    <View>
      <Text>ExploreMain</Text>
      <Button
        title="Ir a Detalles"
        onPress={() => router.push("/tabs/explore/home")}
      />
    </View>
  )
}

export default ExploreMain