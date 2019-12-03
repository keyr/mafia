import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import styles from '../styles';
import { material } from 'react-native-typography';

const StartScreen = props => {
    const { navigate } = props.navigation;
    return (
        <View
        style={styles.container}>
        <View>
            <Text style={material.display1}>Welcome to Mafia</Text>
            <View style={styles.buttonContainer}>
                <Button type="outline" onPress={() => navigate('Create')} title="NEW GAME" />
                <Button type="outline" onPress={() => navigate('Join')} title="JOIN GAME" />            
            </View>
        </View>
        </View>
    )
}

export default StartScreen;