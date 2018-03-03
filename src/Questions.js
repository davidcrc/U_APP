import React, { Component } from 'react';

import { AppRegistry, StyleSheet, ActivityIndicator, 
    ListView, Text, View, 
    Alert, TextInput, Button, 
    CheckBox, ImageBackground } from 'react-native';

import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'

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
            idCurrentCourse: this.props.navigation.state.params.id,           
            totalQuestions: 0,
            question: '',
            numQuestion: 1,
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

            // this.setState ({
                //     num_pregunta : this.state.num_pregunta ++
                
                // })
                // console.warn('pasa ? ',num_pregunta)
                // if(this.props.navigation.state.params.num_p != 1)


                // REVISAR LA NAVEGACION  PARA QUE NO REGRESE TANTO

            Alert.alert( 'Respuesta Correcta :)', 'Good Job!!');
            var truefinal = false                
            if ( this.state.num_pregunta === this.state.totalQuestions){
                truefinal = true  
                Alert.alert( 'Respuesta Final correcta !!', 'Thanks for do it!' );
                
            }

            if( truefinal){
                this.props.navigation.navigate('Questions', 
                { 
                    id: this.state.idCurrentCourse, 
                    num_p: this.state.num_pregunta ,
                    num_int : this.state.num_intentos + 1,
                    final:  true,
                });
            }
            else{
                this.props.navigation.navigate('Questions', 
                { 
                    id: this.state.idCurrentCourse, 
                    num_p: this.state.num_pregunta + 1,
                    num_int : this.state.num_intentos + 1,
                    final:  false,
                });
            }
        }
        else{
            // Podria deseleccionarse la opcion q ya selecciono ..
            Alert.alert( 'Intenta de nuevo :/' , 'Tu puedes !!!' );
            this.setState ({
                num_intentos : this.state.num_intentos + 1
            })
        }
  
    }

    ListCurso_Online = () => {
        // Alert.alert( 'Final' ,'Curso o Online , elige' );
        Alert.alert(
            'Info',
            'Si deseas mas practica puedes ver otro curso.',
            [
            //   {text: '+ Practicas', onPress: () => console.log('Ask me later pressed')},
              
              {text: 'Ver Cursos', onPress: () => this.props.navigation.navigate('CursosList') },
            ],
            { cancelable: false }
          )
        
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
               
        // console.warn("curso actual",currentCourse)
        // num_pregunta = this.props.navigation.state.params.num_p
        currentCourse = this.state.idCurrentCourse       //  se refiere al nombre
        num_pregunta = this.state.num_pregunta
        // num_intento = this.props.navigation.state.params.num_int
        // finaly = this.props.navigation.state.params.final
        // var json_fragment = data.Practicas['c_biologia'][num_pregunta]['alternative'][4];
        var total_q = data.Practicas[currentCourse][0]['total_questions'] ;
        // var numq = data.Practicas[currentCourse][num_pregunta]['num_question'];
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
                    <Button color="red" title="    Siguiente    " onPress={ this.ListCurso_Online} />:
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
