import React from 'react';
import { Button, Text, View } from 'react-native';

const StartScreen = props => {
    const { navigate } = props.navigation;
    return (
        <View>
            <Text>Welcome to mafia!</Text>
            <Button onPress={() => navigate('Create')} title="Create a game" />
            <Button onPress={() => navigate('Join')} title="Join a game" />
        </View>
    )
}

export default StartScreen;