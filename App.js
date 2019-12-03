import CreateGame from './screens/CreateGame';
import JoinGame from './screens/JoinGame';
import ManagerScreen from './screens/ManagerScreen';
import PlayerScreen from './screens/PlayerScreen';
import StartScreen from './screens/StartScreen';
import MafiaScreen from './screens/MafiaScreen';
import TownScreen from './screens/TownScreen';
import PoliceScreen from './screens/PoliceScreen';
import DeathScreen from './screens/DeathScreen';
import EndScreen from './screens/EndScreen';
import DoctorScreen from './screens/DoctorScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

const StartStack = createStackNavigator({
  Start: { screen: StartScreen },
  Create: { screen: CreateGame },
  Join: { screen: JoinGame }
})

const Navigator = createSwitchNavigator(
  {
    Start: StartStack,
    Manage: { screen: ManagerScreen },
    Player: { screen: PlayerScreen },
    Mafia: { screen: MafiaScreen },
    Town: { screen: TownScreen },
    Police: { screen: PoliceScreen },
    Death: { screen: DeathScreen },
    End: { screen: EndScreen },
    Doctor: { screen: DoctorScreen }
  },
  {
    initialRouteName: 'Start',
  }
);

const App = createAppContainer(Navigator);

export default App;
