import React, {useState, useEffect, Component} from 'react';
import {
  Alert,
  Modal,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image 
} from 'react-native';

import {useNavigation} from '@react-navigation/native'


import Styles from './Styles';

import {f_calculate_allSops_debet, f_getEmployName} from './my_func'

export const LogIn = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const [modalLoadVisible, setModalLoadVisible] = useState(false);
  
        
    const doUserLogIn = () => {
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      console.log('username', username)
      fetch('http://u103146.na4u.ru/login', {
        method: 'POST',
        // headers: {
        //   'Accept': 'application/json',
        //   'Content-Type': 'application/json'
        // },
        mode: 'no-cors',
        body: formData
      })
      .then((response) => response.json())
      .then((data) => {
          if (data.res) {
            console.log('data', data)
            if (data.adm) {
              navigation.navigate('Business', {user_id: data.user_id})
            }
            else {
              console.log('business_id', data.business_id)
              navigation.navigate('Work', {user_id: data.user_id, business_id: data.business_id})
            }
            
          }
        });
    }
  
    return (
      <>
        {/* Modal Load */}
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalLoadVisible}
            onRequestClose={() => {
              //Alert.alert("Modal has been closed.");
              setModalLoadVisible(!modalLoadVisible);
            }}
          >
            <View style={Styles.centeredView}>
              <View style={Styles.modalView1}>
                <Text style={{margin:20}}>Ожидание запроса</Text>
              </View>
            </View>
        </Modal>
        <View style={Styles.centeredView}>
          <View style={Styles.centeredView}>
            <Image
                style={{width: 200,
                height: 200,
                resizeMode: 'stretch',
                }}
                source={require('../assets/logo.png')}
            />
            <Text style={{fontSize: 10, marginBottom: 7}}>{'НОВАЯ ВЕРСИЯ'}</Text> 
            <TextInput
              style={Styles.input}
              value={username}
              placeholder={'Username'}
              onChangeText={(text) => setUsername(text)}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
            />
            <TextInput
              style={Styles.input}
              value={password}
              placeholder={'Password'}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={() => doUserLogIn()}>
              <View style={Styles.button}>
                <Text style={Styles.button_label}>{'Войти'}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{marginTop: 20}}
              onPress={() => {navigation.navigate('Registration')
              }}>
              <View>
                <Text style={{color: '#3498DB'}}>{'Зарегестрироваться'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }