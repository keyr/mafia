import React, { useState, useEffect} from 'react';
import { FlatList, Text, View } from 'react-native';
import { getUsers, listenForDay, savePlayer, listenForWinner, listenForDeath } from '../database';
import Manage from './Manage';
import { Button, Tooltip } from 'react-native-elements'
import styles from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
import { material } from 'react-native-typography';

console.disableYellowBox = true;

const DoctorScreen = props => {
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
        <LinearGradient 
            style={styles.container}
            colors={['#c9d6ff', '#e2e2e2']}
        >
            <Tooltip 
                popover={<Text style={material.caption}>{"If this is your first time " + 
            "playing, keep reading! You are an important member of the town: you don\'t want to " +
            "reveal your identity right away! During the night, you can save any one person " +
            "from the devious attacks of the mafia. \n\n" +
            "The goal of this game is to eliminate every single mafia member. However, " +
            "remember that you lose if at any point, the number of mafia is equal to " +
            "the number of people left in town.\n\n" + 
            "Good luck!"}
                </Text>
                }
                height={400}
            >
                <Text style={material.caption}>Click me for some tips</Text>
            </Tooltip>
            <Text style={material.title}>Hi {name}! You are a doctor!</Text>
            <Text style={material.title}>You are saving: {check}</Text>
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
                    onPress={() => {
                        savePlayer(roomName, item)
                        changeCheck(item)
                    }}
                    title={"Save " + item}
                />)
                }
                keyExtractor={item => item}
            />}
            {manager && <Manage list={listOfUsers} day={day} roomName={roomName}></Manage>}

        </LinearGradient>
    )
}

export default DoctorScreen;