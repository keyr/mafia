import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../styles';
import { material } from 'react-native-typography';
import { LinearGradient } from 'expo-linear-gradient';

const DeathScreen = props => {
    const { navigate } = props.navigation;
    return (
        <LinearGradient 
            style={styles.container}
            colors={['#c31432', '#240b36']}
        >
            <Text style={material.display1White}>You have died...</Text>
            <View style={styles.buttonContainer}>
                <Button type="outline" onPress={() => navigate('Create')} title="NEW GAME" />
                <Button type="outline" onPress={() => navigate('Join')} title="JOIN GAME" />            
            </View>
        </LinearGradient>
    )
}

export default DeathScreen;