import React, { useState, useEffect} from 'react';
import { FlatList, Text, View } from 'react-native';
import { getUsers, listenForDay, listenForWinner, listenForDeath } from '../database';
import { Tooltip } from 'react-native-elements';
import Manage from './Manage';
import styles from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
import { material } from 'react-native-typography';

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
        <LinearGradient 
            style={styles.container}
            colors={['#c9d6ff', '#e2e2e2']}
        >
            <Tooltip 
                popover={<Text style={material.caption}>{"If this is your first time " + 
            "playing, keep reading! You are a member of the town: you want to be as " +
            "open and helpful as possible.\n\n" +
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
            <Text style={material.title}>Hi {name}! You are town!</Text>
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
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text style={material.body1}>{item}</Text>
                    </View>
                )}
                keyExtractor={item => item}
            />
            {manager && <Manage list={listOfUsers} day={day} roomName={roomName}></Manage>}
        </LinearGradient>
    )
}

export default TownScreen;