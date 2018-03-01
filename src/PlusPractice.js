import React, { Component } from 'react';

import { AppRegistry, StyleSheet, ActivityIndicator, 
    ListView, Text, View, 
    Alert, TextInput, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

export default class PlusPractice extends Component {
    // Setting up profile activity title.
    static navigationOptions =
    {
        title: 'Listado de Practicas',
        
    };

    constructor(props) {
        // let URL = 'http://192.168.1.250/app_db/User_Login.php'
        super(props);
        this.state = {
            URL: 'http://192.168.1.250',
            pss: '',
            namecourse: '',
            isLoading: true,
            text: ''
        }
    }
    GetItem (id,passP) {

        if ( passP === ''){
            // Alert.alert( "Sin password - pasar directamente" );
            this.props.navigation.navigate('QuestionsOnline', {nameid: this.state.namecourse, num_p: 1, num_int: 0, final: false} )
        }
            
        else        
        {
            if( passP === this.state.text ){
                // Alert.alert( "Password - coincide , dejar pasar" );
                this.props.navigation.navigate('QuestionsOnline', {nameid: this.state.namecourse, num_p: 1, num_int: 0, final: false})
            }
            else{
                Alert.alert( "Info", "Contraseña incorreta, escriba la contraseña correcta!!"  );
                
            }
        }   
        
    }

    componentDidMount() {
        
        this.getPractices()
        
    }

    
    getPractices = () => {
        const {text} = this.state
        const { URL }  = this.state ;
        
        // let apellido = text
        // var json_fragment = data.country.town;
        // console.warn('haber' , json_fragment)
        idcourse = this.props.navigation.state.params.id
        var nameCourse = this.props.navigation.state.params.namecourse
        // console.warn('haber' , idcourse) 
        
        
        let getStudents = URL+'/app_db/getPractices.php?prtc_buscar='+idcourse
        return fetch(getStudents)
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                    namecourse: nameCourse,
                    // pss: responseJson[0]['pass'],
                    //   dataSource: ds.cloneWithRows(responseJson.movies),
                }, function() {
                // In this block you can do something with new state.
                    // console.warn('haber' , responseJson[0]['pass']) 
                
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
            <Text> *Colocar contraseña : </Text>
            <TextInput
                // style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                style = {styles.input}
                placeholder="Si fuera necesario!"
                onChangeText={this.handleChangeText}
                secureTextEntry={true}
                value={this.state.text}
                
            />
        </View>
        
        <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSource}

            renderSeparator= {this.ListViewItemSeparator}

            renderRow={(rowData) => { 
                return (
                    <TouchableOpacity>
                        <Text style={styles.rowViewContainer}  onPress={this.GetItem.bind(this, rowData.idcurso, rowData.pass)} >
                            -  {rowData.fecha_inicio}
                        </Text>
                    </TouchableOpacity>
                    
                    
                )
            }}
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
        paddingHorizontal: 20,
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
