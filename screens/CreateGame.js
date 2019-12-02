import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { createGame } from '../database';
import styles from '../styles';
import LinearGradient from 'expo-linear-gradient';
import { Button, Input } from 'react-native-elements';
import { material } from 'react-native-typography';

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
        <View style={styles.container}>
            <Text style={material.display1}>Create Game</Text>
            <Input
                placeholder="Give your room a name"
                value={roomName}
                onChangeText={text => changeRoomName(text)}
                maxLength = {24}
                autoCorrect = {false}
                autoCapitalize = 'none'
            />
            <Input
                placeholder="Give your room a password"
                value={password}
                onChangeText={text => changeRoomPW(text)}
                maxLength = {12}
                autoCorrect = {false}
                autoCapitalize = 'none'
            />
            <Input
                placeholder="Give yourself a name"
                value={name}
                onChangeText={text => changeName(text)}
                maxLength = {12}
                autoCorrect = {false}
                autoCapitalize = 'none'
            />
            <View style={styles.buttonContainer}>
            <Button 
                type="outline"
                onPress = {() => create({
                roomName: roomName,
                password: password,
                name: name
            })} title = "START GAME" />
            </View>
        </View>
    )
}

export default CreateGame;