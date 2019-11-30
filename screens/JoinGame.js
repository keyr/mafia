import React, { useState } from 'react';
import { TextInput, Button, Text, View } from 'react-native';
import { joinGame } from '../database';

const JoinGame = props => {
    const { navigate } = props.navigation;
    const [roomName, changeRoomName] = useState('');
    const [password, changeRoomPW] = useState('');
    const [name, changeName] = useState('');
    function join(obj) {
        joinGame({
            roomName: obj.roomName,
            password: obj.password,
            name: obj.name
        });
        navigate('Player', obj)
    }
    return (
        <View>
            <Text>Join a game</Text>
            <TextInput
                placeholder="What is the name of your room?"
                value={roomName}
                onChangeText={text => changeRoomName(text)}
            />
            <TextInput
                placeholder="What is the password of your room?"
                value={password}
                onChangeText={text => changeRoomPW(text)}
            />
            <TextInput
                placeholder="What's your name?"
                value={name}
                onChangeText={text => changeName(text)}
            />
            <Button onPress = {() => join({
                roomName: roomName,
                password: password,
                name: name
            })} title = "Join game" />
        </View>
    )
}

export default JoinGame;