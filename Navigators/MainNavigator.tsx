import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from '../screens/WelcomeScreen';
import UsuarioScreen from '../screens/UsuarioScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Welcome" component={WelcomeScreen} />
      <Tab.Screen name="Usuario" component={UsuarioScreen} />
    </Tab.Navigator>
  );
}

function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={MyTabs} />

      </Stack.Navigator>
    );
  }


export default function TopTabNavigator(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}
