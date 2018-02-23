import React, { Component } from 'react';

import { AppRegistry, StyleSheet, ActivityIndicator, 
    ListView, Text, View, 
    Alert, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import {  Scene,  Router,  Actions,  Stack, } from 'react-native-router-flux';

export default class U_APP extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            text: ''
        }
    }
    GetItem (escuela) {
    
        Alert.alert(escuela);

    }

    componentDidMount() {
        
        this.getStudent()
        
    }

    // Manejo de la entrada de texto
    handleSend = () => {
        
        const {text} = this.state
        this.getStudent()
        // vaciar la caja
        this.setState({text: '' })
    }
    
    getStudent = () => {
        const {text} = this.state
        let apellido = text
        // console.warn('haber' , apellido)

        let getStudents = 'http://192.168.1.250/app_db/FruitsList.php?al_buscar='+apellido
        return fetch(getStudents)
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                    //   dataSource: ds.cloneWithRows(responseJson.movies),
                }, function() {
                // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
        });
    }

    ListViewItemSeparator = () => {
        return (
        <View
            style={{
            height: .5,
            width: "100%",
            backgroundColor: "#000",
            }}
        />
        );
    }


    handleChangeText = (text) => this.setState({text})
    
    render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
        </View>
      );
    }

    return (

      <View style={styles.MainContainer}>
        <View style = {styles.inputContainer}>
            <Text> Alumnos-U : </Text>
            <TextInput
                // style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                style = {styles.input}
                placeholder="Ingresa 1er apellido!"
                onChangeText={this.handleChangeText}
                value={this.state.text}
            />
            <TouchableOpacity onPress={this.handleSend} > 
                <Icon name="md-send" size={30} color="gray" />
            </TouchableOpacity >

        </View>
        
        <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}

            renderSeparator= {this.ListViewItemSeparator}

            renderRow={(rowData) => 
            <Text style={styles.rowViewContainer}  onPress={this.GetItem.bind(this, rowData.Ecuela)} >
                {rowData.Cui} | {rowData.Nombres}  
            </Text>}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({

    MainContainer :{

        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex:1,
        margin: 10

    },

   rowViewContainer: {
        fontSize: 15,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
    },
    inputContainer: {
        // position: 'absolute',
        // bottom: 0,
        // right: 0,
        // left: 0,
        height: 50,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        flexDirection: 'row',        
        alignItems: 'center',
    },
    input: {
        // height: 50,
        // backgroundColor: 'gray',
        flex: 1,
    },

});
