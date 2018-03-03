import React, { Component } from 'react';

import { AppRegistry, StyleSheet, ActivityIndicator, 
    ListView, Text, View, 
    Alert, TextInput, TouchableOpacity } from 'react-native';


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
            Data: '{}',
            namecourse: '',
            isLoading: true,
            text: ''
        }
    }
    componentDidMount() {
        
        this.getPractices()
        
    }

    goPractice = () => {
        // console.warn("lo q voy a enviar", this.state.Data)      // hasta q no haiga data , no se puede enviar
        this.props.navigation.navigate('QuestionsOnline', {
            data: this.state.Data, nameid: this.state.namecourse, num_p: 1, num_int: 0, final: false} )
    }

    GetItem (idPractica,idCurso,passP, fecha) {

        // setear la varibale data con el Json de la Bd(consulta con idPractica) y enviarlo a atraves Data
        
        if ( passP === ''){
            this.getDataPractice(idPractica)        
            Alert.alert(
                'Info - '+fecha ,
                'Practica sin Contraseña :\nPresiona aceptar para ir a esta Practica o Cancelar ',
                [
                  {text: 'Cancelar', onPress: () => console.log('')},
                  
                  {text: 'Aceptar', onPress: () => this.goPractice() },
                ],
                { cancelable: true }
            )
            
        }  
        else        
        {
            if( passP === this.state.text ){
                this.getDataPractice(idPractica)        
                Alert.alert(
                    'Info',
                    'Presiona aceptar para ir a esta Practica o Cancelar ',
                    [
                    {text: 'Cancelar', onPress: () => console.log('')},
                    
                    {text: 'Aceptar', onPress: () => this.goPractice() },
                    ],
                    { cancelable: true }
                )
                
            }
            else{
                Alert.alert( "Info : "+fecha , "Contraseña incorreta, Por favor escriba la contraseña correcta!!"  );
                
            }
        }   
        
    }
    getDataPractice (idPractica) {
        // const {text} = this.state
        const { URL }  = this.state ;

        // var json_fragment = data.country.town;
        // console.warn('haber' , json_fragment)
        // idcourse = this.props.navigation.state.params.id

        idP = parseInt((idPractica) , 10 )
        
        let getDataPractic = URL+'/app_db/getDataPractice.php?prtc_id='+idP
        return fetch(getDataPractic)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                isLoading: false,
                Data: responseJson
                // pss: responseJson[0]['pass'],
                //   dataSource: ds.cloneWithRows(responseJson.movies),
            }, function() {
            // In this block you can do something with new state.
                // console.warn('haber' , responseJson[0]['pass']) 
            
            });


        }).catch((error) => {
                // console.error(error);
                Alert.alert("Conexion Fallida", "No se pudo obtener conexion al servidor, revise su conexion de internet!");
                
        });
    }

    getPractices = () => {
        const {text} = this.state
        const { URL }  = this.state ;
        
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
                // console.error(error);
                Alert.alert("Conexion Fallida", "No se pudo obtener conexion al servidor, revise su conexion de internet!");
                
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
            <ActivityIndicator size="large" />
        </View>
      );
    }

    return (

      <View style={styles.MainContainer}>

        <View style = {styles.inputContainer}>
            <Text> *Colocar contraseña : </Text>
            <TextInput
                
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
                        <Text style={styles.rowViewContainer}  
                        onPress={this.GetItem.bind(this, rowData.id, rowData.idcurso , rowData.pass, rowData.fecha_inicio)} >
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
