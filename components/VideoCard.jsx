import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons, images } from '../constants'
import { useState } from 'react'

const VideoCard = ({videoData:{title,thumbnail,video,creator:{username,avatar}}}) => {

    const [playing, setPlaying] = useState(false);
  return (
    <View
        className="flex-col items-center px-4 mb-14"
    >

        <View className="flex-row gap-3 items-start">
            <View className="flex-row justify-center items-center flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                    <Image 
                        source={{ uri:avatar }}
                        resizeMode='cover'
                        className="w-full h-full rounded-md"
                    />
                </View>
                <View className="flex-1 ml-3 justify-center gap-y-1">
                    <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
                        {title}
                    </Text>
                    <Text className="text-xs font-pregular text-gray-100 " numberOfLines={1}>
                        {username}
                    </Text>
                </View>
            </View>
            
            {/* Menu image */}
            <View className="pt-2">
                <Image
                    source={icons.menu}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </View>
        </View>
        {/* FINALLY THE THUMBNAIL OF THE VIDEO/ THE VIDEO ITSELF */}

            {
                // ternary statement to show either playing video or thumbnail
                playing?
                (
                    <Text>Playing</Text>
                )
                :
                (
                    <TouchableOpacity
                        className="w-full h-60 rounded-xl mt-3 relative  justify-center items-center"
                        activeOpacity={0.7}
                        onPress={()=> setPlaying(true)}
                    >
                        <Image
                            source={{uri:thumbnail}}
                            className="w-full h-full rounded-xl mt-3"
                            resizeMode='cover'
                        />
                        <Image
                            source={icons.play}
                            className="w-12 h-12 absolute"
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )
            }


    </View>
  )
}

export default VideoCard