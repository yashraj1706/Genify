import { View,Image, Text, FlatList, RefreshControl, Alert } from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import React, { useEffect } from 'react'
import {images} from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import VideoCard from '../../components/VideoCard'
import { useState } from 'react'
import {getAllPosts,getCurrentUser,getLatestPosts} from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'

const Home = () => {
  const {data:posts,refetch}=useAppwrite(getAllPosts);
  const {data:latestPosts}=useAppwrite(getLatestPosts);
  const {data:userData}=useAppwrite(getCurrentUser);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh=async()=>{
    setRefreshing(true);

    // CALL THE NEW VIDEOS FROM THE BACKEND
    await refetch();

    setRefreshing(false);
  }



  return (
    <SafeAreaView className="bg-primary h-full"
      
    >
      <FlatList
        data={posts}
        
        keyExtractor={(item)=> item.$id}

        renderItem={({item})=>(
          <VideoCard
            videoData={item}
          />
        )}
        ListHeaderComponent={()=>(
          <View className="my-6 px-4 space-y-6">
            <View className="flex-row mb-6 items-start justify-between">
              <View className="">
                <Text className="text-sm font-pmedium text-gray-100">Welcome Back</Text>
                <Text className="text-2xl text-white font-psemibold">{userData.username}</Text>
              </View>
              <View className="mt-1.5">
                <Image 
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>
            <SearchInput 
              placeholder="Search for a video topic" 
            />

            <View className="w-full flex-1  pt-5 pb-8">
              <Text className="font-pregular text-gray-100 text-lg mb-3">
                Latest Videos
              </Text>
              <Trending posts={latestPosts ?? [] }/>
            </View>

          </View>)}

          ListEmptyComponent={()=>(
            <EmptyState
              title="No Videos Found"
              subTitle="Be the first one to upload a video"
            />
          )}

          refreshControl={
            <RefreshControl 
              onRefresh={onRefresh}
              refreshing={refreshing}

            />
          }
      />
    </SafeAreaView>
  )
}

export default Home