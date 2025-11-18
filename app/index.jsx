import {StatusBar} from "expo-status-bar"
import {ScrollView, Text, View,Image } from  'react-native'
import {router,Redirect} from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context"
import {images} from '../constants'
import CustomButton from "../components/CustomButton"
import {useGlobalContext} from '../context/GlobalProvider'


export default function app(){

    const {isLoading,isLoggedIn}=useGlobalContext();

    if(!isLoading && isLoggedIn) return <Redirect href="/home"/>
    return(
       <SafeAreaView 
        className="bg-primary h-full">
            <ScrollView
                contentContainerStyle={{
                    height:'100%',
                }}
            >
                <View className="w-full flex items-center justify-center h-full px-4">
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode="contain"
                    />
                    <Image
                        className="max-w-[380px] w-full h-[300px]"
                        source={images.cards}
                        resizeMode="contain"
                    />
                    <View
                        className="relative mt-5"
                    >
                        <Text className="text-white text-3xl text-center font-bold"
                            
                        >
                            Discover Endless Possibilities with 
                            <Text className="text-secondary-200"> Aora</Text>
                        </Text>
                        <Image
                            source={images.path}
                            className="w-[126px] -right-8 -bottom-2 absolute h-[15px]"
                            resizeMode="contain"
                        />
                    </View>


                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
                        Where creativity meets innovation: embark on a journey of limitless exploration with Aora.
                    </Text>


                    <CustomButton 
                        handlePress={()=>router.push('/sign-in')}
                        containerStyle="w-full mt-7"
                        title="Continue  with Email"
                    />
                </View>
                
            </ScrollView>
            <StatusBar
                    backgroundColor="#161622" style="light"
                />
       </SafeAreaView>
    )
}