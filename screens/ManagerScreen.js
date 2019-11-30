import React, { useState, useEffect} from 'react';
import { FlatList, Button, Text, View } from 'react-native';
import { getUsers, removeGame, initializeGame, getRole } from '../database';

const ManagerScreen = props => {
    const { navigate } = props.navigation;
    const {name, password, roomName } = props.navigation.state.params;
    const [listOfUsers, changeList] = useState([]);
    useEffect(() => {
        getUsers(roomName, (users) => {
            changeList(users);
        })
    }, []);

    function deleteGame() {
        removeGame(roomName);
        navigate('Start');
    }

    function startGame() {
        initializeGame(roomName, (word) => {
            if (word === 'done') {
                getRole(roomName, name, (role) => {
                    const obj = {
                        roomName: roomName,
                        password: password,
                        name: name, 
                        manager: true
                    }
                    if (role === 'police') {
                        navigate('Police', obj)
                    } else if (role === true) {
                        navigate('Town', obj)
                    } else if (role === false) {
                        navigate('Mafia', obj)
                    }
                })
            }
        })
    }
    return (
        <View>
            <Text>Welcome</Text>
            <FlatList
                data={listOfUsers}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={item => item}
            />
            <Button 
                onPress={() => {startGame()}}
                title="Start game"
            />
            <Button 
                onPress={() => {deleteGame()}}
                title="Delete game"
            />

        </View>
    )
}

export default ManagerScreen;