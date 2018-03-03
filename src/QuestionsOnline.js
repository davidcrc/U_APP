import React, { Component } from 'react';

import { AppRegistry, StyleSheet, ActivityIndicator, 
    ListView, Text, View, 
    Alert, TextInput, Button, 
    CheckBox, ImageBackground } from 'react-native';

import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

export default class QuestionsOnline extends Component {
    // Setting up profile activity title.

    constructor(props) {
        
        super(props);
        
        this.state = {
            // URL: 'http://192.168.1.250',
            isLoading: true,
            text: '' ,
            datos : this.props.navigation.state.params.data ,
            idCurrentCourse: this.props.navigation.state.params.nameid,           
            totalQuestions: 0,
            question: '',
            numQuestion: 0,
            nameCourse:'',
            Response: '',
            currentResponse: '',
            Alt1 : '',
            Alt2 : '',
            Alt3 : '',
            Alt4 : '',
            Alt5 : '',
            num_pregunta: this.props.navigation.state.params.num_p,
            num_intentos: this.props.navigation.state.params.num_int,
            isfinal: this.props.navigation.state.params.final,
        }
    }
    static navigationOptions =
    {
        title: 'Preguntas ',
        header: null
    };
    GetItem (escuela) {
    
        Alert.alert(escuela);

    }

    componentDidMount() {
        
        this.json_curso()
        
    }

    QuestionOkFunction = () => {
     
        if (this.state.Response === this.state.currentResponse){
                // REVISAR LA NAVEGACION  ARA QUE NO REGRESE TAN ATRAS

            Alert.alert( 'Respuesta Correcta :)', 'Good Job!!' );
            var truefinal = false                
            if ( this.props.navigation.state.params.num_p === this.state.totalQuestions){
                truefinal = true
                Alert.alert( 'Respuesta Final, correcta !!', 'Thanks for do it!' );
                
            }

            if( truefinal){
                this.props.navigation.navigate('QuestionsOnline', 
                { 
                    data: this.state.datos,
                    nameid: this.state.idCurrentCourse, 
                    num_p: this.state.num_pregunta ,
                    num_int : this.state.num_intentos + 1,
                    final:  true,
                });
            }
            else{
                this.props.navigation.navigate('QuestionsOnline', 
                { 
                    data: this.state.datos,
                    nameid: this.state.idCurrentCourse, 
                    num_p: this.state.num_pregunta + 1,
                    num_int : this.state.num_intentos + 1,
                    final:  false,
                });
            }
        }
        else{
            // Podria deseleccionarse la opcion q ya selecciono ..
            Alert.alert( 'Intenta de nuevo :/' , 'Tu puedes!!' );
            this.setState ({
                num_intentos : this.state.num_intentos + 1
            })
        }
  
    }

    optionPracticeCourse = () => {
        // Alert.alert( 'Final' ,'Curso o Online , elige' );
        Alert.alert(
            'Info',
            'Muy bien!!! puedes seguir practicando en mas cursos :) ',
            [
            //   {text: '+ Practicas', onPress: () => console.log('Ask me later pressed')},
              
              {text: 'Ver Cursos', onPress: () => this.props.navigation.navigate('CursosList') },
            ],
            { cancelable: true }
        )
        
    }

    json_curso = () => {

        // el json_fragment seria el curso para q cargue todas sus preguntas de ese curso (c_biolo)
        // const {data} = this.props.navigation.state.params.Data
        // data = this.props.navigation.state.params.data
        // num_pregunta = this.state.num_pregunta;
        // currentCourse = this.state.idCurrentCourse
        const {datos} = this.state
               
        currentCourse = this.state.idCurrentCourse       //  se refiere al nombre
        num_pregunta = this.state.num_pregunta
        // var json_fragment = datos.Practicas['c_biologia'][num_pregunta]['alternative'][4];
        var total_q = datos.Practicas[currentCourse][0]['total_questions'] ;
        // var numq = datos.Practicas[currentCourse][num_pregunta]['num_question'];
        var name_c = datos.Practicas[currentCourse][num_pregunta]['name_course'];
        var pregunta = datos.Practicas[currentCourse][num_pregunta]['question'];
        var respuesta = datos.Practicas[currentCourse][num_pregunta]['response'];
        var alt0 = datos.Practicas[currentCourse][num_pregunta]['alternative'][0];
        var alt1 = datos.Practicas[currentCourse][num_pregunta]['alternative'][1];
        var alt2 = datos.Practicas[currentCourse][num_pregunta]['alternative'][2];
        var alt3 = datos.Practicas[currentCourse][num_pregunta]['alternative'][3];
        var alt4 = datos.Practicas[currentCourse][num_pregunta]['alternative'][4];
        // console.warn('haber' , json_fragment)
        
            // Alert.alert( 'Json Text',  numq  );

        this.setState ({
            // data: data,
            idCurrentCourse: currentCourse,
            totalQuestions: total_q,
            // numQuestion: numq,
            // num_pregunta: num_pregunta,
            nameCourse : name_c,
            question: pregunta,
            Response: respuesta,
            Alt1: alt0,
            Alt2: alt1,
            Alt3: alt2,
            Alt4: alt3,
            Alt5: alt4,
            // num_intentos: num_intento,
            // isfinal: finaly,
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
            <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
        
        <ImageBackground source={require('./imgs/questions.png') } style={styles.container}>

            <View  style={styles.curso}>
                <Text style={styles.nameCourseText} > 
                    {this.state.num_pregunta}/{this.state.totalQuestions}     {this.state.nameCourse} 
                </Text>
                        
                <Text style={styles.intentosText} > - intento: {this.state.num_intentos} </Text>

            </View>
            
            <View style={styles.questionContainer} >
                <Text style={styles.QuestionText}> {this.state.num_pregunta}.- {this.state.question} </Text>
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
                {
                    
                    this.state.isfinal ?
                    <Button color="red" title="    Siguiente    " onPress={ this.optionPracticeCourse} />:
                    <Button color="#3cb371"  title="    Siguiente    " onPress={ this.QuestionOkFunction} />

                }
            </View>

        </ImageBackground>
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
