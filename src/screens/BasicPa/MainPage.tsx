import React, {useEffect} from 'react';
import {View, Text, Image, Pressable, ToastAndroid} from 'react-native';
import styles from '../../styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParams, User_detail} from '../../components/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Props {
  navigation: NativeStackNavigationProp<AppStackParams, 'Open'>;
}

const MainPage: React.FC<Props> = ({navigation}) => {
  //Login process
  useEffect(() => {
    (async function (): Promise<void> {
      try {
        let loggedUserData: string | null = await AsyncStorage.getItem(
          '@loggedUser',
        );
        if (loggedUserData) {
          let users: string | null = await AsyncStorage.getItem('@users');
          if (users == null || users == '[]') {
            await AsyncStorage.removeItem('@loggedUser');
          } else {
            let usersJSON: User_detail[] | [] = JSON.parse(users);
            let particularUser: User_detail[] | [] = usersJSON.filter(
              user => user.email == loggedUserData,
            );
            if (particularUser == []) {
              await AsyncStorage.removeItem('@loggedUser');
            } else {
              navigation.navigate('Home', particularUser[0]);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <View style={styles.flexFullScreen}>
      <View style={styles.OpenTopEmptyView}></View>

      <View style={styles.OpenImgView}>
        <Image
          source={require('../../assets/pokemon-logo.png')}
          style={{width: 300, height: 330}}
        />
              </View>

      <View style={styles.OpenBottomView}>
        <View>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <View
              style={[
                styles.OpenSignupButton,
                {backgroundColor: '#6198b4', padding: 5},
                styles.ButtonShadow,
              ]}>
              <Text style={[styles.OpenText, {color: 'white'}]}>Sign Up</Text>
            </View>
          </Pressable>
        </View>
        <Text style={{fontSize:15,padding:8,fontWeight:"600"}}>Or</Text>
        <View
          style={[
            styles.OpenSignupButton,
            {backgroundColor: '#6198b4', padding: 5},
            styles.ButtonShadow,
          ]}>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <View style={styles.OpenSignupButton}>
              <Text style={[styles.OpenText, {color: 'white'}]}>Login</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MainPage;
