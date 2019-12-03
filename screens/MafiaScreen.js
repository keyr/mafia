import React, { useState, useEffect} from 'react';
import { FlatList, Text, View } from 'react-native';
import { getUsers, getMafia, listenForDay, killPlayer, listenForWinner, listenForDeath } from '../database';
import Manage from './Manage';
import { Button, Tooltip } from 'react-native-elements'
import styles from '../styles';
import { LinearGradient } from 'expo-linear-gradient';
import { material } from 'react-native-typography';

console.disableYellowBox = true;

const MafiaScreen = props => {
    const { navigate } = props.navigation;
    const {name, password, roomName, manager } = props.navigation.state.params;
    const [listOfUsers, changeList] = useState([]);
    const [listOfMafia, changeMafia] = useState([]);
    const [day, changeDay] = useState(true);
    useEffect(() => {
        getMafia(roomName, (mafia) => {
            changeMafia(mafia);
        })
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
            colors={["#ee9ca7", "#ffffff"]}
            style={styles.container}>
            <Tooltip 
                popover={<Text style={material.caption}>{"If this is your first time " + 
            "playing, keep reading! You are a member of the mafia: you don\'t want to " +
            "reveal your identity to anyone. Take a look at the list: whoever has their " +
            "name in red is a member of the mafia. \n\n" +
            "The goal of this game is to eliminate the town members, until the number of " +
            "mafia is equal to the number of town. Remember that you do not lose " +
            "until every single mafia is eliminated. \n\n" + 
            "Good luck!"}
                </Text>
                }
                height={350}
            >
                <Text style={material.caption}>
                    Click me for some tips
                </Text>
            </Tooltip>
            <Text style={material.title}>{name}, you are part of the mafia! </Text>
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
                renderItem={({ item }) => {if (listOfMafia.includes(item)) {
                    return <Text style={[material.body1, {color: 'red'}]}>{item}</Text>
                } else {
                    return <Text style={material.body1}>{item}</Text>
                }}}
                keyExtractor={item => item}
            /> 
            { !day && <FlatList
                style={styles.list}
                data={listOfUsers}
                renderItem={({ item }) => 
                <Button 
                    type='outline'
                    onPress={() => killPlayer(roomName, item)}
                    title={"Kill " + item}
                />}
                keyExtractor={item => item}
            /> }
            {manager && <Manage list={listOfUsers} day={day} roomName={roomName}></Manage>}
            
        </LinearGradient>
    )
}

export default MafiaScreen;