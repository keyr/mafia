import React, { useState, useEffect} from 'react';
import { FlatList, Button, Text, View } from 'react-native';
import { getUsers, listenForDay, listenForWinner, listenForDeath } from '../database';
import Manage from './Manage';

const TownScreen = props => {
    const { navigate } = props.navigation;
    const {name, password, roomName, manager} = props.navigation.state.params;
    const [listOfUsers, changeList] = useState([]);
    const [day, changeDay] = useState(true);
    useEffect(() => {
        getUsers(roomName, (users) => {
            if (users === 'leave') {
                
            } else {
                changeList(users);
            }
        })
        listenForDay(roomName, (s) => {
            changeDay(s)
        })
        listenForWinner(roomName, (s) => {
            if (s && s !== '') {
                navigate('End', { message: s});
            }
        })
        listenForDeath(roomName, name, (s) => {
            if (!manager && s) {
                navigate('Death');
            }
        })
    }, []);
    return (
        <View>
            <Text>Welcome {name}, you are town!</Text>
            { !day && <Text>
                The town is sleeping...
                </Text>}
            <FlatList
                data={listOfUsers}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={item => item}
            />
            {manager && <Manage list={listOfUsers} day={day} roomName={roomName}></Manage>}

        </View>
    )
}

export default TownScreen;