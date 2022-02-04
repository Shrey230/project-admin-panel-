import React,{Component} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Signup from '../components/Signup';
import DashBoard from '../components/DashBoard';
import SplashScreen from './SplashScreen';

const Stack = createNativeStackNavigator();

export default class Routes extends Component{
   render(){
      return(
         <NavigationContainer navigationOptions= {{gesturesEnabled: false}}>
             <Stack.Navigator
               screenOptions={{
                  headerShown: false
               }}
               >
               <Stack.Screen name="SplashScreen" component={SplashScreen} options={{gestureEnabled: false }} /> 
               <Stack.Screen name="Login" component={Login} options={{gestureEnabled: false }}/>  
               <Stack.Screen name="Signup" component={Signup} options={{gestureEnabled: false }}/>
               <Stack.Screen name="DashBoard" component={DashBoard} options={{gestureEnabled: false }}/>
            </Stack.Navigator>
         </NavigationContainer>
      )
   }
}


