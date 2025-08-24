import { Background } from '@react-navigation/elements';
import React from 'react'

import { View, Text, Image, ScrollView, TouchableOpacity, Platform, StyleSheet, Pressable } from 'react-native'

type DealsProdcutCardProps = {
  productID?: string | number;
  categore: string;
  price: number;
  discount: number;
  productName: string;
  productTitle: string;
  imageURL: string;
};

const styles = StyleSheet.create({
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
const sizeIcon = Platform.OS === 'web' ? { width: 20, height: 20 } : {};
const productImage = Platform.OS === 'web' ? { width: 140, height: 148 } : {};
const productCard = Platform.OS === 'web' ?  true  : false;

const DealsProductCard = ({ productID, categore, price, discount, productName, productTitle, imageURL }: DealsProdcutCardProps) => {
  const finalPrice = price - (price * (discount / 100))
  return (
    <TouchableOpacity
      style={styles.shadow}
      className={`${productCard ? '' : 'w-[335] h-[170] '} mr-4 rounded-xl shadow-md overflow-hidden flex flex-col text-wrap p-2`}

    >
      <View className='w-full relative'>
        <Pressable
          onPress={() => {
            alert("hi")
          }}
          className='absolute right-0 w-[30] h-[30] shadow-md rounded-xl items-center flex justify-center z-100'
          style={styles.shadow} >
          <Image
            style={sizeIcon}
            className='w-[14] h-[14] object-fill'
            source={require("@/assets/images/heart.png")} />
        </Pressable>
      </View>

      <View className='w-full flex flex-row overflow-hidden text-wrap z-90'>
        <View
          className="w-1/2 overflow-hidden">
          <Image
            style={productImage}
            className='w-[160] h-[170] '
            source={require('@/assets/images/product.png')} />
        </View>
        <View className='w-1/2 antialiased text-wrap items-start flex justify-center px-2'>
          <Text className="antialiased font-bold">
            {categore}
          </Text>

          {discount > 0 ?
            (<View className='w-full flex flex-row'>
              <Text className='text-red-600 font-bold'> {finalPrice} </Text>
              <Text className='line-through font-bold text-[#B0B5B9]'> {price} </Text>
            </View>) :
            (<View>
              <Text >
                {price}
              </Text>
            </View>)}
          <Text className='text-black text-xl font-bold'>
            {productName}
          </Text>
          <Text className='font-bold text-gray-600'>
            {productTitle}
          </Text>
        </View>
      </View>

    </TouchableOpacity>
  )

};

export default DealsProductCard;