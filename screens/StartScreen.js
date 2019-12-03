import React from 'react';
import { View } from 'react-native';
import { Button, Text, Tooltip } from 'react-native-elements';
import styles from '../styles';
import { material } from 'react-native-typography';

console.disableYellowBox = true;

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
            <View style={styles.buttonContainer}>
            <Tooltip 
                popover={<Text style={material.caption}>{"If this is your first time " + 
            "playing, keep reading! There are two sides in this game: town and mafia. " +
            "During the night, the mafia eliminates one person. During the day, the town " +
            "bands together and tries to eliminate the mafia. \n\n" +
            "Town wins once they eliminate every single mafia member. Meanwhile, " +
            "the mafia wins if the number of mafia is equal to " +
            "the number of people left in town.\n\n" + 
            "Good luck!"}
                </Text>
                }
                height={400}
            >
                <Text style={material.caption}>Click me to learn the rules</Text>
            </Tooltip>
            </View>
        </View>
        </View>
    )
}

export default StartScreen;