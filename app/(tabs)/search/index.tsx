import React from 'react'
import { View, Text, Button, TextInput, ScrollView, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { Link, useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useProducts } from '@/utils/context/ProductContext';

const style = StyleSheet.create({
  shadow: {
    backgroundColor: '#FFFFFF',
    ...Platform.select({
      ios: {
        // shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      // Thuộc tính shadow cho Android
      android: {
        elevation: 5,
      },
    }),
  }
});


export default function browsePage() {
  const { products, categores, loading } = useProducts();
  const [text, onChangeText] = React.useState('');
  const router = useRouter();

  const handleClickListProp = (categoreID: string) => {
    router.navigate({
      pathname: '/search/[categoreID]',
      params: { categoreID: categoreID }
    })
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className='w-full h-full items-center p-4 py-10 bg-white'>
          <View className='w-full h-[56] flex flex-row bg-[#EFEEEC] items-center px-4 rounded-xl'
            style={style.shadow}>
            <TextInput
              className='flex-1 rounded-xl px-2'
              value={text}
              onChangeText={onChangeText}
              placeholder='Search'
              style={{ color: '#828C95' }}
            />
            <Ionicons name="search" size={24} color="#555" />
          </View>

          <ScrollView className='w-full mt-2 px-1'>
            {categores.map((categore) => (
              categore.categoreID != "1" ? 
              <TouchableOpacity key={categore.categoreID}
                onPress={() => handleClickListProp(categore.categoreID)}
                className='w-full h-[36] mt-7 flex flex-row justify-between border-b-[1px]'>
                <Text className='font-bold'>{categore.categoreName}</Text>
                <Ionicons name="chevron-forward" size={24} color="black" />
              </TouchableOpacity> : ""
            ))}
          </ScrollView>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  )
}
