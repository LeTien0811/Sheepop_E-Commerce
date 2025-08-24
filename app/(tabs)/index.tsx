import React from 'react'
import { useState, useEffect } from 'react'
import { View, Text, ScrollView, FlatList, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent, ActivityIndicator, Platform } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import DealsProductCard from '@/components/product/DealsProductCard'
import ProductCard from '@/components/product/ProductCard'
import { useProducts } from '@/utils/context/ProductContext'
import { ProductInterface, CategoresInterface } from '@/types/type'


const ITEM_WIDTH = 337 + 12;

function homePage() {
  const { products, categores, loading } = useProducts();
  const [Carousel, setCarousel] = useState<ProductInterface[]>([])
  const [ActiveCarousel, setActiveCarousel] = useState({ id: '' })
  const [isActiveCategore, setActiveCategore] = useState("1");

  useEffect(() => {
    if (products && products.length > 0) {
      const filterDeals = products.filter(product => product.discount > 0);
      setCarousel(filterDeals);
      if (filterDeals.length > 0) {
        setActiveCarousel({ id: filterDeals[0].productID });
      }
    }
  }, [products]);

  const handleScrollDealsProduct = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(xOffset / ITEM_WIDTH)
    if (Carousel[index]) {
      setActiveCarousel((prevState) => ({
        ...prevState,
        id: Carousel[index].productID
      }))
    }
  }

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
      categoreID={item.color} />
  );

  const isWeb = Platform.OS === 'web' ? true : false;
  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className='flex-1 justify-center items-center'>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className='mt-4'>Đang tải dữ liệu...</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className='w-full h-screen bg-white flex'>
          <View className='w-full p-4'>
            <Text className='text-3xl font-bold'>Hello Michael</Text>
          </View>

          <View className='w-full p-4'>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}

            >
              {categores.map((categore) => (
                categore.for == "product" ?
                  <TouchableOpacity
                    key={categore.categoreID}
                    className='flex mr-5'>
                    {isActiveCategore === categore.categoreID ?
                      (<Text className='font-bold border-b-2'>
                        {categore.categoreName}
                      </Text>)
                      :
                      (<Text className='font-light'>
                        {categore.categoreName}
                      </Text>)
                    }
                  </TouchableOpacity> : ""
              ))}
            </ScrollView>
          </View>

          <View className='w-full flex justify-center p-4 py-3 gap-2'>
            <View className='w-full flex flex-row justify-between'>
              <Text className='font-bold text-2xl'>
                Deals of the day
              </Text>

              <Text className='font-light'>
                see all
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              snapToInterval={337 + 12} // Chiều rộng card + khoảng cách (marginRight)
              decelerationRate="fast"
              className={`w-full p-1 py-2 ${isWeb ? '' : ''}`}
              onScroll={handleScrollDealsProduct}
            >
              {Carousel.map((product) => (
                <DealsProductCard
                  key={product.productID}
                  productID={product.productID}
                  categore={product.categore}
                  price={product.price}
                  discount={product.discount}
                  productName={product.productName}
                  productTitle={product.productTitle}
                  imageURL={product.imageURL}
                />
              ))}
            </ScrollView>

            <View className='w-full flex flex-row justify-center items-center gap-2'>
              {Carousel.map((product) => (
                <View key={product.productID} className={`${ActiveCarousel && ActiveCarousel.id === product.productID ? 'bg-[#212429] w-10' : 'bg-[#868D94] w-4'} rounded-lg h-2`}>
                  <Text> </Text>
                </View>
              ))}
            </View>
          </View>

          <View className='p-4 w-full '>
            <Text className='font-bold text-2xl'>
              Recommended for you See all
            </Text>
            <View
              className='w-full h-[600] flex items-center justify-center'>
              <FlatList
                className='h-full'
                data={products}
                renderItem={renderProductCard}
                keyExtractor={(item) => item.productID}
                numColumns={isWeb ? 3 : 2}
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
              />
              {/* <ScrollView
                className='h-full'>
                {products.map((item) => (
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
                    categoreID={item.color}
                  />
                ))}
              </ScrollView> */}
            </View>
          </View>

        </View>

      </SafeAreaView>
    </SafeAreaProvider >
  );
}

export default homePage