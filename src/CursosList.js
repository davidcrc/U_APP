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
    handlePress = (data) => {
    // const { TextInputValueHolder }  = this.state ;
    
        Alert.alert('Toma el value='+data)
    
        // Actions.home()
    }

    render() {
        return (
            <ImageBackground source={require('./imgs/back.jpg') } style={styles.container}>

                <Text style={styles.welcome} > Lista de Cursos </Text>
                
                <View style={styles.parImgns} >

                    <View style={styles.imgText} >
                        <TouchableOpacity onPress={() => this.handlePress('c_quimica')} >
                            <Image source={require('./imgs/quimica.png')} style={styles.logo} />
                        </TouchableOpacity >
                        <Text style={styles.curso} > Quimica</Text>
                    </View >
                    
                    <View style={styles.imgText}>
                    
                        <TouchableOpacity onPress={() => this.handlePress('c_biologia')} >
                            <Image source={require('./imgs/biologia.png')} style={styles.logo} />
                        </TouchableOpacity >
                        <Text style={styles.curso} > Biologia</Text>

                    </View >
                    
                </View>
                
                <View style={styles.parImgns} >
                    
                    <View style={styles.imgText} >
                        <TouchableOpacity onPress={ () => this.handlePress('c_matematica')} >
                            <Image source={require('./imgs/matematica.png')} style={styles.logo} />
                        </TouchableOpacity >
                        <Text style={styles.curso} > matematica</Text>
                    </View >
                    
                    <View style={styles.imgText}>
                    
                        <TouchableOpacity onPress={() => this.handlePress('c_geografia')} >
                            <Image source={require('./imgs/geografia.png')} style={styles.logo} />
                        </TouchableOpacity >
                        <Text style={styles.curso} > geografia</Text>

                    </View >
                </View>
                
                <View style={styles.parImgns} >
                    
                    <View style={styles.imgText} >
                        <TouchableOpacity onPress={() => this.handlePress('c_fisica')} >
                            <Image source={require('./imgs/fisica.png')} style={styles.logo} />
                        </TouchableOpacity >
                        <Text style={styles.curso} > Fisica</Text>
                    </View >
                    
                    <View style={styles.imgText}>
                    
                        <TouchableOpacity onPress={() => this.handlePress('c_astrologia')} >
                            <Image source={require('./imgs/astrologia.png')} style={styles.logo} />
                        </TouchableOpacity >
                        <Text style={styles.curso} > astrologia</Text>

                    </View >
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
    welcome: {
        fontSize: 20 ,
        fontWeight: '500',
        marginBottom: 20,
        // backgroundColor: 'transparent',
        // backgroundColor: 'red',        
        color: 'black',
    },
    parImgns: {
        flexDirection: 'row',        
        marginBottom: 20,
        
        // padding: 50,
    },
    imgText: {
        alignItems: 'center',                   // sobre el eje secundario (contrario del primario)
        paddingHorizontal: 20,

    },
    curso: {
        fontWeight: '500',
        // color: 'red',

    },
    logo: {
        width: 60,
        height: 60,
        marginBottom: 15,
    },

});