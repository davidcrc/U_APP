import React, { Component } from 'react';

import { AppRegistry, StyleSheet, ActivityIndicator, 
    ListView, Text, View, 
    Alert, TextInput, Button, 
    ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

// import { StackNavigator } from 'react-navigation';
import Data from './data/data.json';

export default class CursoInfo extends Component {
    
    constructor(props) {
        
        super(props);
        
        this.state = {
            // URL: 'http://192.168.1.250',
            isLoading: true,
            data : Data,
            text: '' ,
            totalQuestions: '',
            nameCourse: '',
            descripcion: '',
            idCurrentCourse: '' ,

        }
    }
    // Setting up profile activity title.
    static navigationOptions =
    {
        title: 'Curso :',
        
    };
    GetItem (escuela) {
    
        Alert.alert(escuela);

    }

    componentDidMount() {
        
        this.json_curso()
        
    }

    practicasNav = () => {
        
        Alert.alert( 'Navegacion hacia las practicas de este curso' );
        
    }

    practicasOnlineNav = () => {
        
        Alert.alert( 'Navegacion hacia las practicas ONLINE de este curso' );
    
    }
    // Manejo de radio button
    handleOnPress(value){
        this.setState({value:value})
    }

    json_curso = () => {

        // el json_fragment seria el curso para q cargue todas sus preguntas de ese curso (c_biolo)
        const {data} = this.state
        // this.props.id
        // Alert.alert( 'Json Text',  this.props.navigation.state.params.id  );
        // this.setState ({
        //     idCurrentCourse: this.props.navigation.state.params.id
        // })
        currentCourse = this.props.navigation.state.params.id
        // var json_fragment = data.Practicas['c_biologia'][num_pregunta]['alternative'][4];
        var total_q = data.Practicas[currentCourse][0] ;
        var name_c = data.Practicas[currentCourse][0]['name_course'];
        var desc = data.Practicas[currentCourse][0]['descripcion']
        // console.warn('haber' , json_fragment)
        
            // Alert.alert( 'Json Text',  numq  );

        this.setState ({
            totalQuestions: total_q,
            nameCourse : name_c,
            descripcion: desc,
            isLoading: false,
        })
    }

    render() {

    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 30}}>
            <ActivityIndicator />
        </View>
      );
    }
    return (
        
        <View style={styles.container}>

            <View  style={styles.curso}>
                <Text style={styles.nameCourseText} > {this.state.nameCourse} </Text>

            </View>
            
            <ScrollView>
                <Text style={ styles.descriptionContainer }> {this.state.descripcion} </Text>
                
            </ScrollView>
            
            <View style={{  height: .6 ,  width: "80%", backgroundColor: "#000",  }} />

                    
            <View style={styles.buttonContainer}>
                <View style={styles.iconContainer} >   
                    <Button color="#1e90ff" title="  Practicas  " onPress={this.practicasNav} />
                </View>
    
                <View style={styles.iconContainer} >   
                
                    <Button color="#ff6347" title="  Online++  " onPress={this.practicasOnlineNav} />
                </View>

            </View>

        </View>
    );
  }
}

// const MainProject = StackNavigator( {
//     // First: { screen: LoginActivity },
//     // Second: { screen: ProfileActivity },
//     // register: { screen: Register },
//     QuestionActivity: { screen: U_APP },

// });

// const AppNavigation = () => (
//     <MainProject  />
// );
  
// export default class App extends Component {
//     render() {
//         return (
//             <AppNavigation/>
//         );
//     }
// }

const styles = StyleSheet.create({

    container :{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',            // sobre el eje primario , sea row o column 
        // justifyContent: 'space-around',         // espaciado entre el inicio y los objetos
        alignItems: 'center',                   // sobre el eje secundario (contrario del primario)
        backgroundColor: 'lightgray',
        flexWrap: 'wrap',                         // cae o voltea cuando no entra en toda la pantalla
        // paddingTop: 70,
    },
    curso: {
        // flex: 1,
        flexDirection: 'row',
        
    },
    nameCourseText: {

        paddingVertical: 10,
        // backgroundColor: 'white',
        fontSize: 20,
        color: "#000",
        fontWeight: '600',
        
        // textAlign: 'center', 
    },
    // intentos: {
    //     // alignItems: 'center',                   // sobre el eje secundario (contrario del primario)
    //     // alignItems: 'stretch',

    // },
    intentosText: {
        paddingVertical: 10,
        // backgroundColor: 'white',
        fontSize: 20,
        color: "#000",
        textAlign: 'right',

    },
    descriptionContainer: {
        flex: 1,
        paddingHorizontal: 40,
        // backgroundColor: 'white',
        alignItems: 'center',
        
    },
    QuestionText: {
        color: "#000",
        fontSize: 14,        
        fontWeight: '100',

    },
    alternativeContainer: {
        flex:1,
        // flexDirection: 'row',
        // backgroundColor: 'red',
        // justifyContent: 'space-between',
        marginHorizontal: 40,
        marginTop: 5,
        
    },
    buttonContainer: {
        // flex: 1,
        // position: 'absolute',
        flexDirection: 'row',
        // margin: 100,
        // justifyContent: 'space-between',
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 10,

    },
    iconContainer: {
        flex:1,
        alignItems: 'center',
    },
});
