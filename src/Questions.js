import React, { Component } from 'react';

import { AppRegistry, StyleSheet, ActivityIndicator, 
    ListView, Text, View, 
    Alert, TextInput, Button, CheckBox } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
// import {  Scene,  Router,  Actions,  Stack, } from 'react-native-router-flux';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

import { StackNavigator } from 'react-navigation';
import Data from './data/data.json';

export default class Questions extends Component {
    // Setting up profile activity title.
    

    constructor(props) {
        
        super(props);
        
        this.state = {
            // URL: 'http://192.168.1.250',
            isLoading: true,
            text: '' ,
            data : Data,
            idCurrentCourse: '',           
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
            num_pregunta: 1,
            num_intentos: 0,
        }
    }
    static navigationOptions =
    {
        title: 'Preguntas ',
        
    };
    GetItem (escuela) {
    
        Alert.alert(escuela);

    }

    componentDidMount() {
        
        this.json_curso()
        
    }

    QuestionOkFunction = () => {
        // const {Response} = this.state
        // if (this.state.Response === ''){
        //     Alert.alert( 'Por favor, seleccione una opcion' );
        // }
        // else
        
    
            if (this.state.Response === this.state.currentResponse){

                Alert.alert( 'Respuesta Correcta :)\nGood Job!! ' );
                // this.setState ({
                //     num_pregunta : this.state.num_pregunta ++
                    
                // })
                // console.warn('pasa ? ',num_pregunta)
                // if(this.props.navigation.state.params.num_p != 1)
                if ( this.props.navigation.state.params.num_p === this.state.totalQuestions){
                    Alert.alert( 'Haz alcanzdo el total de preguntas - en Proceso' );

                    // Tal ez el boton de final deberia cambiar su aspecto
                    // FALTA LA VARIABLE DE INTENTOS QUE AUMENTE
                    // REVISAR LA NAVEGACION  ARA QUE NO REGRESE TAN ATRAS
                }
                else{                
                    this.props.navigation.navigate('Questions', { id: this.state.idCurrentCourse, num_p: this.state.num_pregunta + 1  });
                }
            }
            else
                Alert.alert( 'Intenta de nuevo :/\nTu puedes!!' );
    
        
    }

    // Manejo de radio button
    handleOnPress(value){
        this.setState({value:value})
    }

    json_curso = () => {

        // el json_fragment seria el curso para q cargue todas sus preguntas de ese curso (c_biolo)
        const {data} = this.state
        // num_pregunta = this.state.num_pregunta;
        // currentCourse = this.state.idCurrentCourse
               
        currentCourse = this.props.navigation.state.params.id
        num_pregunta = this.props.navigation.state.params.num_p
        // var json_fragment = data.Practicas['c_biologia'][num_pregunta]['alternative'][4];
        var total_q = data.Practicas[currentCourse][0]['total_questions'] ;
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
            idCurrentCourse: currentCourse,
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
            // text: `Selected index: ${index} , value: ${value}`,
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

            <View  style={styles.curso}>
                <Text style={styles.nameCourseText} > {this.state.nameCourse} </Text>
                        
                <Text style={styles.intentosText} > - Int: {this.state.num_intentos} </Text>

            </View>
            
            <View style={styles.questionContainer} >
                <Text style={styles.QuestionText}> {this.state.numQuestion}.- {this.state.question} </Text>
            </View>
            
            <View style={{  height: .6 ,  width: "80%", backgroundColor: "#000",  }} />

            <View style={styles.alternativeContainer} >

                <RadioGroup  onSelect = {(index, value) => this.onSelect(index, value)}  
                    size={18} color='#3cb371' highlightColor='#ccc8b9' activeColor='red' >
                    
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
                    
            <View style={styles.buttonContainer}>
                <Button color="#3cb371" title="  Siguiente  " onPress={ this.QuestionOkFunction} />
            </View>

        </View>
    );
  }
}


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
    questionContainer: {
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
        
        marginTop: 20,
        marginBottom: 10,

    },

});
