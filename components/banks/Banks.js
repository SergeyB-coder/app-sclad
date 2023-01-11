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
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Payment } from './Payments';

import Styles from '../Styles';

import {getBanks, sendNewBank} from '../my_func'

export const Bank = (props) => {
    const navigation = useNavigation();
    const [listBank, setListBank] = useState([]);
    const [nameNewBank, setNameNewBank] = useState('')
    const [balanceNewBank, setBalanceNewBank] = useState('')
    const [addressNewBank, setAddressNewBank] = useState('')
    const [modalLoadVisible, setModalLoadVisible] = useState(false);
    const [ShowModalNewBank, setShowModalNewBank] = useState(false);
    const [is_cash, setIs_cash] = useState(false);
    const [bank_id, setBank_id] = useState(0)
    const [bank_name, setBank_name] = useState(0)
    
    const [content, setContent] = useState('banks')

    function addNewBank(name, Bank_id, money, is_cash) {
      let arr = listBank.slice()
      arr.push({'id': Bank_id, 'name': name, 'money': money, 'is_cash': is_cash})
      setListBank(arr)
    }
        
    const handleBank = () => {
      console.log('handleBank', props.user_id, props.business_id)
      getBanks(props.user_id, props.business_id, function(data) {
        console.log('ress', data)
        setListBank(data)
      })
    }

    function handleNewBank() {
      console.log('handleNewBank', props.user_id)
      sendNewBank(props.business_id, nameNewBank, balanceNewBank, is_cash, function(data) {
        console.log('ress', data)
        if (data.res) {
          addNewBank(nameNewBank, data.id, balanceNewBank, is_cash)
        }
      })
    }
    
    useEffect(() => {
      console.log('useEffect handleBank')
      handleBank()
    }, [])

    // useFocusEffect(() => {
    //   console.log('useFocusEffect handleBank')
    //   handleBank()
    // })

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('drawerItemPress', (e) => {
        // Prevent default behavior
        // e.preventDefault();
    
        handleBank()
      });
    
      return unsubscribe;
    }, [navigation]);

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
        
        {/* Modal new Bank */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalNewBank}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalNewBank(!ShowModalNewBank);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%'}]}>
              <Text style={{margin:20, textAlign: "center"}}>Новый счет</Text>
              <TextInput
                style={Styles.inputname}
                onChangeText={setNameNewBank}
                value={nameNewBank}
                //keyboardType="numeric"
                placeholder="Название"
              />

              <TextInput
                style={Styles.inputname}
                onChangeText={setBalanceNewBank}
                value={balanceNewBank}
                keyboardType="numeric"
                placeholder="Начальный баланс"
              />

              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={{backgroundColor: is_cash ? '#8CC084': '#FFFFFF', margin: 10, borderRadius: 7, padding: 3}}
                  onPress={() => {setIs_cash(true)}}
                >
                  <Text style={{color: is_cash ? 'black': '#DCCCA3'}}>{'Наличный'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor: is_cash ? '#FFFFFF': '#8CC084', margin: 10, borderRadius: 7, padding: 3}}
                  onPress={() => {setIs_cash(false)}}
                >
                  <Text style={{color: is_cash ? '#DCCCA3': 'black'}}>{'Безналичный'}</Text>
                </TouchableOpacity>
              </View>
              
              <Pressable
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => {
                  setShowModalNewBank(!ShowModalNewBank);
                  handleNewBank()
                }}
              >
                <Text style={Styles.textStyle}>Создать</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {content == 'banks' ? (
          <View style={[Styles.centeredView, {width: '90%', marginTop: 20}]}>
              {/* <Text style={{fontSize: 20, marginBottom: 7}}>{'Ваши предприятия'}</Text>  */}
              <TouchableOpacity 
                style={{position: 'absolute', top: '90%', zIndex: 1}}
                onPress={() => {
                  console.log('test')
                  setShowModalNewBank(true)
                }}
              >
                <View style={Styles.button}>
                  <Text >{'Новый счет'}</Text>
                </View>
              </TouchableOpacity>
              <ScrollView style={{width: '90%'}}>
                {/* saleslist */}
                { listBank !== null &&
                  listBank !== undefined &&
                  listBank.map((bank) => (                    
                      <TouchableOpacity style={{backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}} key={bank.id} onPress={() => {
                        setBank_id(bank.id)
                        setBank_name(bank.name)
                        setContent('payments')
                      }}>
                        <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                          <Text style={{textAlign: 'left', fontWeight: 'bold', flex: 6}}>{bank.name}</Text>
                          <View style={{flex: 1}}>
                            { bank.is_cash ? (
                                <SimpleLineIcons name="wallet" size={24} color="black" />
                              ): (
                                <MaterialCommunityIcons name="bank-outline" size={24} color="black" />
                              )}
                          </View>

                        </View> 
                        <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                          <Text style={{textAlign: 'center'}}>{'Баланс: ' + Math.round(bank.money*100)/100 + ' руб'}</Text>
                        </View> 
                      </TouchableOpacity>
                    ))
                    }
              </ScrollView>
            
          </View>
        ): null}
        {content == 'payments' ? (
          <Payment 
            bank_id={bank_id} 
            bank_name={bank_name} 
            user_id={props.user_id} 
            business_id={props.business_id}
            setContent={setContent}
            handleBank={handleBank}
          />
        ): null}
      </>
    );
  }