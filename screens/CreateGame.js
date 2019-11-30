import React, { useState } from 'react';
import { TextInput, Button, Text, View } from 'react-native';
import { createGame } from '../database';

const CreateGame = props => {
    const { navigate } = props.navigation;
    const [roomName, changeRoomName] = useState('');
    const [password, changeRoomPW] = useState('');
    const [name, changeName] = useState('');
    function create(obj) {
        createGame({
            roomName: obj.roomName,
            password: obj.password,
            name: obj.name
        });
        navigate('Manage', obj);
    }
    return (
        <View>
            <Text>Create a game</Text>
            <TextInput
                placeholder="Give your room a name"
                value={roomName}
                onChangeText={text => changeRoomName(text)}
            />
            <TextInput
                placeholder="Give your room a password"
                value={password}
                onChangeText={text => changeRoomPW(text)}
            />
            <TextInput
                placeholder="Give yourself a name"
                value={name}
                onChangeText={text => changeName(text)}
            />
            <Button onPress = {() => create({
                roomName: roomName,
                password: password,
                name: name
            })} title = "Create your game" />
        </View>
    )
}

export default CreateGame;