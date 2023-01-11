import React, { FC, ReactElement, useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native";
import {useNavigation} from '@react-navigation/native'
import Styles from './Styles';

export const UserRegistration = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doUserReg = () => {
    let formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    fetch('http://u103146.na4u.ru/reg', {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    })
    .then((response) => response.json())
    .then((data) => {
          if (data.res) {
            Alert.alert('Вы зарегестрированы', 'логин: ' + username + '\nпароль: ' + password)
          }
        });
  }

  return (
    <>
      <View style={Styles.centeredView}>
        <View style={Styles.centeredView}>
          <Text style={{marginBottom: 20}}>{'Придумайте логин и пароль'}</Text>
          <TextInput
            style={Styles.input}
            value={username}
            placeholder={"Логин"}
            onChangeText={(text) => setUsername(text)}
            autoCapitalize={"none"}
          />
          <TextInput
            style={Styles.input}
            value={password}
            placeholder={"Пароль"}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity 
            onPress={() => {
              doUserReg()
              navigation.navigate('Login')
            }}>
            <View style={Styles.button}>
              <Text style={Styles.button_label}>{'Зарегестрироваться'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};