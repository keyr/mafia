import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { joinGame } from '../database';
import { material } from 'react-native-typography';
import styles from '../styles';

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
        <View style={styles.container}>
            <Text style={material.display1}>Join Game</Text>
            <Input
                placeholder="What is the name of your room?"
                value={roomName}
                onChangeText={text => changeRoomName(text)}
                maxLength = {24}
                autoCorrect = {false}
                autoCapitalize = 'none'
            />
            <Input
                placeholder="What is the password of your room?"
                value={password}
                onChangeText={text => changeRoomPW(text)}
                maxLength = {12}
                autoCorrect = {false}
                autoCapitalize = 'none'
            />
            <Input
                placeholder="What's your name?"
                value={name}
                onChangeText={text => changeName(text)}
                maxLength = {12}
                autoCorrect = {false}
                autoCapitalize = 'none'
            />
            <View style={styles.buttonContainer}>
            <Button 
                type = "outline"
                onPress = {() => join({
                roomName: roomName,
                password: password,
                name: name
            })} title = "JOIN GAME" />
            </View>
        </View>
    )
}

export default JoinGame;