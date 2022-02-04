import React, { Component } from 'react';
import { ImageBackground,View,Image, StyleSheet,TouchableOpacity,Text } from 'react-native';


export default class SplashScreen extends Component {
  render() {
    return (
        <View
        style={{flex:1}}
        showsVerticalScrollIndicator={false}>
        <ImageBackground source={require('../assets/login.png')}
        style={
            [Styles.imgBackground,{height:'100%',width:'100%'}]
        }>
        <View style={Styles.container}>
            <Image resizeMode={'contain'} source={require('../assets/Home.png') }
            style={Styles.img}/>
        
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Signup')}} style={Styles.btn}><Text style={Styles.text}>Get Started</Text></TouchableOpacity>
            <View style={Styles.signupTextCont}>
                    <Text style={Styles.signupText}>Already have account?</Text>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}><Text style={Styles.signupButton}> Login</Text></TouchableOpacity>
            </View>
        </View>
        </ImageBackground>
        </View>
    );
  }
}

const Styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection: 'column',
        minHeight: 100,
        alignContent:'center',
    },
    imgBackground:{
        alignSelf:'center',
    },
    img:{
        marginTop:'25%',
        marginRight:'5%',
        alignSelf:'center',
        height:'60%',
        width:'100%'
    },
    btn:{
        marginLeft:'5%',
        marginRight:'5%',
        backgroundColor:'#21A656',  
        borderRadius:5     
    },
    text:{
        paddingVertical:'1.8%',
        alignSelf:'center',
        opacity:0.7
    },
    signupTextCont:{
        paddingVertical:'15%',
        alignSelf : "center",
        flexDirection:"row"
    },
    signupButton:{
        fontWeight:'700',
        color:'orange',
    }

})
