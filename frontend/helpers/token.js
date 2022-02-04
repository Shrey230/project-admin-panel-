import React from 'react';
import {View,Text,StyleSheet} from 'react-native'
import TempToken from '../components/Login'

const Token = (props) => {
  return (
      <View style= {Styles.container}>
          <Text>{}</Text>
          <TempToken/>
      </View>
      
  );
};
const Styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignContent:'center',  
    },
})
export default Token;

