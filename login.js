import React, { Component } from 'react';
 
import { AppRegistry, StyleSheet, TextInput,
        View, Alert, Button,
        Text,  } from 'react-native';

// Importing Stack Navigator library to add multiple activities.
import { StackNavigator } from 'react-navigation';
import Register from './register'
import U_APP from './App'

// Creating Login Activity.
class LoginActivity extends Component {
    // Setting up Login Activity title.
    static navigationOptions =
    {
        title: 'Login',
    };
    
    constructor(props) {
        
        super(props)
        
        this.state = {
            
            URL : 'http://192.168.5.199',
            UserEmail: '',
            UserPassword: ''
    
        }
    
    }
 
    UserLoginFunction = () =>{
        
        const { UserEmail }  = this.state ;
        const { UserPassword }  = this.state ;
        const { URL }  = this.state ;
        
        fetch(URL+'/app_db/User_Login.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        
            email: UserEmail,
        
            password: UserPassword
        
        })
        
        }).then((response) => response.json())
        .then((responseJson) => {

            // If server response message same as Data Matched
            if(responseJson === 'encontrado')
            {
                //Then open Profile activity and send user email to profile activity.
                this.props.navigation.navigate('search', { Email: UserEmail });
                // Alert.alert(responseJson);

            }
            else{

                Alert.alert(responseJson);
            }

        }).catch((error) => {
                console.error(error);
        });
        
    }
 
    render() {
    return (
 
    <View style={styles.MainContainer}>
    
        <Text style= {styles.TextComponentStyle}>Inicio de sesion</Text>

        <TextInput
        
            // Adding hint in Text Input using Place holder.
            placeholder="Email"

            onChangeText={UserEmail => this.setState({UserEmail})}

            // Making the Under line Transparent.
            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}
        />

        <TextInput
        
            // Adding hint in Text Input using Place holder.
            placeholder="Password"

            onChangeText={UserPassword => this.setState({UserPassword})}

            // Making the Under line Transparent.
            underlineColorAndroid='transparent'

            style={styles.TextInputStyleClass}

            secureTextEntry={true}
        />

        <Button title="Login" onPress={this.UserLoginFunction} color="#2196F3" />
        
        <Text style= {styles.TextComponentStyle}>o</Text>

        <Button title="Registrar" onPress={() => this.props.navigation.navigate('register')} color="#2196F3" />
        

    </View>
            
    );
  }
}

// Creating Profile activity.
class ProfileActivity extends Component {

    // Setting up profile activity title.
    static navigationOptions =
    {
        title: 'ProfileActivity',
        
    };
        

    render()
    {

        const {goBack} = this.props.navigation;

        return(
            <View style = { styles.MainContainer }>
    
                <Text style = {styles.TextComponentStyle}> { this.props.navigation.state.params.Email } </Text>

                <Button title="Click here to Logout" onPress={ () => goBack(null) } />
    
            </View>
        );
    }
}

const MainProject = StackNavigator( {
    First: { screen: LoginActivity },
    Second: { screen: ProfileActivity },
    register: { screen: Register },
    search: { screen: U_APP },

});

const AppNavigation = () => (
    <MainProject  />
);
  
export default class App extends Component {
    render() {
      return (
          <AppNavigation/>
      );
    }
}

const styles = StyleSheet.create({
    
    MainContainer :{
    
        justifyContent: 'center',
        flex:1,
        margin: 10,
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

    },

    TextComponentStyle: {
        fontSize: 20,
        color: "#000",
        textAlign: 'center', 
        marginBottom: 15
    },
    TextRegister: {
        fontSize: 12,
        color: "#000",
        textAlign: 'center', 
        marginTop: 15
    }
});
 