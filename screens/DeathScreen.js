import React from 'react';
import { Button, Text, View } from 'react-native';

const DeathScreen = props => {
    const { navigate } = props.navigation;
    return (
        <View>
            <Text>You have died...</Text>
            <Button onPress={() => navigate('Create')} title="Create a game" />
            <Button onPress={() => navigate('Join')} title="Join a game" />
        </View>
    )
}

export default DeathScreen;