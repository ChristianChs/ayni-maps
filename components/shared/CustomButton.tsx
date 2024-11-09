import { View, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'

interface Props extends PressableProps {
    children: string;
    color?:string;
}

const CustomButton = ({ children, color,  onPress }: Props) => {
    return (
        <Pressable
        onPress={onPress}
        className={`p-3 rounded-md`}
        style={{backgroundColor:color}}
        >
            <Text
            className='text-white'
            >{children}</Text>
        </Pressable>
    )
}

export default CustomButton