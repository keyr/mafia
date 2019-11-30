import React from 'react';
import { Button, Text, FlatList, View } from 'react-native';
import { changeDay, executePlayer, checkWinner } from '../database';

const EndScreen = props => {
    const { navigate } = props.navigation;
    const { message } = props.navigation.state.params;
    return (
        <View>
            <Text>{message}</Text>
            <Button onPress={() => navigate('Create')} title="Create a game" />
            <Button onPress={() => navigate('Join')} title="Join a game" />
        </View>
    )
}

export default EndScreen;