import React, { useState, useEffect} from 'react';
import { FlatList, Button, Text, View } from 'react-native';
import { getUsers, listenForDay, checkAlignment, listenForWinner, listenForDeath } from '../database';
import Manage from './Manage';

const PoliceScreen = props => {
    const { navigate } = props.navigation;
    const {name, password, roomName, manager } = props.navigation.state.params;
    const [listOfUsers, changeList] = useState([]);
    const [check, changeCheck] = useState(''); 
    const [day, changeDay] = useState(true);
    useEffect(() => {
        getUsers(roomName, (users) => {
            if (users === 'leave') {
                navigate('Start');
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
            <Text>Welcome {name}, you are a police!</Text>
            <Text>Last night's check: {check}</Text>
            {day && <FlatList
                data={listOfUsers}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={item => item}
            />}
            {!day && <FlatList
                data={listOfUsers}
                renderItem={({ item }) => 
                <Button 
                    onPress={() => checkAlignment(roomName, item, (sign) => {
                        if (sign) {
                            changeCheck(item + ' is a town');
                        } else {
                            changeCheck(item + ' is a mafia')
                        }
                    })}
                    title={"Check " + item}
                />}
                keyExtractor={item => item}
            />}
            {manager && <Manage list={listOfUsers} day={day} roomName={roomName}></Manage>}

        </View>
    )
}

export default PoliceScreen;