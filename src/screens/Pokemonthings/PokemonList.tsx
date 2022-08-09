import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParams} from '../../components/types';
import {RouteProp} from '@react-navigation/native';
import Card from '../../components/PokemonCard';
import styles from '../../styles';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux/middleware';
import {fetchListOfPokemons} from '../../redux/sagaSlice';
import {PokemonList} from '../../redux/sagaSlice';

//Navigate to home page fro, type
export type Props = {
  navigation: NativeStackNavigationProp<AppStackParams, 'Home'>;
  route: RouteProp<AppStackParams, 'Home'>;
};

const IndexPage: React.FC<Props> = ({navigation, route}) => {
  const [data, setData] = useState<PokemonList>();
    useState<NodeJS.Timeout | null>();
  const dispatch = useDispatch();

  //fetch pokemon details
  useEffect(() => {
    dispatch(fetchListOfPokemons());
  }, []);


  //logout
  async function LogoutTheUser(): Promise<void> {
    try {
      await AsyncStorage.removeItem('@loggedUser');
      navigation.navigate('Open');
    } catch (error) {
      ToastAndroid.showWithGravity(
        'Error while Logging Out!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }

  return (
    <View style={{backgroundColor:'#bddae8'}}>
      <View style={styles.HomeHeaderHead}>
        <View style={styles.HomeHeader}>
          <Text style={{color: '#316a87', fontSize: 16}}>Pokemon List</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
          <Text onPress={LogoutTheUser} style={{color: '#316a87', fontSize: 14}}>Logout</Text>

          </View>
        </View>
          </View>

      <FlatList
        data={data}
        numColumns={3}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', marginTop: 150, fontSize: 20}}>
           No Pokemons Found!
          </Text>
        )}
        renderItem={({item, index}) => (
          <Card item={item} index={index} navigation={navigation} />
        )}
        style={{marginHorizontal: 5}}
        showsVerticalScrollIndicator={false}
      
        ListFooterComponent={(): any => <View style={{height: 100}}></View>}
      />
    </View>
  );
};

export default IndexPage;
