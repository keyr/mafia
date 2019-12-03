import React, { useState, useEffect} from 'react';
import { FlatList, Text, View } from 'react-native';
import { getUsers, removeGame, initializeGame, getRole } from '../database';
import styles from '../styles';
import { Button } from 'react-native-elements';
import { material } from 'react-native-typography';

console.disableYellowBox = true;

const ManagerScreen = props => {
    const { navigate } = props.navigation;
    const {name, password, roomName } = props.navigation.state.params;
    const [error, changeError] = useState('');
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
        if (listOfUsers.length < 5) {
            changeError('You must have at least 5 players to begin!');
        } else {
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
                        } else if (role === 'doctor') {
                            navigate('Doctor', obj)
                        } else if (role === true) {
                            navigate('Town', obj)
                        } else if (role === false) {
                            navigate('Mafia', obj)
                        }
                    })
                }
            })
        }
        
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
            <View style={styles.buttonContainer}>
                <Button 
                    type = "outline"
                    onPress={() => {startGame()}}
                    title="START GAME"
                />
                <Button 
                    type = "outline"
                    onPress={() => {deleteGame()}}
                    title="DELETE GAME"
                />
            </View>
            <Text style={[material.caption, {color: 'red'}]}>{error}</Text>
        </View>
    )
}

export default ManagerScreen;