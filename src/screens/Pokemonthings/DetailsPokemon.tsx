import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import { View, Text, Image, FlatList, Dimensions, ScrollView,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../../styles';
import {AppStackParams} from '../../components/types';
import {ProgressChart} from 'react-native-chart-kit';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPokemonDetails} from '../../redux/sagaSlice';
import {RootState} from '../../redux/middleware';

type TextProps = {
  ability: string;
};

const DetailsText: React.FC<TextProps> = ({ability}) => {
 
  return (
    <Text style={[styles.FillText, {backgroundColor: '#6097b3'}]}>
      {ability}
    </Text>
  );
};

type Props = {
  navigation: NativeStackNavigationProp<AppStackParams, 'Details'>;
  route: RouteProp<AppStackParams, 'Details'>;
};

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Moves = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: any[];
};

export type BasicDetails = {
  height: number;
  weight: number;
  experience: number;
  abilities: string[];
  moves: string[];
  stats: number[];
  progressStats: number[];
};

const DetailsPokemon: React.FC<Props> = ({navigation, route}) => {
  const basicDetails = useSelector(
    (state: RootState) => state.pokemon.pokemonDetails,
  );
  const dispatch = useDispatch();

  useEffect((): void => {
    dispatch(fetchPokemonDetails(route.params.index));
  }, []);

  return (
    <View style={[styles.flexFullScreen, {backgroundColor: '#cdeaf8'}]}>
      <View style={[styles.DetailsTopView, {backgroundColor: '#cdeaf8'}]}>
        <View style={[styles.DetailsHeader, {justifyContent: 'space-between'}]}>
          <View style={styles.DetailsHeader}>
            <Icon
              name="arrow-back"
              color="#1b4f69"
              size={20}
              onPress={() => navigation.goBack()}
            />
            <View>
              <Text
                style={{fontSize: 20, color: '#1b4f69', marginHorizontal: 10}}>
                {route.params.name}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.DetailsImgView}>
          <Image
            source={{uri: route.params.imgUrl}}
            style={{height: 180, width: 180, overflow: 'visible'}}
          />
        </View>
      </View>
      <ScrollView style={styles.DetailsBottomView}>
        <View style={styles.DetailView1}>
          <Text style={{color: '#1b4f69', fontSize: 20}}>About</Text>
        </View>

        <View style={styles.DetailView3}>
          <Text style={{color: '#1b4f69', fontSize: 17}}>Abilities :</Text>
          <FlatList
            data={basicDetails?.abilities}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => <DetailsText ability={item} />}
          />
        </View>
        <View style={styles.DetailView5}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text style={{fontSize: 17}}>Pie Chart</Text>
          </View>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <ProgressChart
              style={{marginVertical: 10}}
              data={{
                labels: ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'],
                data: basicDetails?.progressStats,
              }}
              width={Dimensions.get('window').width - 10}
              height={180}
              strokeWidth={7}
              radius={35}
              chartConfig={{
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                color: (opacity = 1) => `rgba(0, 120, 120, ${opacity})`,
                strokeWidth: 4,
                barPercentage: 0.7,
              }}
              hideLegend={false}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsPokemon;
