import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../styles';
import { material } from 'react-native-typography';

const DeathScreen = props => {
    const { navigate } = props.navigation;
    return (
        <View style={styles.container}>
            <Text style={material.display1}>You have died...</Text>
            <View style={styles.buttonContainer}>
                <Button type="outline" onPress={() => navigate('Create')} title="NEW GAME" />
                <Button type="outline" onPress={() => navigate('Join')} title="JOIN GAME" />            
            </View>
        </View>
    )
}

export default DeathScreen;