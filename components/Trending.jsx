import { View,Image, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import { Video, ResizeMode } from 'expo-av'


//Declaring states for the animation prop
const zoomIn={
  0:{
    scale:0.9
  },
  1:{
    scale:1.1
  }
}
//second animation: it will start from a state of 1 and thenn coz its zoom out it will become smaller(0.9)
const zoomOut={
  0:{
    scale:1.1
  },
  1:{
    scale:0.9
  }
}


const TrendingVideo=({activeItem,item})=>{
  const [playing,setPlaying]=useState(false);
  const videoRef = React.useRef(null);
  return(
    <Animatable.View
      className="mr-5"
      animation={activeItem===item.$id ? zoomIn : zoomOut }
      duration={1000}
    >
        {
          playing?
          (<Video
            ref={videoRef}
            source={{ uri: item.video }}
            //className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
            style={{ width: 208, height: 288, borderRadius: 35, marginTop: 12, backgroundColor: 'rgba(255,255,255,0.1)' }}  // Replace className with style
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={(status) => {
              if (status.didJustFinish) {
                setPlaying(false);
              }
            }}
          />)
          :
          (<TouchableOpacity
            className="relative justify-center items-center"
            activeOpacity={0.7}
            onPress={()=>setPlaying(true)}
          >
            <ImageBackground
              source={{uri:item.thumbnail}}
              className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            />
            <Image
              source={icons.play}
              className="w-12 h-12 absolute"
              resizeMode='contain'
            />
          </TouchableOpacity>)
        }

    </Animatable.View>
  )
}

const Trending = ({posts}) => {
  const [activeItem,setActiveItem]=useState(posts[1]);// setting the active item as the first post that our query returns


    //function to change the idfc its new to me, it changes the state of the viewable items and jo bhi viewabke item hoga sirf usko hi ye code will make enlarged and set as the active item,
    const viewableItemsChanged=({viewableItems})=>{
      console.log("Viewable items::::::::::::::::::::::::",viewableItems)
      if(viewableItems.length>0){
        setActiveItem(viewableItems[0].key)
      }
    }
  return (
    <FlatList 
        data={posts}
        keyExtractor={(item)=> item.$id}
        renderItem={({item})=>(
          <TrendingVideo 
            activeItem={activeItem}
            item={item}
          />  
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold:70
        }}
        ListHeaderComponent={()=>(<View className="w-4"></View>)}
        contentOffset={{x:186}}
        horizontal
        className=""
        />
  )
}

export default Trending