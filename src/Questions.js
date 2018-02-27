import React, { Component } from 'react';

import { AppRegistry, StyleSheet, ActivityIndicator, 
    ListView, Text, View, 
    Alert, TextInput, Button, CheckBox } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
// import {  Scene,  Router,  Actions,  Stack, } from 'react-native-router-flux';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

import { StackNavigator } from 'react-navigation';
import Data from './data/data.json';

class U_APP extends Component {
    // Setting up profile activity title.
    

    constructor(props) {
        
        super(props);
        
        this.state = {
            // URL: 'http://192.168.1.250',
            isLoading: true,
            text: '' ,
            data : Data,
            totalQuestions: '',
            question: '',
            numQuestion: '',
            nameCourse:'',
            Response: '',
            currentResponse: '',
            Alt1 : '',
            Alt2 : '',
            Alt3 : '',
            Alt4 : '',
            Alt5 : '',
            num_pregunta: 2,
        }
    }
    static navigationOptions =
    {
        title: 'Curso '+ 1,
        
    };
    GetItem (escuela) {
    
        Alert.alert(escuela);

    }

    componentDidMount() {
        
        this.json_curso()
        
    }

    QuestionOkFunction = () => {
        // const {Response} = this.state
        if (this.state.Response === this.state.currentResponse){

            Alert.alert( 'La respuesta Correcta :) ' );
            this.setState ({
                num_pregunta : this.state.num_pregunta ++
                
            })
            console.warn('pasa ? ',num_pregunta)
            this.props.navigation.navigate('QuestionActivity');
        }
            
        else
            Alert.alert( 'Intenta de nuevo :/ ' );
        
        
    }

    // Manejo de radio button
    handleOnPress(value){
        this.setState({value:value})
    }

    json_curso = () => {

        // el json_fragment seria el curso para q cargue todas sus preguntas de ese curso (c_biolo)
        const {data} = this.state
        num_pregunta = this.state.num_pregunta;
        currentCourse = 'c_biologia'
        // var json_fragment = data.Practicas['c_biologia'][num_pregunta]['alternative'][4];
        var total_q = data.Practicas[currentCourse][0] ;
        var numq = data.Practicas[currentCourse][num_pregunta]['num_question'];
        var name_c = data.Practicas[currentCourse][num_pregunta]['name_course'];
        var pregunta = data.Practicas[currentCourse][num_pregunta]['question'];
        var respuesta = data.Practicas[currentCourse][num_pregunta]['response'];
        var alt0 = data.Practicas[currentCourse][num_pregunta]['alternative'][0];
        var alt1 = data.Practicas[currentCourse][num_pregunta]['alternative'][1];
        var alt2 = data.Practicas[currentCourse][num_pregunta]['alternative'][2];
        var alt3 = data.Practicas[currentCourse][num_pregunta]['alternative'][3];
        var alt4 = data.Practicas[currentCourse][num_pregunta]['alternative'][4];
        // console.warn('haber' , json_fragment)
        
            // Alert.alert( 'Json Text',  numq  );

        this.setState ({
            totalQuestions: total_q,
            numQuestion: numq,
            nameCourse : name_c,
            question: pregunta,
            Response: respuesta,
            Alt1: alt0,
            Alt2: alt1,
            Alt3: alt2,
            Alt4: alt3,
            Alt5: alt4,
            isLoading: false,
        })
    }


    onSelect(index, value){
        this.setState({
            text: `Selected index: ${index} , value: ${value}`,
            currentResponse: `${value}`,
            
        })
        // Alert.alert( 'valor es : ',  this.state.currentResponse  );
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

    render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
        </View>
      );
    }
    return (
        
        <View style={styles.container}>

        <View  >
            <Text style={styles.nameCourseContainer} > {this.state.nameCourse}  </Text>
        </View>
        
        <View style={styles.questionContainer} >
            <Text> {this.state.numQuestion} {this.state.question} </Text>
        </View>

        <View style={styles.row} >

            <RadioGroup  onSelect = {(index, value) => this.onSelect(index, value)} >
                <RadioButton value={'a'} >
                    <Text>  {this.state.Alt1} </Text>
                </RadioButton>
        
                <RadioButton value={'b'}>
                    <Text>  {this.state.Alt2} </Text>
                </RadioButton>
        
                <RadioButton value={'c'}>
                    <Text>  {this.state.Alt3} </Text>
                </RadioButton>

                <RadioButton value={'d'}>
                    <Text>  {this.state.Alt4} </Text>
                </RadioButton>

                <RadioButton value={'e'}>
                    <Text>  {this.state.Alt5} </Text>
                </RadioButton>
            </RadioGroup>
            
            
        </View>
            {/* <Text style={styles.text}>{this.state.text}</Text> */}
        
    
        <View style = {styles.buttonContainer}>
            <Button title="Siguiente" onPress={this.QuestionOkFunction} />
            
        </View>
    </View>
    );
  }
}

const MainProject = StackNavigator( {
    // First: { screen: LoginActivity },
    // Second: { screen: ProfileActivity },
    // register: { screen: Register },
    QuestionActivity: { screen: U_APP },

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

    container :{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',            // sobre el eje primario , sea row o column 
        // justifyContent: 'space-around',         // espaciado entre el inicio y los objetos
        // alignItems: 'center',                   // sobre el eje secundario (contrario del primario)
        backgroundColor: 'lightgray',
        // flexWrap: 'wrap',                           // cae o voltea cuando no entra en toda la pantalla
        paddingTop: 70,
    },
    nameCourseContainer: {
        paddingVertical: 20,
        // backgroundColor: 'white',
        fontSize: 20,
        color: "#000",
        textAlign: 'center', 
          
        
    },
    questionContainer: {
        paddingHorizontal: 10,
        backgroundColor: 'white',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        justifyContent: 'space-between',
        marginHorizontal: 40,
        marginTop: 15,
        flex:1,
        
    },
    iconContainer: {
        // flex:1,
        // alignItems: 'center',
        // paddingVertical: 50,
        
    },
    buttonContainer: {
         // position: 'absolute',
        // bottom: 0,
        // right: 0,
        // left: 0,
        height: 50,
        // backgroundColor: 'white',
        paddingHorizontal: 10,
        flexDirection: 'column',        
        alignItems: 'center',
        
    },

});
