import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../styles';
import { material } from 'react-native-typography';

const EndScreen = props => {
    const { navigate } = props.navigation;
    const { message } = props.navigation.state.params;
    return (
        <View style={styles.container}>
            <Text style={material.display1}>{message}</Text>
            <View style={styles.buttonContainer}>
                <Button type="outline" onPress={() => navigate('Create')} title="NEW GAME" />
                <Button type="outline" onPress={() => navigate('Join')} title="JOIN GAME" />            
            </View>
        </View>
    )
}

export default EndScreen;