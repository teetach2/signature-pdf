import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./HomeScreen";
import SignatureScreen from "./SignatureScreen";
import ResultScreen from "./ResultScreen";

const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Signature: SignatureScreen,
      Result: ResultScreen
    },
    {
      initialRouteName: 'Result',
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
    render() { 
        return <AppContainer />
    }
}