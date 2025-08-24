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
    model: string;
    color: string;
    categoreID: string;
};
const sizeIcon = Platform.OS === 'web' ? { width: 20, height: 20 } : {};
const productImage = Platform.OS === 'web' ? { width: 140, height: 148 } : {};
const style = StyleSheet.create({
    heart_icon: {
        width: 10,
    },


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

const ProductCard = ({ productID, categore, price, discount, productName, productTitle, imageURL, model, color, categoreID }: DealsProdcutCardProps) => {
    return (
        <TouchableOpacity
            key={productID}
            className='w-[167] h-[282] p-1 mt-2 mr-2 mb-2 overflow-hidden'
        >
            <View className='w-[160] bg-white rounded-xl items-center flex justify-center relative z-90'>
                <Pressable
                    onPress={() => {
                        alert("hi")
                    }}
                    className='absolute top-2 right-2 w-[30px] h-[30px] rounded-xl shadow-sm items-center flex justify-center z-10'
                    style={style.shadow} >

                    <Image
                        style={sizeIcon}
                        className='w-[14] h-[14] object-fill'
                        source={require("@/assets/images/heart.png")} />
                </Pressable>
                <View className='w-[160] h-[170] rounded-xl shadow-md items-center flex justify-center z-90'
                    style={style.shadow}
                >
                    <Image
                        style={productImage}
                        className='w-[140] h-[148]'
                        source={require("@/assets/images/product.png")}
                    />
                </View>
                <View className='z-90'>
                    <Text className='font-bold text-xl'>
                        {price}
                    </Text>
                    <Text className='font-bold'>
                        {productName}
                    </Text>
                    <Text className='text-sm'>
                        Model: {model}, {color}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default ProductCard