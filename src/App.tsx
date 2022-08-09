/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
// shorturl.at/dPZ69


import React, { type PropsWithChildren } from 'react';
import LoginScreen from './screens/UserPages/LoginPage';
import OpenScreen from './screens/UserPages/Indexpage';
import SignUpScreen from './screens/UserPages/SignupPage';
import HomeScreen from './screens/Pokemonthings/PokemonList';
import DetailsScreen from './screens/Pokemonthings/DetailsPokemon';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AppStackParams} from "./components/types"
import store from "./redux/middleware";
import { Provider } from "react-redux";

let AppStack = createNativeStackNavigator<AppStackParams>();

const App: React.FC = () => {


  return (
    <Provider store={store}>
    <NavigationContainer>
        <AppStack.Navigator initialRouteName='Open'>
            <AppStack.Screen  
                name='Open' 
                component={OpenScreen} 
                options = {{
                  header : () => null
                }}  
              />
            <AppStack.Screen 
                name='SignUp' 
                component={SignUpScreen}
                options = {{
                  header : () => null
                }} 
              />
            <AppStack.Screen 
                name='Login' 
                component={LoginScreen} 
                options = {{
                  header : () => null
                }} 
              />
            <AppStack.Screen 
                name='Home' 
                component={HomeScreen}
                options = {{
                  header : () => null
                }} 
              />

            <AppStack.Screen 
                name='Details' 
                component={DetailsScreen}
                options = {{
                  header : () => null
                }} 
              />
        </AppStack.Navigator>
    </NavigationContainer>
    </Provider>

  );
};



export default App;
