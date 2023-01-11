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

import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

import Styles from '../Styles';

import {getGroups, sendNewGroup, getProductsWarehouse, sendNewWarehouse, getWareHouses} from '../my_func'
import { getProducts } from '../my_func';

var Warehouse_id = 0

export const WareHouses = (props) => {
    const navigation = useNavigation();
    const [listGroups, setListGroups] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [listWareHouses, setListWareHouses] = useState([])
    const [WarehouseName, setWarehouseName] = useState('')
    
    const [nameNewWarehouse, setnameNewWarehouse] = useState('')
    const [modalLoadVisible, setModalLoadVisible] = useState(false);
    const [ShowContentWarehouse, setShowContentWarehouse] = useState(false)
    const [ShowModalNewWarehouse, setShowModalNewWarehouse] = useState(false)
    const [Group_id, setGroup_id] = useState(0)
    // const [Warehouse_id, setWarehouse_id] = useState(0)
    const [PreviousGroup_id, setPreviousGroup_id] = useState(0)
    const [StackGroups, setStackGroups] = useState([])
    // let StackGroups = []
        
    const handleGroup = (group_id) => {
      // console.log('handleGroup', props.business_id)

      getGroups(props.user_id, props.business_id, group_id, function(data) {
        // console.log('ress', data)
        setListGroups(data)
      })
    }

    function addNewWarehouse(name, warehouse_id) {
      let arr = listWareHouses.slice()
      arr.push({'id': warehouse_id, 'name': name})
      setListWareHouses(arr)
    }

    const handleProduct = (group_id) => {
      console.log('handleProduct', group_id, Warehouse_id)

      getProductsWarehouse(group_id, Warehouse_id, function(data) {
        // console.log('ress', data)
        setListProducts(data)
      })
    }

    function handleNewWarehouse() {
      console.log('handleNewWarehouse', props.business_id)
      sendNewWarehouse(props.business_id, nameNewWarehouse, function(data) {
        console.log('ress', data)
        if (data.res) {
          addNewWarehouse(nameNewWarehouse, data.id)
        }
      })
    }

    function handleWareHouses() {
        console.log('handleWareHouses', props.business_id)
        getWareHouses(props.business_id, props.user_id, function(data) {
            setListWareHouses(data)
        })
    }
    
    useEffect(() => {
      console.log('useEffect handleGroup')
      handleWareHouses()
    }, [])

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('drawerItemPress', (e) => {
        // Prevent default behavior
        // e.preventDefault();
    
        
        handleGroup(Group_id)
        handleProduct(Group_id)
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

        {/* Modal new Warehouse */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalNewWarehouse}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalNewWarehouse(!ShowModalNewWarehouse);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%'}]}>
              <Text style={{margin:20, textAlign: "center"}}>Введите название Склада</Text>
              <TextInput
                style={Styles.inputname}
                onChangeText={setnameNewWarehouse}
                value={nameNewWarehouse}
                //keyboardType="numeric"
                placeholder="Название"
              />
              
              <TouchableOpacity
                style={{backgroundColor: '#D0C9C0', margin: 10, alignItems: 'center', borderRadius: 5, padding: 5}}
                onPress={() => {
                  setShowModalNewWarehouse(!ShowModalNewWarehouse);
                  handleNewWarehouse()
                }}
              >
                <Text style={{}}>Создать</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        {/* <View>
          <Text>{Warehouse_id}</Text>
        </View> */}
        {ShowContentWarehouse ? (
        <View style={[Styles.centeredView, {width: '100%'}]}>
            <View style={{ width: '100%'}}>
              <TouchableOpacity style={{ alignItems: 'flex-start', margin: 10}} onPress={() => {
                  setShowContentWarehouse(false)
                  
                }}>
                  <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={{fontWeight: 'bold'}}>{WarehouseName}</Text>
            </View>
            
            <View style={{flexDirection: 'row', width: '90%'}}>
              {Group_id != 0 ? (
              <TouchableOpacity onPress={() => {
                  setListProducts([])
                  handleGroup(PreviousGroup_id)
                  handleProduct(PreviousGroup_id)
                  setGroup_id(PreviousGroup_id)
                  let arr = StackGroups.slice()
                  arr.pop()
                  setPreviousGroup_id(arr[arr.length - 1])
                  setStackGroups(arr)
                  console.log('StackGroups', StackGroups)
                  
                  }}>
                  <Text>
                  {'Назад'}
                  </Text>
              </TouchableOpacity>): null}
              <Text style={{color: 'white'}}>{Group_id}</Text>
              <Text style={{color: 'white'}}>{PreviousGroup_id}</Text>
            </View>

            <ScrollView style={{width: '95%', }}>
            {/* groups */}
            {   listGroups !== null &&
                listGroups !== undefined &&
                listGroups.map((group) => (                    
                    <TouchableOpacity 
                        key={group.id} 
                        style={{ width: '90%', backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3, alignItems: 'center'}} 
                        onPress={() => {
                        setGroup_id(group.id)
                        setPreviousGroup_id(Group_id)
                        handleGroup(group.id)
                        handleProduct(group.id)
                        let arr = StackGroups.slice()
                        arr.push(Group_id)
                        setStackGroups(arr)
                        console.log('StackGroups', StackGroups)
                        }}>
                        <View style={{flexDirection: "row", padding: 5, justifyContent: 'center', alignItems: 'center' }}> 
                        <View style={{flex: 1,  alignSelf: 'center'}}>
                            <FontAwesome5 name="box" size={24} color="black" />                       
                        </View> 
                        
                        <Text style={{flex:3 , textAlign: 'left'}}>{group.name}</Text>
                        </View> 
                    </TouchableOpacity>
                    ))
            }

            {/* products */}
            <View style={{flexDirection: "row", paddingTop: 10,  }}>                         
                <Text style={{flex: 3, textAlign: 'left'}}>{'Товар'}</Text>
                <Text style={{flex: 1, textAlign: 'left'}}>{'Остаток'}</Text>
            </View>
            {   listProducts !== null &&
                listProducts !== undefined &&
                listProducts.map((product) => (                    
                    <TouchableOpacity key={product.id} style={{ width: '90%', backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}} onPress={() => {
                    }}>
                    <View style={{flexDirection: "row", paddingTop: 10,  }}>                         
                        <Text style={{flex: 4, textAlign: 'left'}}>{product.name}</Text>
                        <Text style={{flex: 1, textAlign: 'center'}}>{product.quantity == null ? 0: product.quantity}</Text>
                    </View> 
                    </TouchableOpacity>
                ))
            }
            </ScrollView>
        </View>): null}

        {!ShowContentWarehouse ? (
            <>
                {/* BUTTON ADD  NEW WAREHOUSE */}
                <TouchableOpacity 
                        style={{position: 'absolute', top: '90%', left: '7%', zIndex: 1}}
                        onPress={() => {
                        setShowModalNewWarehouse(true)
                        }}
                    >
                        <View style={{}}>
                        {/* <Text >{'Создать товар'}</Text> */}
                        <AntDesign name="pluscircleo" size={48} color="#5F7161" />
                        
                        </View>
                </TouchableOpacity>
                <View style={[Styles.centeredView, {width: '100%'}]}>

                    <ScrollView style={{width: '95%', }}>
                        {/* groups */}
                        {   listWareHouses !== null &&
                            listWareHouses !== undefined &&
                            listWareHouses.map((whouse) => (                    
                                <TouchableOpacity 
                                    key={whouse.id} 
                                    style={{ width: '90%', backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3, alignItems: 'center'}} 
                                    onPress={() => {
                                        // setWarehouse_id(whouse.id)
                                        Warehouse_id = whouse.id
                                        handleGroup(0)
                                        handleProduct(0)
                                        setGroup_id(0)
                                        setPreviousGroup_id(0)
                                        setStackGroups([])
                                        setShowContentWarehouse(true)
                                        setWarehouseName(whouse.name)
                                    }}
                                >
                                    <View style={{flexDirection: "row", padding: 5, justifyContent: 'center', alignItems: 'center' }}> 
                                    <View style={{flex: 1,  alignSelf: 'center'}}>
                                        <FontAwesome5 name="warehouse" size={24} color="black" />                       
                                    </View> 
                                    
                                    <Text style={{flex:3 , textAlign: 'left'}}>{whouse.name}</Text>
                                    </View> 
                                </TouchableOpacity>
                                ))
                        }
                    </ScrollView>
                </View>
            </>
            
        ): null}    
         

      </>
    );
  }