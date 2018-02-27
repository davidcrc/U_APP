import React, { Component } from 'react';
 
import { AppRegistry, StyleSheet, 
        TextInput, View, Alert, 
        Button, Text, ActivityIndicator,
        ImageBackground } from 'react-native';
 
export default class Register extends Component {
 
    constructor(props) {
 
        super(props)
            // let URL = 'http://192.168.1.250/app_db/User_Login.php'

        this.state = {
            URL: 'http://192.168.1.250',
            isLoading: false,
            UserName: '',
            UserEmail: '',
            UserPassword: ''
        }   
    }
 
    UserRegistrationFunction = () =>{
        this.setState({ isLoading: true }) 

        const { UserName }  = this.state ;
        const { UserEmail }  = this.state ;
        const { UserPassword }  = this.state ;
        const { URL }  = this.state ;
        
        fetch(URL+'/app_db/user_registration.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: UserName,            
                email: UserEmail,
                password: UserPassword
        
        })
        
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
            }),
            // Showing response message coming from server after inserting records.
            // console.warn('rpta' , responseJson)
            Alert.alert(responseJson);

    
        }).catch((error) => {
            console.error(error);
        });
    }
 
    render() {
    if (this.state.isLoading) {
        return (
            <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
    // FALTA COMO COMPROBAR QUE ES UN EMAIL Y SIN CARACTERES RAROS
    <ImageBackground source={require('./src/imgs/register.png') } style={styles.MainContainer}>
        
        <Text style= {styles.titulo}>Formulario de Registro</Text>
  
        <TextInput
          
            // Adding hint in Text Input using Place holder.
            placeholder="Nombre de usuario"
            onChangeText={UserName => this.setState({UserName})}    
            // Making the Under line Transparent.
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
        />
 
        <TextInput
          
            // Adding hint in Text Input using Place holder.
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={UserEmail => this.setState({UserEmail})}    
            // Making the Under line Transparent.
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
        />
 
        <TextInput
          
            // Adding hint in Text Input using Place holder.
            placeholder="Contraseña"
            onChangeText={UserPassword => this.setState({UserPassword})}
            // Making the Under line Transparent.
            underlineColorAndroid='transparent'
            style={styles.TextInputStyleClass}
            secureTextEntry={true}
        />
 
        <Button title="Registrar" onPress={this.UserRegistrationFunction} color="#2196F3" />
  
    </ImageBackground>
            
    );
    }
}
 
const styles = StyleSheet.create({
 
    MainContainer :{
    
        justifyContent: 'center',
        flex:1,
        // margin: 10,
        // width: null,
        // height: null,

    },
    titulo: { 
        fontSize: 20,
        color: "#000", 
        textAlign: 'center',
        marginBottom: 15,
    },
    TextInputStyleClass: {
    
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        // Set border Hex Color Code Here.
        borderColor: '#2196F3',

        // Set border Radius.
        borderRadius: 5 ,
        
        // Set border Radius.
        //borderRadius: 10 ,
    }
 
});
 