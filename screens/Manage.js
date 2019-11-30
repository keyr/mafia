import React from 'react';
import { Button, Text, FlatList, View } from 'react-native';
import { changeDay, executePlayer, checkWinner } from '../database';

const Manage = props => {
    const { list, day, roomName } = props;
    return (
        <View>
            {day && <FlatList
                data={list}
                renderItem={({ item }) => 
                <Button 
                    onPress={() => executePlayer(roomName, item)}
                    title={"Execute " + item}
                />}
                keyExtractor={item => item}
            />}
            <Button 
                onPress={() => {
                    changeDay(roomName, day)
                    checkWinner(roomName)
                }}
                title={"End round"}
            />
        </View>
    )
}

export default Manage;