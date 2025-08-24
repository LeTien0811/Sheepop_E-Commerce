import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, ScrollView, FlatList, StyleSheet, Platform, TouchableOpacity, Pressable } from 'react-native'
import { useLocalSearchParams, Link, router, useRouter } from 'expo-router'
import { useProducts } from '@/utils/context/ProductContext';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '@/components/product/ProductCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ProductInterface, CategoresInterface } from '@/types/type';
export default function browseSearch() {
  const { categoreID } = useLocalSearchParams();
  const { products, categores, loading } = useProducts();
  const [product, setProduct] = useState<ProductInterface[]>([]);
  const [categore, setCategore] = useState<CategoresInterface>();
  const router = useRouter();

  useEffect(() => {
    const list = products.filter(prev => prev.categoreID === categoreID)
    const CategoreName = categores.find(prev => prev.categoreID === categoreID)
    setCategore(CategoreName);
    setProduct(list);
  }, [])

  const renderProductCard = ({ item }: { item: ProductInterface }) => (
    <ProductCard
      key={item.productID}
      productID={item.productID}
      categore={item.categore}
      price={item.price}
      discount={item.discount}
      productName={item.productName}
      productTitle={item.productTitle}
      imageURL={item.imageURL}
      model={item.model}
      color={item.color}
      categoreID={item.categoreID}
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className='w-full h-screen items-center p-4 py-10 bg-white'>
          <View className='w-full flex flex-row justify-between'>
            <Pressable onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="black" />
            </Pressable>

            <Text className='font-bold text-xl'>
              {!categore ? "Categore Name" : categore.categoreName}
            </Text>
            <Ionicons name="search" size={24} color="#555" />
          </View>

          <View>
            

          </View>

          <FlatList
            data={product}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.productID}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
