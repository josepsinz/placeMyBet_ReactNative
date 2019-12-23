import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import EventoDetails from './components/EventosView/EventoDetails'
import EventosMainScreen from './components/EventosView/EventosMainScreen'
import ApuestaMainScreen from './components/EventosView/ApuestaMainScreen'
import UserMainScreen from './components/UserView/UserMainScreen'
import AuthLoadingScreen from './components/Authentication/AuthLoadingScreen'
import NuevoUsuario from './components/Authentication/NuevoUsuario'
import SignInScreen from './components/Authentication/SignInScreen'
import MisApuestas from './components/UserView/MisApuestas'

const navigationOptions = {
    headerStyle: {
        backgroundColor: 'rgba(175, 47, 47, 0.75)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
};

const EventNavigator = createStackNavigator(
    {
        Eventos: EventosMainScreen,
        Detalles: EventoDetails,
        Apuesta: ApuestaMainScreen
    },
    {
        initialRouteName: 'Eventos',
        defaultNavigationOptions: navigationOptions,
        headerMode: 'screen'
    }
)

const UserNavigator = createStackNavigator(
    {
        Main: UserMainScreen,
        MyApuestas: MisApuestas
    },
    {
        initialRouteName: 'Main',
        defaultNavigationOptions: navigationOptions,
        headerMode: 'screen'
    }
)

const SignInNavigator = createStackNavigator(
    {
        Main: SignInScreen,
        Nuevo: NuevoUsuario
    },
    {
        initialRouteName: 'Main',
        defaultNavigationOptions: navigationOptions,
        headerMode: 'screen'
    }
);

const Tabs = createBottomTabNavigator(
    {
        Eventos: EventNavigator,
        Usuario: UserNavigator
    },
    {
        tabBarOptions: {
            labelStyle: {
                fontWeight: 'bold',
                fontSize: 20,
                color: 'green'
            }
        }
    }
)

const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: Tabs,
        SignIn: SignInNavigator
    },
    {
        initialRouteName: 'AuthLoading'
    }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />
    }
}