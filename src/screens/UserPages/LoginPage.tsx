import React, {useState} from 'react';
import { View,  Text,  Image,  TextInput,  Pressable,  ToastAndroid,} from 'react-native';
import styles from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParams, User_detail} from '../../components/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
type Props = {
  navigation: NativeStackNavigationProp<AppStackParams, 'Login'>;
};

const LoginPage: React.FC<Props> = ({navigation}) => {
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [passwordMask, setPasswordMask] = useState<boolean>(true);

  const authenticateUser = async (): Promise<void> => {
    let users: string | null = await AsyncStorage.getItem('@users');
    if (users == null || users == '[]') {
      ToastAndroid.showWithGravity(
        'User does not match!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      let usersJSON: User_detail[] | [] = JSON.parse(users);
      let particularUser: User_detail[] | [] = usersJSON.filter(
        user => user.email == inputEmail,
      );
      if (particularUser.length === 0) {
        ToastAndroid.showWithGravity(
          'Email or Password are Invalid!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } else {
        if (particularUser[0].password === inputPassword) {
          ToastAndroid.showWithGravity(
            'User Logged In successfully!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          await AsyncStorage.setItem('@loggedUser', inputEmail);
                 navigation.reset({
            index: 0,
            routes: [{name: 'Home', params: particularUser[0]}],
          });
        } else {
          ToastAndroid.showWithGravity(
            'Invalid Email or Password !',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      }
    }
  };

  return (
    <View style={styles.flexFullScreen}>
    <View style={{width:300, height:200, left:60,top:30}}>
      <Image  style={{width: '100%', height: '100%'}}
        source={require('../../assets/login-img.png')} 
      />
      </View>

      <View style={styles.SignUpBottomView}>
        <View style={styles.InputField}>
          <View>
            <Icon name="email" size={18} color="black" />
          </View>
          <TextInput
            style={styles.TextInputField}
            placeholder="Enter Your Email"
            onChangeText={setInputEmail}
          />
        </View>

        <View style={styles.InputField}>
          <View>
            <Icon2 name="key" size={18} color="black" />
          </View>
          <TextInput
            style={styles.TextInputField}
            placeholder="Enter Your Password"
            onChangeText={setInputPassword}
            secureTextEntry={passwordMask}
          />
         </View>

        <Pressable
          onPress={authenticateUser}
          style={[
            styles.OpenSignupButton,
            {backgroundColor: '#6198b4', marginTop: 20},
            styles.ButtonShadow,
          ]}>
          <Text style={[styles.OpenText, {color: 'white'}]}>Log In</Text>
        </Pressable>

        <View style={styles.DontLink}>
          <Text>Don't have an account? </Text>
          <Pressable onPress={(): void => navigation.navigate('SignUp')}>
            <Text style={{color: 'red'}}>create here</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.BackButton}>
        <Icon
          name="arrow-back"
          color={'black'}
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
    </View>
  );
};

export default LoginPage;
