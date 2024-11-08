import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { routes } from '@/store/routes.store'
import { Link } from 'expo-router'

const RouteScreen = () => {
    return (
        <View className='flex flex-1 px-4'>
            <FlatList
                data={routes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className='mt-10'>
                        <Text className='text-2xl font-work-regular'>{item.title}</Text>
                        <Text className=''>{item.description}</Text>
                        <View className='flex flex-row justify-between mt-2'>
                            <Link href={`/tabs/(stack)/routes/${item.id}`} className='text-primary'>
                                Ver Detalles
                            </Link>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default RouteScreen