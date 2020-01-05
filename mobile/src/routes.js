import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import Checkin from './pages/Checkin';
import HelpOrder from './pages/HelpOrder';
import ShowAnswer from './pages/HelpOrder/ShowAnswer';
import NewHelpOrder from './pages/HelpOrder/NewHelpOrder';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard: {
              screen: createStackNavigator(
                {
                  Checkin,
                },
                {
                  defaultNavigationOptions: {
                    headerTintColor: '#fff',
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Checkins',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="edit-location" color={tintColor} size={20} />
                ),
                tabBarOptions: {
                  activeTintColor: '#EE4E62',
                  inactiveTintColor: '#999999',
                  style: {
                    backgroundColor: '#FFFFFF',
                    height: 60,
                    padding: 10,
                  },
                },
              },
            },
            HelpOrder: {
              screen: createStackNavigator(
                {
                  HelpOrder,
                  ShowAnswer,
                  NewHelpOrder,
                },
                {
                  defaultNavigationOptions: {
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir Ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" color={tintColor} size={20} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999999',
              style: {
                backgroundColor: '#FFFFFF',
                height: 60,
                padding: 10,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
