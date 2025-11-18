import { View,Image, Text } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'


const EmptyState = ({title,subTitle}) => (
    <View className="px-4 items-center justify-center"
    >
        <Image
            source={images.empty}
            className="w-[270px] h-[215px]"
            resizeMode='contain'     
        />
        <Text className="text-xl text-center mt-2 text-white font-psemibold">{title}</Text>
        <Text className="text-sm font-pmedium text-gray-100">{subTitle}</Text>
        <CustomButton 
            containerStyle="w-full mt-5"
            title="Create Video" 
        />
    </View>
)

export default EmptyState