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

export const Products = (props) => {
    const navigation = useNavigation();
    const [listGroups, setListGroups] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [Group_id, setGroup_id] = useState(0)
    const [Warehouse_id, setWarehouse_id] = useState(0)
    const [PreviousGroup_id, setPreviousGroup_id] = useState(0)
    const [StackGroups, setStackGroups] = useState([])
    const [quantity, setQuantity] = useState()
    const [price, setPrice] = useState()

    const [nameSelectProduct, setNameSelectProduct] = useState('')
    const [idSelectProduct, setIdSelectProduct] = useState('')
    const [ShowModalAddToSaleProduct, setShowModalAddToSaleProduct] = useState(false)
    // let StackGroups = []


        
    const handleGroup = (group_id) => {
      // console.log('handleGroup', props.business_id)

      getGroups(props.user_id, props.business_id, group_id, function(data) {
        // console.log('ress', data)
        setListGroups(data)
      })
    }

    const handleProduct = (group_id) => {
      console.log('handleProduct', group_id, Warehouse_id)

      getProductsWarehouse(group_id, Warehouse_id, function(data) {
        // console.log('ress', data)
        setListProducts(data)
      })
    }
  
    useEffect(() => {
        console.log('useEffect handleGroupProducts')
        handleGroup()
        handleProduct()
      }, [])

    return (
        <>
            {/* Modal add to sale product */}
            <Modal
            animationType="slide"
            transparent={true}
            visible={ShowModalAddToSaleProduct}
            onRequestClose={() => {
                //Alert.alert("Modal has been closed.");
                setShowModalAddToSaleProduct(!ShowModalAddToSaleProduct);
            }}
            >
            <View style={Styles.centeredView}>
                <View style={[Styles.modalView1, {width: '60%'}]}>
                    <TouchableOpacity style={{alignSelf: 'flex-end', margin: 5}}
                        onPress={() => {
                            setShowModalAddToSaleProduct(false)
                        }}
                    >
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>

                    <Text style={{fontWeight: 'bold', marginBottom: 10}}>{nameSelectProduct}</Text>
                    <Text style={{fontSize: 3, color: 'white'}}>{idSelectProduct}</Text>
                    <Text style={{margin:10, textAlign: "center"}}>{'Количество (штук)'}</Text>
                    <TextInput
                        style={Styles.inputname}
                        onChangeText={setQuantity}
                        value={quantity}
                        keyboardType="numeric"
                        placeholder="Количество"
                    />
                    <Text style={{margin:10, textAlign: "center"}}>{'Цена (руб)'}</Text>
                    <TextInput
                        style={Styles.inputname}
                        onChangeText={setPrice}
                        value={price}
                        keyboardType="numeric"
                        placeholder="Цена"
                    />
                    
                    <TouchableOpacity
                        style={{backgroundColor: '#D0C9C0', margin: 10, alignItems: 'center', borderRadius: 5, padding: 5}}
                        onPress={() => {
                            setShowModalAddToSaleProduct(!ShowModalAddToSaleProduct);
                            props.addToSaleProduct(nameSelectProduct, price, quantity, idSelectProduct)
                        }}
                    >
                        <Text style={{}}>Добавить</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </Modal>


            <View style={{flexDirection: 'row', width: '90%', marginBottom: 15, marginTop: 15}}>
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
                    {/* <Text style={{flex: 1, textAlign: 'left'}}>{'Остаток'}</Text> */}
                </View>
                {   listProducts !== null &&
                    listProducts !== undefined &&
                    listProducts.map((product) => (                    
                        <TouchableOpacity 
                            key={product.id} 
                            style={{ width: '90%', backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}} 
                            onPress={() => {
                                    setIdSelectProduct(product.id)
                                    setNameSelectProduct(product.name)
                                    setShowModalAddToSaleProduct(true)
                                }
                            }
                        >
                        <View style={{flexDirection: "row", paddingTop: 10,  }}>                         
                            <Text style={{flex: 4, textAlign: 'left'}}>{product.name}</Text>
                            {/* <Text style={{flex: 1, textAlign: 'center'}}>{product.quantity == null ? 0: product.quantity}</Text> */}
                        </View> 
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </>
    )
}