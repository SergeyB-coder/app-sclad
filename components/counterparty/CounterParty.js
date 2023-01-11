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

import { AntDesign } from '@expo/vector-icons'

import Styles from '../Styles';

import {getCounterparties, sendNewCounterparty} from '../my_func'

export const CounterParty = (props) => {
    const navigation = useNavigation();
    const [listCounterparty, setListCounterparty] = useState([]);
    const [nameNewCounterparty, setNameNewCounterparty] = useState('')
    const [addressNewCounterparty, setAddressNewCounterparty] = useState('')
    const [modalLoadVisible, setModalLoadVisible] = useState(false);
    const [ShowModalNewCounterparty, setShowModalNewCounterparty] = useState(false);

    function addNewCounterparty(name, counterparty_id, address) {
      let arr = listCounterparty.slice()
      arr.push({'id': counterparty_id, 'name': name, 'address': address})
      setListCounterparty(arr)
    }
        
    const handleCounterparty = () => {
      console.log('handleCounterparty', props.user_id, props.business_id)
      getCounterparties(props.user_id, props.business_id, function(data) {
        console.log('ress', data)
        setListCounterparty(data)
      })
    }

    function handleNewCounterparty() {
      console.log('handleNewCounterparty', props.user_id)
      sendNewCounterparty(props.business_id, nameNewCounterparty, addressNewCounterparty, function(data) {
        console.log('ress', data)
        if (data.res) {
          addNewCounterparty(nameNewCounterparty, data.id, addressNewCounterparty)
        }
      })
    }
    
    useEffect(() => {
      console.log('useEffect handleCounterparty')
      handleCounterparty()
    }, [])

    // useFocusEffect(() => {
    //   console.log('useFocusEffect handleCounterparty')
    //   handleCounterparty()
    // })

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('drawerItemPress', (e) => {
        // Prevent default behavior
        // e.preventDefault();
    
        handleCounterparty()
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
        
        {/* Modal new Counterparties */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalNewCounterparty}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalNewCounterparty(!ShowModalNewCounterparty);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%'}]}>
              <Text style={{margin:20, textAlign: "center"}}>Данные контрагента</Text>
              <TextInput
                style={Styles.inputname}
                onChangeText={setNameNewCounterparty}
                value={nameNewCounterparty}
                //keyboardType="numeric"
                placeholder="Название"
              />

                <TextInput
                    style={Styles.inputname}
                    onChangeText={setAddressNewCounterparty}
                    value={addressNewCounterparty}
                    //keyboardType="numeric"
                    placeholder="Адрес"
                />
              
              <Pressable
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => {
                  setShowModalNewCounterparty(!ShowModalNewCounterparty);
                  handleNewCounterparty()
                }}
              >
                <Text style={Styles.textStyle}>Создать</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={[Styles.centeredView, {width: '90%', marginTop: 20}]}>
            {/* <Text style={{fontSize: 20, marginBottom: 7}}>{'Ваши предприятия'}</Text>  */}
            <TouchableOpacity 
              style={{position: 'absolute', top: '90%', left: '7%', zIndex: 1}}
              onPress={() => {
                console.log('test')
                setShowModalNewCounterparty(true)
              }}
            >
              <View style={{}}>
                {/* <Text >{'Создать контрагента'}</Text> */}
                <AntDesign name="pluscircleo" size={48} color="#5F7161" />
              </View>
            </TouchableOpacity>
            <ScrollView style={{width: '90%'}}>
              {/* saleslist */}
              { listCounterparty !== null &&
                listCounterparty !== undefined &&
                listCounterparty.map((Counterparties) => (                    
                    <TouchableOpacity style={{backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}} key={Counterparties.id} onPress={() => {
                      navigation.navigate('Work', {user_id: props.user_id, counterparty_id: Counterparties.id})
                    }}>
                      <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                        <Text style={{flex: 4, textAlign: 'left', fontWeight: 'bold'}}>{Counterparties.name}</Text>
                        <Text style={{
                          flex: 2, 
                          textAlign: 'left', 
                          fontWeight: 'bold',
                          color: Counterparties.debt < 0 ? 'green': 'black'
                        }}
                        >
                          {'Дебиторка: \n' + Counterparties.debt}
                        </Text>
                      </View> 
                      <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                        <Text style={{textAlign: 'center'}}>{'Адрес: ' + Counterparties.address}</Text>
                      </View> 
                    </TouchableOpacity>
                  ))
                  }
            </ScrollView>
          
        </View>
      </>
    );
  }