import React, {memo} from 'react';
import {View} from 'react-native';
import {Chip, List, Text} from 'react-native-paper';
import {Product} from '../../types';
import {formatDate} from '../../utils/formatDate';
import Rating from '../Rating';
import {styles} from './styles';

interface ListItemProps {
  item: Product;
  onItemPress?: (item: Product) => void;
}

const ItemLeftContent = (props: any) =>
  !props?.image ? (
    <List.Icon style={styles.leftContent} icon="image-outline" {...props} />
  ) : (
    <List.Image style={styles.leftContent} source={{uri: props?.image}} />
  );

const ItemRightContent = (props: any) => (
  <Text style={styles.rightContent}>
    {formatDate(props?.createdAt?.seconds)}
  </Text>
);

const ItemDescription = (props: any) => (
  <View>
    <Text style={styles.descriptionHeader}>{props?.description}</Text>
    <Chip style={styles.chip} textStyle={styles.chipText}>
      {props?.type}
    </Chip>
    <View style={styles.descriptionFooter}>
      <Rating value={props?.rating} />
      <Text>$ {parseFloat(props?.price).toFixed(2)}</Text>
    </View>
  </View>
);

const ListItem: React.FC<ListItemProps> = ({item, onItemPress}) => {
  const renderLeftContent = () => ItemLeftContent(item);

  const renderDescritpion = () => ItemDescription(item);

  const renderRightContent = () => ItemRightContent(item);

  const onPress = () => {
    if (onItemPress) {
      onItemPress(item);
    }

    return undefined;
  };

  return (
    <List.Item
      style={styles.container}
      key={item.id}
      left={renderLeftContent}
      title={item.title}
      description={renderDescritpion}
      right={renderRightContent}
      onPress={onPress}
    />
  );
};

export default memo(ListItem);
