import React from 'react';
import { FlatList, View } from 'react-native';
import { Button } from 'react-native-elements';
import { changeDay, executePlayer, checkWinner } from '../database';
import styles from '../styles';

const Manage = props => {
    const { list, day, roomName } = props;
    return (
        <View>
            {day && <FlatList
                style = {styles.list}
                data={list}
                renderItem={({ item }) => 
                <View>
                <Button 
                    type = "outline"
                    onPress={() => executePlayer(roomName, item)}
                    title={"Execute " + item}
                />
                </View>}
                keyExtractor={item => item}
            />}
            <View>
            <Button 
                onPress={() => {
                    type = "clear"
                    changeDay(roomName, day)
                    checkWinner(roomName)
                }}
                title="END ROUND"
            />
            </View>
        </View>
    )
}

export default Manage;