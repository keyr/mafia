import React, { useState, useEffect} from 'react';
import { FlatList, Button, Text, View } from 'react-native';
import { getUsers, getMafia, listenForDay, killPlayer, listenForWinner, listenForDeath } from '../database';
import Manage from './Manage';

const MafiaScreen = props => {
    const { navigate } = props.navigation;
    const {name, password, roomName, manager } = props.navigation.state.params;
    const [listOfUsers, changeList] = useState([]);
    const [listOfMafia, changeMafia] = useState([]);
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
        getMafia(roomName, (mafia) => {
            changeMafia(mafia);
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
            <Text>Welcome {name}, you are mafia! </Text>
            <Text>This is a list of all mafia! </Text>
            <FlatList
                data={listOfMafia}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={item => item}
            />
            { day && <FlatList
                data={listOfUsers}
                renderItem={({ item }) => <Text>{item}</Text>}
                keyExtractor={item => item}
            /> }
            { !day && <FlatList
                data={listOfUsers}
                renderItem={({ item }) => 
                <Button 
                    onPress={() => killPlayer(roomName, item)}
                    title={"Kill " + item}
                />}
                keyExtractor={item => item}
            /> }
            {manager && <Manage list={listOfUsers} day={day} roomName={roomName}></Manage>}

        </View>
    )
}

export default MafiaScreen;