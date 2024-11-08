import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { routes } from '@/store/routes.store';

const RouteScreenId = () => {

    const { id } = useLocalSearchParams();
    const route = routes.find(r => r.id === id);
    if(!route){
        return <Redirect href='/'/>
    }
    return (
        <View className='px-5 mt-10'>
            <Text className='font-work-regular text-2xl'>{route.title}</Text>
            <Text>{route.description}</Text>
            <Text>{route.price}</Text>
        </View>
    )
}

export default RouteScreenId