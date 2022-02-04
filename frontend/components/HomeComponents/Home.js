import React, { useContext } from 'react';
import { View,StyleSheet,Text } from 'react-native'
import { LoginContext } from '../Login';

export default function Home() {
    const token = useContext(LoginContext)
    return (
        <View style={Styles.container}>
            <Text>Home Screen</Text>
        </View>
    );
    }

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    }
})
