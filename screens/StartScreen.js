import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles';
import { material } from 'react-native-typography';

const StartScreen = props => {
    const { navigate } = props.navigation;
    return (
        <LinearGradient
        colors={['lightblue', 'lightpink']}
        style={styles.container}>
        <View>
            <Text style={material.display1White}>Welcome to Mafia</Text>
            <View style={styles.buttonContainer}>
                <Button type="outline" onPress={() => navigate('Create')} title="NEW GAME" />
                <Button type="outline" onPress={() => navigate('Join')} title="JOIN GAME" />            
            </View>
        </View>
        </LinearGradient>
    )
}

export default StartScreen;