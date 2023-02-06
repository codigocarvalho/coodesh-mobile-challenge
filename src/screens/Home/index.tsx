import React, {Fragment, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import Header from '../../components/Header';
import {FlashList} from '@shopify/flash-list';
import Input from '../../components/Input';
import ListItem from '../../components/ListItem';
import ActionButton from '../../components/ActionButton';
import Editor from '../../components/Editor';
import {ActivityIndicator} from 'react-native-paper';
import EmptyState from '../../components/EmptyState';
import {useFirestore} from '../../hooks/useFirestore';

const Home = () => {
  const {loading, products} = useFirestore();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [product, setProduct] = useState(null);
  const [modalEditor, setModalEditor] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (modalEditor === false) {
      setProduct(null);
    }
  }, [modalEditor]);

  const searchProduct = (text: string) => {
    if (!text) {
      Keyboard.dismiss();
      setFilteredProducts(products);
      setSearchText('');
      return;
    }

    const filter = products.filter(product => {
      const regex = new RegExp(text, 'gi');
      return product.title.match(regex);
    });

    setFilteredProducts(filter);
    setSearchText(text);
  };

  const handleEditor = () => {
    setModalEditor(!modalEditor);
  };

  const onItemPress = (item: any) => {
    setProduct(item);
    handleEditor();
  };

  const renderItem = ({item}: any) => (
    <ListItem item={item} onItemPress={onItemPress} />
  );

  return (
    <Fragment>
      <Header />

      <Input
        searchIcon
        label="Search"
        returnKeyType="search"
        placeholder="Product name"
        onChangeText={searchProduct}
        onEndEditing={Keyboard.dismiss}
      />

      <FlashList
        data={filteredProducts}
        renderItem={renderItem}
        estimatedItemSize={50}
        keyboardShouldPersistTaps="always"
        ListHeaderComponent={loading && <ActivityIndicator />}
        ListEmptyComponent={
          !loading && (
            <EmptyState searchText={searchText} onPress={handleEditor} />
          )
        }
      />

      <ActionButton icon="add" onPress={handleEditor} />

      {modalEditor && (
        <Editor product={product} onRequestClose={handleEditor} />
      )}
    </Fragment>
  );
};

export default Home;
