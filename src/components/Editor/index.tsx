import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Modal, View} from 'react-native';
import {Button, HelperText, Chip, Text} from 'react-native-paper';
import {useFirestore} from '../../hooks/useFirestore';
import useImagePicker from '../../hooks/useImagePicker';
import {Product} from '../../types';
import {formatPrice} from '../../utils/formatPrice';
import {generateRandomRating} from '../../utils/generateRandomRating';
import ActionButton from '../ActionButton';
import Alert from '../Alert';
import Container from '../Container';
import Header from '../Header';
import Image from '../Image';
import Input from '../Input';
import {styles} from './styles';

interface EditorProps {
  product?: Product | null;
  onRequestClose: () => void;
}

const Editor: React.FC<EditorProps> = ({product, onRequestClose}) => {
  const {createProduct, updateProduct, deleteProduct} = useFirestore();
  const [imageUri, openCamera, openGallery] = useImagePicker();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      id: product?.id ?? '',
      title: product?.title ?? '',
      type: product?.type ?? '',
      description: product?.description ?? '',
      price: product?.price ? formatPrice(product.price) : '',
    },
  });

  const handleSave = (data: Product) => {
    const replaceAllCommas = new RegExp(',', 'g');
    const price = String(data.price).replace(replaceAllCommas, '.');

    const item = {
      ...data,
      image: imageUri ?? product?.image,
      price,
      rating: generateRandomRating(),
    };

    if (data?.id) {
      handleUpdate(item);
      return;
    }

    createProduct(item);
    onRequestClose();
  };

  const handleUpdate = (product: Product) => {
    updateProduct(product);
    onRequestClose();
  };

  const handleDelete = () => {
    const deleteItem = () => {
      if (product?.id) {
        deleteProduct(product?.id);
      }
      onRequestClose();
    };

    Alert({
      message: 'Are you sure you want to delete this product?',
      onConfirm: () => deleteItem(),
    });
  };

  const renderTitleInput = ({field: {onChange, value}}) => (
    <>
      <Input
        placeholder='Example: "Cookie"'
        label="Product name"
        onChangeText={onChange}
        value={value}
        returnKeyType="next"
      />
      {errors.title && (
        <HelperText type="error" visible>
          Inform the product name
        </HelperText>
      )}
    </>
  );

  const renderDescriptionInput = ({field: {onChange, value}}) => (
    <Input
      placeholder='Example: "A delicious cookie"'
      label="Product description"
      onChangeText={onChange}
      value={value}
      multiline
      maxLength={130}
      numberOfLines={4}
      returnKeyType="next"
    />
  );

  const renderPriceInput = ({field: {onChange, value}}) => (
    <>
      <Input
        placeholder='Example: "1.99"'
        label="Product price"
        onChangeText={onChange}
        value={value}
        keyboardType="numeric"
        returnKeyType="done"
      />
      {errors.price && (
        <HelperText type="error" visible>
          Inform the product price
        </HelperText>
      )}
    </>
  );

  const renderTypesChip = ({field: {onChange, value}}) => {
    const types = [
      {value: 'Bakery'},
      {value: 'Fruit'},
      {value: 'Dairy'},
      {value: 'Meat'},
      {value: 'Vegan'},
      {value: 'Vegetable'},
      {value: 'Other'},
    ];

    return (
      <View style={styles.container}>
        <Text>Product type</Text>
        {errors.type && (
          <HelperText type="error" visible>
            Select a product type
          </HelperText>
        )}
        <View style={styles.types}>
          {types.map(type => (
            <Chip
              key={type.value}
              style={styles.chips}
              selected={value === type.value}
              onPress={() => onChange(type.value)}>
              {type.value}
            </Chip>
          ))}
        </View>
      </View>
    );
  };

  return (
    <Modal onRequestClose={onRequestClose} animationType="slide">
      <Header
        onBackPress={onRequestClose}
        rightIcon="trash-outline"
        onRightPress={handleDelete}
      />
      <Container>
        <Image uri={imageUri ?? product?.image} onPress={openCamera} />

        <View style={styles.buttonGroup}>
          <Button
            style={styles.compactButton}
            compact
            mode="contained"
            icon="camera-outline"
            onPress={openCamera}
          />
          <Button
            style={styles.compactButton}
            compact
            mode="contained"
            icon="images-outline"
            onPress={openGallery}
          />
        </View>

        <Controller
          control={control}
          rules={{required: true}}
          render={renderTitleInput}
          name="title"
        />

        <Controller
          control={control}
          rules={{required: true}}
          render={renderTypesChip}
          name="type"
        />

        <Controller
          control={control}
          render={renderDescriptionInput}
          name="description"
        />

        <Controller
          control={control}
          rules={{required: true}}
          render={renderPriceInput}
          name="price"
        />
      </Container>

      <ActionButton icon="save-outline" onPress={handleSubmit(handleSave)} />
    </Modal>
  );
};

export default Editor;
