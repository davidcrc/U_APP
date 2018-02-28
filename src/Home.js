import React, { Component } from 'react';
import {  StyleSheet, View, Text,
    TextInput, Button, Alert,
    Image, ImageBackground,
    TouchableOpacity , } from 'react-native';

import { StackNavigator } from 'react-navigation';

import Inicio from './Inicio'
import CursosList from './CursosList'
import CursoInfo from './CursoInfo'
import Questions from './Questions'

const MainProject = StackNavigator( {
    First: { screen: Inicio },
    CursosList: { screen: CursosList },
    CursoInfo: { screen: CursoInfo },
    Questions: { screen: Questions },
    // register: { screen: Register },

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
