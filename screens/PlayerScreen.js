import React, { useState, useEffect} from 'react';
import { FlatList, Text, View } from 'react-native';
import { getUsers, leaveGame, listenForInitialize } from '../database';
import styles from '../styles';
import { Button } from 'react-native-elements';
import { material } from 'react-native-typography';

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
        <View
            style={styles.container}
        >
            <Text style={material.title}>Waiting for players...</Text>
            <Text style={material.caption}>Room Name: {roomName}</Text>
            <Text style={material.caption}>Password: {password}</Text>
            <Text style={material.body2}>Players: </Text>
            <FlatList
                style={styles.list}
                data={listOfUsers}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text style={material.body1}>{item}</Text>
                    </View>
                )}
                keyExtractor={item => item}
            />
            <Button 
                type = "outline"
                onPress={() => leave()}
                title="LEAVE GAME"
            />

        </View>
    )
}

export default PlayerScreen;