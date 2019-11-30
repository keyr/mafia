import React, { useState, useEffect} from 'react';
import { FlatList, Button, Text, View } from 'react-native';
import { getUsers, leaveGame, listenForInitialize } from '../database';

const PlayerScreen = props => {
    const { navigate } = props.navigation;
    const {name, password, roomName} = props.navigation.state.params;
    const [listOfUsers, changeList] = useState([]);
    useEffect(() => {
        getUsers(roomName, (users) => {
            if (users === 'leave') {
                navigate('Start');
            } else {
                changeList(users);
            }
        })
    }, []);
    listenForInitialize(roomName, name, (role) => {
        const obj = {
            roomName: roomName,
            password: password,
            name: name,
            manager: false
        }
        if (role === 'police') {
            navigate('Police', obj)
        } else if (role === true) {
            navigate('Town', obj)
        } else if (role === false) {
            navigate('Mafia', obj)
        }
    })
    function leave() {
        leaveGame(roomName, name, (users) => {
            changeList(users);
        })
        navigate('Start');
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
                onPress={() => leave()}
                title="Leave game"
            />

        </View>
    )
}

export default PlayerScreen;