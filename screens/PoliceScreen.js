import React, { useState, useEffect} from 'react';
import { FlatList, Text, View } from 'react-native';
import { getUsers, listenForDay, checkAlignment, listenForWinner, listenForDeath } from '../database';
import Manage from './Manage';
import { Button, Tooltip } from 'react-native-elements'
import styles from '../styles';
import { material } from 'react-native-typography';

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
        <View style={styles.container}>
            <Tooltip 
                popover={<Text style={material.caption}>{"If this is your first time " + 
            "playing, keep reading! You are an important member of the town: you don\'t want to " +
            "reveal your identity right away! During the night, you can check any one person " +
            "and find out if they are part of the mafia or town. \n\n" +
            "The goal of this game is to eliminate every single mafia member. However, " +
            "remember that you lose if at any point, the number of mafia is equal to " +
            "the number of people left in town.\n\n" + 
            "Good luck!"}
                </Text>
                }
                height={350}
            >
                <Text style={material.caption}>Click me for some tips</Text>
            </Tooltip>
            <Text style={material.title}>Hi {name}! You are a cop!</Text>
            <Text style={material.title}>Last night's check: {check}</Text>
            { !day && <Text style={material.caption}>
                The town is sleeping...
                </Text>}
            { day && <Text style={material.caption}>
                The town is awake!
            </Text>}
                <Text style={material.body2}>Players: </Text>
                <FlatList
                style={styles.list}
                data={listOfUsers}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={item => item}
                />
            {!day && <FlatList
                style={styles.list}
                data={listOfUsers}
                renderItem={({ item }) => 
                (
                <Button 
                    type='outline'
                    onPress={() => checkAlignment(roomName, item, (sign) => {
                        if (sign) {
                            changeCheck(item + ' is a town');
                        } else {
                            changeCheck(item + ' is a mafia')
                        }
                    })}
                    title={"Check " + item}
                />)
                }
                keyExtractor={item => item}
            />}
            {manager && <Manage list={listOfUsers} day={day} roomName={roomName}></Manage>}

        </View>
    )
}

export default PoliceScreen;