import React, {useState, useEffect, Component} from 'react';
import {
  Alert,
  Modal,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
  ScrollView
} from 'react-native';
import {useNavigation} from '@react-navigation/native'


import Styles from './Styles';

import {getBusiness, sendNewBusiness} from './my_func'

export const Business = (props) => {
    const navigation = useNavigation();
    const [listBusiness, setListBusiness] = useState([]);
    const [nameNewBusiness, setNameNewBusiness] = useState('')
    const [modalLoadVisible, setModalLoadVisible] = useState(false);
    const [ShowModalNewBusiness, setShowModalNewBusiness] = useState(false);

    function addNewBusiness(name, business_id) {
      let arr = listBusiness.slice()
      arr.push({'id': business_id, 'name': name})
      setListBusiness(arr)
    }
        
    const handleBusinnes = () => {
      console.log('handleBusinnes', props.user_id)
      getBusiness(props.user_id, function(data) {
        console.log('ress', data)
        setListBusiness(data)
      })
    }

    function handleNewBusinnes() {
      console.log('handleNewBusinnes', props.user_id)
      sendNewBusiness(props.user_id, nameNewBusiness, function(data) {
        console.log('ress', data)
        if (data.res) {
          addNewBusiness(nameNewBusiness, data.id)
        }
      })
    }
    
    useEffect(() => {
      console.log('useEffect handleBusinnes')
      handleBusinnes()
    }, [])

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
        
        {/* Modal new Business */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalNewBusiness}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalNewBusiness(!ShowModalNewBusiness);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%'}]}>
              <Text style={{margin:20, textAlign: "center"}}>Введите название предприятия</Text>
              <TextInput
                style={Styles.inputname}
                onChangeText={setNameNewBusiness}
                value={nameNewBusiness}
                //keyboardType="numeric"
                placeholder="Название"
              />
              
              <Pressable
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => {
                  setShowModalNewBusiness(!ShowModalNewBusiness);
                  handleNewBusinnes()
                }}
              >
                <Text style={Styles.textStyle}>Создать</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={[Styles.centeredView, {width: '90%', marginTop: 20}]}>
            <Text style={{fontSize: 20, marginBottom: 7}}>{'Ваши предприятия'}</Text> 
            <TouchableOpacity 
              style={{position: 'absolute', top: '90%', zIndex: 1}}
              onPress={() => {
                console.log('test')
                setShowModalNewBusiness(true)
              }}
            >
              <View style={Styles.button}>
                <Text >{'Создать предприятие'}</Text>
              </View>
            </TouchableOpacity>
            <ScrollView style={{width: '90%'}}>
              {/* saleslist */}
              { listBusiness !== null &&
                listBusiness !== undefined &&
                listBusiness.map((business) => (                    
                    <TouchableOpacity style={{backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}} key={business.id} onPress={() => {
                      navigation.navigate('Work', {user_id: props.user_id, business_id: business.id})
                    }}>
                      <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                        <Text style={{textAlign: 'center'}}>{business.name}</Text>
                      </View> 
                    </TouchableOpacity>
                  ))
                  }
            </ScrollView>
          
        </View>
      </>
    );
  }