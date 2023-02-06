import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useEffect, useState} from 'react';
import Alert from '../components/Alert';
import {Product} from '../types';
import uuid from 'react-native-uuid';

export const useFirestore = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = firestore()
      .collection('products')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const products: Product[] = [];
        querySnapshot.forEach(doc => products.push(doc.data()));
        setProducts(products);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const uploadImage = async (id: string, image: string) => {
    try {
      const reference = storage().ref(`products/images/${id}/image`);
      const task = reference.putFile(image);
      const fullPath = await task.then(res => res.metadata.fullPath);
      const url = await storage().ref(fullPath).getDownloadURL();
      return url;
    } catch (error) {
      Alert({message: error.message});
    }
  };

  const createProduct = async (product: Product) => {
    try {
      const id = uuid.v4() as string;

      await firestore()
        .collection('products')
        .doc(id)
        .set({
          ...product,
          id,
          image: '',
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      if (product?.image) {
        const url = await uploadImage(id, product.image);
        await firestore().collection('products').doc(id).update({
          image: url,
        });
      }
    } catch (error) {
      Alert({message: error.message});
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      if (product?.image && !product.image.startsWith('http')) {
        const url = await uploadImage(product.id, product.image);
        await firestore().collection('products').doc(product.id).update({
          image: url,
        });
        product.image = url;
      }

      await firestore()
        .collection('products')
        .doc(product.id)
        .update({
          ...product,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      Alert({message: error.message});
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await firestore().collection('products').doc(id).delete();

      Alert({message: 'The product has been deleted successfully'});
    } catch (error) {
      Alert({message: error.message});
    }
  };

  return {
    loading,
    products,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
