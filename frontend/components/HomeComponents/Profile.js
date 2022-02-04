import React, { Component } from 'react';
import { View,StyleSheet,Text,TouchableOpacity } from 'react-native';
import { NavigationContext } from '@react-navigation/native';

export default class Profile extends Component {
  static contextType = NavigationContext
  render() {
    return (
        <View style={Styles.container}>
            <Text>Profile</Text>
            <TouchableOpacity onPress={()=>this.context.navigate('Login')}><Text> Log out</Text></TouchableOpacity>
        </View>
    );
  }
}

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})
