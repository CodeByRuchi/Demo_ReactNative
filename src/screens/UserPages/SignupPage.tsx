import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ToastAndroid,
} from 'react-native';
import styles from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppStackParams, User_detail} from '../../components/types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

export interface Props {
  navigation: NativeStackNavigationProp<AppStackParams, 'SignUp'>;
}

const SignupPage: React.FC<Props> = ({navigation}) => {
  const [inputName, setInputName] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [passwordMask, setPasswordMask] = useState<boolean>(true);

  //Validation
  let validateUser = (): boolean => {
    if (inputName.length <= 2) {
      ToastAndroid.showWithGravity(
        'Name should be greater than 2 characters',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return false;
    } else if (!inputEmail.includes('@gmail.com')) {
      ToastAndroid.showWithGravity(
        'Invalid Email',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return false;
    } else if (inputPassword.length <= 5) {
      ToastAndroid.showWithGravity(
        'Password should be grater than 5 characters',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      return false;
    } else {
      return true;
    }
  };

  let registerUser = async (): Promise<void> => {
    if (validateUser()) {
      try {
        let users: string | null = await AsyncStorage.getItem('@users');
        if (users == null) {
          let newUsers: User_detail[] = [
            {
              name: inputName,
              email: inputEmail,
              password: inputPassword,
            },
          ];
          await AsyncStorage.setItem('@users', JSON.stringify(newUsers));
          ToastAndroid.showWithGravity(
            'User added successfully!!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
          navigation.navigate('Login');
        } else {
          let User_detailJson: User_detail[] = JSON.parse(users);
          if (
            User_detailJson.filter(user => user.email == inputEmail).length > 0
          ) {
            ToastAndroid.showWithGravity(
              'User already In databse!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
          } else {
            User_detailJson.push({
              name: inputName,
              email: inputEmail,
              password: inputPassword,
            });
            await AsyncStorage.setItem(
              '@users',
              JSON.stringify(User_detailJson),
            );
            ToastAndroid.showWithGravity(
              'User Added successfully!!',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
            );
            navigation.navigate('Login');
          }
        }
      } catch (error) {
        ToastAndroid.showWithGravity(
          'Error in creating a User!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    }
  };

  return (
    <View style={styles.flexFullScreen}>
       <View style={{width:200, height:200, left:70,top:20}}>
      <Image  style={{width: '100%', height: '100%'}}
        source={require('../../assets/login-header.png')} 
      />
      </View>

      <View style={styles.SignUpBottomView}>
        <View style={styles.InputField}>
          <View>
            <Icon1 name="user" size={23} color="black" />
          </View>
          <TextInput
            style={styles.TextInputField}
            placeholder="Enter Your Name"
            onChangeText={setInputName}
          />
        </View>

        <View style={styles.InputField}>
          <View>
            <Icon name="email" size={23} color="black" />
          </View>
          <TextInput
            style={styles.TextInputField}
            placeholder="Enter Your Email"
            onChangeText={setInputEmail}
          />
        </View>

        <View style={styles.InputField}>
          <View>
            <Icon2 name="key" size={20} color="black" />
          </View>
          <TextInput
            style={styles.TextInputField}
            placeholder="Enter Your Password"
            onChangeText={setInputPassword}
            secureTextEntry={passwordMask}
          />
             </View>

        <Pressable
          onPress={registerUser}
          style={({pressed}) => [
            styles.OpenSignupButton,
            {backgroundColor: pressed ? '#519e1e' : '#6198b4', marginTop: 20},
            styles.ButtonShadow,
          ]}>
          <View>
            <Text style={[styles.OpenText, {color: 'white'}]}>Sign Up</Text>
          </View>
        </Pressable>

        <View style={styles.DontLink}>
          <Text>Already have an account? </Text>
          <Pressable onPress={(): void => navigation.navigate('Login')}>
            <Text style={{color: 'red'}}>login here</Text>
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

export default SignupPage;
