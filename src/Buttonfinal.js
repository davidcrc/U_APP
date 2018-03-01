import React from 'react';

import { StyleSheet, View, Text, Image } from 'react-native';

const Buttonfinal = (props) => 
<View style={styles.buttonContainer}> 
    {
        props.isfinal ?
        <Button color="#3cb371" disabled={props.esfinal} title="    Siguiente    " onPress={ this.QuestionOkFunction} /> :
            
            <Button color="#3cb371" disabled={props.esfinal} title="    Siguiente    " onPress={ this.QuestionOkFunction} />

    }
</View>

const styles = StyleSheet.create({
    buttonContainer: {
        // flex: 1,
        // position: 'absolute',
        
        marginTop: 20,
        marginBottom: 10,

    },
    text: {
        marginLeft: 10,
        fontSize: 16,
    },
} )
export default Buttonfinal