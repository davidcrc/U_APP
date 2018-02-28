import React, { Component } from 'react';
import {  StyleSheet, View, Text,
        TextInput, Button, Alert,
        Image, ImageBackground,
        TouchableOpacity , } from 'react-native';

export default class LoginView extends Component {
    constructor(props) {

        super(props)
    
        this.state = {
    
        //   TextInputValueHolder: ' - Deberia haber un login con facebook! - '
    
        }
    
      }
    handlePress = () => {
    // const { TextInputValueHolder }  = this.state ;
    
        Alert.alert('Mover a CursosList')
    
        // Actions.home()
    }

    render() {
        return (
            <ImageBackground source={require('./imgs/inicio2.png') } style={styles.container}>

                <View style={styles.imgText} >
                    <Image source={require('./imgs/academia.png')} style={styles.logo} />
                    
                    <Text style={styles.academia} > Academia </Text>
                </View >

                <View style = {styles.buttonContainer}>
                    
                    <Button color="#dc143c" title=" < Ingresar >" onPress={this.handlePress} />
                    
                </View>

                <View style = {styles.infoLink}>
                    <Button color="#841584" title="Facebook" onPress={this.handlePress} />
                    <Button color="#841584" title="Web" onPress={this.handlePress} />
                    <Button color="#841584" title="Acerca.." onPress={this.handlePress} />
                    
                </View>

                <View >
                    <Text style={styles.infoText} > Av. Direccion .... </Text>
                </View>

            </ImageBackground>
            
        );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',            // sobre el eje primario , sea row o column 
        // justifyContent: 'space-around',         // espaciado entre el inicio y los objetos
        alignItems: 'center',                   // sobre el eje secundario (contrario del primario)
        // backgroundColor: 'lightgray',
        // flexWrap: 'wrap',                           // cae o voltea cuando no entra en toda la pantalla
        // paddingTop: 5,
        // margin: 10,
        width: null,
        height: null,
        
    },
    buttonContainer: {
        // position: 'absolute',
       // bottom: 0,
       // right: 0,
       // left: 0,
       flex: 1 ,
       height: 50,
       // backgroundColor: 'white',
    //    paddingHorizontal: 10,
       flexDirection: 'column',
       alignItems: 'center',
       
   },
    imgText: {
        flex: 1,
        paddingTop: 100,
        
        alignItems: 'center',                   // sobre el eje secundario (contrario del primario)
        // paddingVertical: 20,
        padding: 50,
    },
    academia: {
        fontWeight: '600',
        color: 'black',
        fontSize: 30 ,

    },
    infoText: {
        // flex: 1,
        color: 'black',
        fontSize: 15 ,
    },
    infoLink: {
        // flex: 1,
            
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 10,

    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 15,
    },

});