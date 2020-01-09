import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = (props)  =>{
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text> Welcome to the Hotel</Text>
      <Button
          title="Press me"
          onPress={() => {
            console.log('this.props', props.navigation.push('Signature'));
          }}
        />
    </View>
  )
}

export default HomeScreen;
