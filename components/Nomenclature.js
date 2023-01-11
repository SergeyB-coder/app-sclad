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

import Styles from './Styles';

import {getGroups, sendNewGroup, getProducts, sendNewProduct, sendEditProduct, sendEditGroup} from './my_func'

export const Nomenclature = (props) => {
    const navigation = useNavigation();
    const [listGroups, setListGroups] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [nameNewGroup, setNameNewGroup] = useState('')
    const [NameEditGroup, setNameEditGroup] = useState('')
    
    const [nameNewProduct, setnameNewProduct] = useState('')
    const [Product_id, setProduct_id] = useState('')
    const [modalLoadVisible, setModalLoadVisible] = useState(false);
    const [ShowModalNewGroup, setShowModalNewGroup] = useState(false);
    const [ShowModalNewProduct, setShowModalNewProduct] = useState(false);
    const [ShowModalChoiceSelection, setShowModalChoiceSelection] = useState(false)
    const [ShowModalEditProduct, setShowModalEditProduct] = useState(false)
    const [ShowModalEditGroup, setShowModalEditGroup] = useState(false)
    const [ContentNomenclature, setContentNomenclature] = useState('groups')
    const [Group_id, setGroup_id] = useState(0)
    const [editGroup_id, setEditGroup_id] = useState(0)
    const [PreviousGroup_id, setPreviousGroup_id] = useState(0)
    const [StackGroups, setStackGroups] = useState([])
    // let StackGroups = []

    function addNewGroup(name, group_id) {
      let arr = listGroups.slice()
      arr.push({'id': group_id, 'name': name})
      setListGroups(arr)
    }
        
    const handleGroup = (group_id) => {
      // console.log('handleGroup', props.business_id)

      getGroups(props.user_id, props.business_id, group_id, function(data) {
        // console.log('ress', data)
        setListGroups(data)
      })
    }

    function handleNewGroup() {
      console.log('handleNewGroup', props.business_id)
      sendNewGroup(props.business_id, nameNewGroup, Group_id, function(data) {
        console.log('ress', data)
        if (data.res) {
          addNewGroup(nameNewGroup, data.id)
        }
      })
    }

    function addNewProduct(name, product_id) {
      let arr = listProducts.slice()
      arr.push({'id': product_id, 'name': name})
      setListProducts(arr)
    }

    function editProduct(name, product_id) {
      let arr = listProducts.slice()
      for (let i=0; i<arr.length; i++) {
        if (arr[i].id == product_id) {
          arr[i].name = name
          break
        }
      }
      setListProducts(arr)
    }

    function editGroup(name, group_id) {
      let arr = listGroups.slice()
      for (let i=0; i<arr.length; i++) {
        if (arr[i].id == group_id) {
          arr[i].name = name
          break
        }
      }
      setListGroups(arr)
    }

    const handleProduct = (group_id) => {
      console.log('handleProduct', group_id)

      getProducts(group_id, function(data) {
        // console.log('ress', data)
        setListProducts(data)
      })
    }

    function handleNewProduct() {
      console.log('handleNewProduct', Group_id)
      sendNewProduct(Group_id, nameNewProduct, props.business_id, function(data) {
        console.log('ress', data)
        if (data.res) {
          addNewProduct(nameNewProduct, data.id)
        }
      })
    }

    function handleEditProduct() {
      console.log('handleEditProduct', Group_id)
      sendEditProduct(Product_id, nameNewProduct, function(data) {
        console.log('ress', data)
        if (data.res) {
          editProduct(nameNewProduct, Product_id)
        }
      })
    }

    function handleEditGroup() {
      console.log('handleEditGroup', editGroup_id)
      sendEditGroup(editGroup_id, NameEditGroup, function(data) {
        console.log('ress', data)
        if (data.res) {
          editGroup(NameEditGroup, editGroup_id)
        }
      })
    }

    
    
    useEffect(() => {
      console.log('useEffect handleGroup')
      handleGroup(0)
      handleProduct(0)
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
        
        {/* Modal new Group */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalNewGroup}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalNewGroup(!ShowModalNewGroup);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%'}]}>
              <Text style={{margin:20, textAlign: "center"}}>Введите название Группы</Text>
              <TextInput
                style={Styles.inputname}
                onChangeText={setNameNewGroup}
                value={nameNewGroup}
                //keyboardType="numeric"
                placeholder="Название"
              />
              
              <Pressable
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => {
                  setShowModalNewGroup(!ShowModalNewGroup);
                  handleNewGroup()
                }}
              >
                <Text style={Styles.textStyle}>Создать</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Modal new Product */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalNewProduct}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalNewProduct(!ShowModalNewProduct);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%'}]}>
              <Text style={{margin:20, textAlign: "center"}}>Введите название товара</Text>
              <TextInput
                style={Styles.inputname}
                onChangeText={setnameNewProduct}
                value={nameNewProduct}
                //keyboardType="numeric"
                placeholder="Название"
              />
              
              <Pressable
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => {
                  setShowModalNewProduct(!ShowModalNewProduct);
                  handleNewProduct()
                }}
              >
                <Text style={Styles.textStyle}>Создать</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Modal edit Product */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalEditProduct}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalEditProduct(!ShowModalEditProduct);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%'}]}>
              <Text style={{fontSize: 3, color: 'white'}}>{Product_id}</Text>
              <Text style={{margin:20, textAlign: "center"}}>Редактирование товара</Text>
              <TextInput
                style={Styles.inputname}
                onChangeText={setnameNewProduct}
                value={nameNewProduct}
                //keyboardType="numeric"
                placeholder="Название"
              />
              
              <Pressable
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => {
                  setShowModalEditProduct(!ShowModalEditProduct);
                  handleEditProduct()
                }}
              >
                <Text style={Styles.textStyle}>Сохранить</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Modal edit Group */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalEditGroup}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalEditGroup(!ShowModalEditGroup);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%'}]}>
              <Text style={{fontSize: 3, color: 'white'}}>{editGroup_id}</Text>
              <Text style={{margin:20, textAlign: "center"}}>Редактирование группы</Text>
              <TextInput
                style={Styles.inputname}
                onChangeText={setNameEditGroup}
                value={NameEditGroup}
                //keyboardType="numeric"
                placeholder="Название"
              />
              
              <Pressable
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => {
                  setShowModalEditGroup(!ShowModalEditGroup);
                  handleEditGroup()
                }}
              >
                <Text style={Styles.textStyle}>Сохранить</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

             
        <View style={[Styles.centeredView, {width: '100%'}]}>
            <View style={{flexDirection: 'row', width: '90%'}}>
              {Group_id != 0 ? (<TouchableOpacity onPress={() => {
                  setListProducts([])
                  setContentNomenclature('groups')
                  handleGroup(PreviousGroup_id)
                  handleProduct(PreviousGroup_id)
                  setGroup_id(PreviousGroup_id)
                  let arr = StackGroups.slice()
                  arr.pop()
                  setPreviousGroup_id(arr[arr.length - 1])
                  setStackGroups(arr)
                  setShowModalChoiceSelection(false)
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
              {/* saleslist */}
              { listGroups !== null &&
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
                        setContentNomenclature('products')
                        setShowModalChoiceSelection(false)
                      }}

                      onLongPress = {() => {
                        setEditGroup_id(group.id)
                        setNameEditGroup(group.name)
                        setShowModalEditGroup(true)
                        // Alert.alert('f', 'd')
                      }}
                    >
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
                { listProducts !== null &&
                  listProducts !== undefined &&
                  listProducts.map((product) => (                    
                      <TouchableOpacity 
                        key={product.id} 
                        style={{ width: '90%', backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}} 
                        onPress={() => {
                          setnameNewProduct(product.name)
                          setProduct_id(product.id)
                          setShowModalEditProduct(true)
                        }}>
                        <View style={{flexDirection: "row", paddingTop: 10,  }}>                         
                          <Text style={{textAlign: 'left'}}>{product.name}</Text>
                        </View> 
                      </TouchableOpacity>
                  ))
                }
            </ScrollView>
        </View>

         
        <TouchableOpacity 
              style={{position: 'absolute', top: '90%', left: '7%', zIndex: 1}}
              onPress={() => {
                setShowModalChoiceSelection(true)
              }}
            >
              <View style={{}}>
                {/* <Text >{'Создать товар'}</Text> */}
                <AntDesign name="pluscircleo" size={48} color="#5F7161" />
                
              </View>
        </TouchableOpacity>

        {/* Modal chioce selection */}
        {ShowModalChoiceSelection ? (
          <View style={{ position: 'absolute', top: '85%', left: '25%', zIndex: 1, width: '25%'}}>
              <TouchableOpacity
                style={{backgroundColor: '#EFEAD8', margin: 10, alignItems: 'center', borderRadius: 5, padding: 5}}
                onPress={() => {
                  setShowModalChoiceSelection(!ShowModalChoiceSelection);
                  setShowModalNewGroup(true)
                  // handleNewProduct()
                }}
              >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1}}>
                    <FontAwesome5 name="box" size={12} color="black" />                       
                  </View> 
                  <Text style={{flex:3, color: '#5F7161', fontWeight: 'bold'}}>Группу</Text>
                </View>
                
              </TouchableOpacity>
              <TouchableOpacity
                style={{backgroundColor: '#D0C9C0', margin: 10, alignItems: 'center', borderRadius: 5, padding: 5}}
                onPress={() => {
                  setShowModalChoiceSelection(!ShowModalChoiceSelection);
                  setShowModalNewProduct(true)
                  // handleNewProduct()
                }}
              >
                <Text style={{color: '#5F7161'}}>Товар</Text>
              </TouchableOpacity>
          </View> ): null} 

      </>
    );
  }