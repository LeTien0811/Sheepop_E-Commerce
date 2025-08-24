import React, { createContext, useContext, useEffect, useState } from 'react'
import {ProductInterface, CategoresInterface} from '@/types/type'
const ProductData = [
    { productID: '1', categore: 'Microphones', price: 19999, discount: 45.6, productName: 'Rode PodMic', productTitle: 'Dynamic microphone, Speaker microphone', imageURL: 'https://res.cloudinary.com/dsrrik0wb/image/upload/v1747666582/fbrxyqegzmjy8uqtukl4.jpg', model: "WH-1000XM4", color: "Black", categoreID: '2' },
    { productID: '2', categore: 'HeadPhones', price: 19999, discount: 45.6, productName: 'Rode PodMic', productTitle: 'Dynamic microphone, Speaker microphone', imageURL: 'https://res.cloudinary.com/dsrrik0wb/image/upload/v1747666582/fbrxyqegzmjy8uqtukl4.jpg', model: "WH-1000XM4", color: "Black", categoreID: '3' },
    { productID: '3', categore: 'Laptop', price: 19999, discount: 45.6, productName: 'Rode PodMic', productTitle: 'Dynamic microphone, Speaker microphone', imageURL: 'https://res.cloudinary.com/dsrrik0wb/image/upload/v1747666582/fbrxyqegzmjy8uqtukl4.jpg', model: "WH-1000XM4", color: "Black", categoreID: '2' },
    { productID: '4', categore: 'Smart Phone', price: 19999, discount: 45.6, productName: 'Rode PodMic', productTitle: 'Dynamic microphone, Speaker microphone', imageURL: 'https://res.cloudinary.com/dsrrik0wb/image/upload/v1747666582/fbrxyqegzmjy8uqtukl4.jpg', model: "WH-1000XM4", color: "Black", categoreID: '2' },
    { productID: '5', categore: 'Microphones', price: 19999, discount: 45.6, productName: 'Rode PodMic', productTitle: 'Dynamic microphone, Speaker microphone', imageURL: 'https://res.cloudinary.com/dsrrik0wb/image/upload/v1747666582/fbrxyqegzmjy8uqtukl4.jpg', model: "WH-1000XM4", color: "Black", categoreID: '4' },
    { productID: '6', categore: 'HeadPhones', price: 19999, discount: 45.6, productName: 'Rode PodMic', productTitle: 'Dynamic microphone, Speaker microphone', imageURL: 'https://res.cloudinary.com/dsrrik0wb/image/upload/v1747666582/fbrxyqegzmjy8uqtukl4.jpg', model: "WH-1000XM4", color: "Black", categoreID: '4' },
    { productID: '7', categore: 'Laptop', price: 19999, discount: 45.6, productName: 'Rode PodMic', productTitle: 'Dynamic microphone, Speaker microphone', imageURL: 'https://res.cloudinary.com/dsrrik0wb/image/upload/v1747666582/fbrxyqegzmjy8uqtukl4.jpg', model: "WH-1000XM4", color: "Black", categoreID: '3' },
    { productID: '8', categore: 'Smart Phone', price: 19999, discount: 0, productName: 'Rode PodMic', productTitle: 'Dynamic microphone, Speaker microphone', imageURL: 'https://res.cloudinary.com/dsrrik0wb/image/upload/v1747666582/fbrxyqegzmjy8uqtukl4.jpg', model: "WH-1000XM4", color: "Black", categoreID: '5' },
    { productID: '9', categore: 'Microphones', price: 19999, discount: 0, productName: 'Rode PodMic', productTitle: 'Dynamic microphone, Speaker microphone', imageURL: 'https://res.cloudinary.com/dsrrik0wb/image/upload/v1747666582/fbrxyqegzmjy8uqtukl4.jpg', model: "WH-1000XM4", color: "Black", categoreID: '5' },
    { productID: '10', categore: 'HeadPhones', price: 19999, discount: 0, productName: 'Rode PodMic', productTitle: 'Dynamic microphone, Speaker microphone', imageURL: 'https://res.cloudinary.com/dsrrik0wb/image/upload/v1747666582/fbrxyqegzmjy8uqtukl4.jpg', model: "WH-1000XM4", color: "Black", categoreID: '6' },
    { productID: '11', categore: 'Laptop', price: 19999, discount: 0, productName: 'Rode PodMic', productTitle: 'Dynamic microphone, Speaker microphone', imageURL: 'https://res.cloudinary.com/dsrrik0wb/image/upload/v1747666582/fbrxyqegzmjy8uqtukl4.jpg', model: "WH-1000XM4", color: "Black", categoreID: '2' },
    { productID: '12', categore: 'Smart Phone', price: 19999, discount: 0, productName: 'Rode PodMic', productTitle: 'Dynamic microphone, Speaker microphone', imageURL: 'https://res.cloudinary.com/dsrrik0wb/image/upload/v1747666582/fbrxyqegzmjy8uqtukl4.jpg', model: "WH-1000XM4", color: "Black", categoreID: '2' },
]

const CategoresProductData = [
    { categoreID: '1', categoreName: 'All', for: "" },
    { categoreID: '2', categoreName: 'Smart Phone', for: "product" },
    { categoreID: '3', categoreName: 'Laptop', for: "product" },
    { categoreID: '4', categoreName: 'Computer', for: "product" },
    { categoreID: '5', categoreName: 'Mens Fashion', for: "product" },
    { categoreID: '6', categoreName: 'Womens Fashion', for: "product" },
    { categoreID: '7', categoreName: 'Dell', for: "brand" },
    { categoreID: '8', categoreName: 'Havit', for: "brand" },
    { categoreID: '9', categoreName: 'Acer', for: "brand" },
]

interface ProductContextType {
    products: ProductInterface[];
    categores: CategoresInterface[];
    loading: boolean;
    //   fetchProducts: () => void;
}
const defaultValue: ProductContextType = {
    products: [],
    categores: [],
    loading: false,
    //   fetchProducts: () => {},
};
const ProductContext = createContext<ProductContextType>(defaultValue);

interface ProductProviderProps {
    children: React.ReactNode;
}
export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {

    const [products, setProduct] = useState<ProductInterface[]>([]);
    const [categores, setCategore] = useState<CategoresInterface[]>([]);
    const [loading, setLoading] = useState(true);

    //   cal API
    //   const fetchProducts = async () => {
    //     try {
    //       setLoading(true);
    //       const response = await fetch('https://api.example.com/products'); 
    //       const data = await response.json();
    //       setProducts(data);
    //     } catch (error) {
    //       console.error('Failed to fetch products:', error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    useEffect(() => {
        setLoading(true);
        setProduct(ProductData);
        setCategore(CategoresProductData);
        setLoading(false);
    }, [])

    return (
        <ProductContext.Provider value={{ products, categores, loading }}>
            {children}
        </ProductContext.Provider>
        //**, fetchProducts *//
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
}