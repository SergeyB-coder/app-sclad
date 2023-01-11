import React, {useState, useEffect, Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import {UserRegistration} from './components/UserRegistration';
import {LogIn} from './components/Login'
import { Business } from './components/Businnes';
import { Nomenclature } from './components/Nomenclature';
import { WareHouses } from './components/warehouse/WareHauses';
import { CounterParty } from './components/counterparty/CounterParty';
import { Sales } from './components/sales/Sales';
import { Buyies } from './components/buyies/Buyies';
import { Employs } from './components/employs/Employs';
import { Bank } from './components/banks/Banks';
import Styles from './components/Styles';

const LogInScreen = () => {
  return (
    <>
      <StatusBar />
      {/* <Image
            style={{width: 200,
              height: 200,
              resizeMode: 'stretch',
              position: 'absolute',
              top: '10%',
              left: '25%',
              zIndex: 1
            }}
            source={require('./assets/logo.png')}
            /> */}
      <SafeAreaView style={Styles.login_container}>
        <LogIn/>
      </SafeAreaView>
    </>
  )
}

const UserRegScreen = () => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <UserRegistration/>
      </SafeAreaView>
    </>
  )
}

function BusinessScreen ({route})  {
  const {user_id} = route.params
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <Business user_id={user_id}/>
      </SafeAreaView>
    </>
  )
}

const NomenclatureScreen = ({route}) => {
  return (
    <>
      <StatusBar/>
      <SafeAreaView style={Styles.login_container}>
        <Nomenclature user_id={route.params.user_id} business_id={route.params.business_id}/>
      </SafeAreaView>
    </>
  )
}

const BaseScreen = ({route}) => {
  return (
    <>
      <StatusBar/>
      <SafeAreaView style={Styles.login_container}>
        <WareHouses user_id={route.params.user_id} business_id={route.params.business_id}/>
      </SafeAreaView>
    </>
  )
}

const CounterPartiesScreen = ({route}) => {
  return (
    <>
      <StatusBar/>
      <SafeAreaView style={Styles.login_container}>
        <CounterParty user_id={route.params.user_id} business_id={route.params.business_id}/>
      </SafeAreaView>
    </>
  )
}

const SaleScreen = ({route}) => {
  return (
    <>
      <StatusBar/>
      <SafeAreaView style={Styles.login_container}>
        <Sales user_id={route.params.user_id} business_id={route.params.business_id}/>
      </SafeAreaView>
    </>
  )
}

const BuyScreen = ({route}) => {
  return (
    <>
      <StatusBar/>
      <SafeAreaView style={Styles.login_container}>
        <Buyies user_id={route.params.user_id} business_id={route.params.business_id}/>
      </SafeAreaView>
    </>
  )
}

const EmployScreen = ({route}) => {
  return (
    <>
      <StatusBar/>
      <SafeAreaView style={Styles.login_container}>
        <Employs user_id={route.params.user_id} business_id={route.params.business_id}/>
      </SafeAreaView>
    </>
  )
}

const BankScreen = ({route}) => {
  return (
    <>
      <StatusBar/>
      <SafeAreaView style={Styles.login_container}>
        <Bank user_id={route.params.user_id} business_id={route.params.business_id}/>
      </SafeAreaView>
    </>
  )
}



const Drawer = createDrawerNavigator();
function WorkScreen({route}) {  
  const {user_id} = route.params
  const {business_id} = route.params
  useEffect(() => {
  }, []);
  return (
    <>
      <Drawer.Navigator  swipeEnabled={false} >
        <Drawer.Screen name="Номентклатура" initialParams={{user_id: user_id, business_id: business_id}} component={NomenclatureScreen} />
        <Drawer.Screen name="Склады" initialParams={{user_id: user_id, business_id: business_id}} component={BaseScreen} />
        <Drawer.Screen name="Контрагенты" initialParams={{user_id: user_id, business_id: business_id}} component={CounterPartiesScreen} />
        <Drawer.Screen name="Продажи" initialParams={{user_id: user_id, business_id: business_id}} component={SaleScreen} />
        <Drawer.Screen name="Поступления" initialParams={{user_id: user_id, business_id: business_id}} component={BuyScreen} />
        <Drawer.Screen name="Сотрудники" initialParams={{user_id: user_id, business_id: business_id}} component={EmployScreen} />
        <Drawer.Screen name="Счета" initialParams={{user_id: user_id, business_id: business_id}} component={BankScreen} />
      </Drawer.Navigator>
    </>
    
  );
}

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LogInScreen} />
        <Stack.Screen name="Registration" component={UserRegScreen} />
        <Stack.Screen name="Business" component={BusinessScreen} />
        <Stack.Screen name="Work" component={WorkScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
