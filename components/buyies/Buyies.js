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
import { Divider } from 'react-native-elements';

import DateTimePicker from '@react-native-community/datetimepicker';

import { AntDesign } from '@expo/vector-icons'

import Styles from '../Styles';

import {getBuyies, sendNewBuy, getCounterparties, getBuyProducts, sendNewStatusBuy, getWareHouses} from '../my_func'

import { Products } from '../sales/Products';

var productBuyId = 0
export const Buyies = (props) => {
    const navigation = useNavigation();
    const [productBuyName, setproductBuyName] = useState(0)

    const [typeBuy, setTypeBuy] = useState('Новое поступление')
    const [listBuy, setListBuy] = useState([]);
    const [BuyId, setBuyId] = useState('');
    const [statusBuy, setStatusBuy] = useState('');

    const [listProducts, setListProducts] = useState([]);
    
    const [listCounterparty, setListCounterparty] = useState([]);
    const [Content, setContent] = useState('list_buyies')
    const [CounterpartyName, setCounterpartyName] = useState('')

    const [WarehouseName, setWarehouseName] = useState('')
    const [ListWareHouses, setListWareHouses] = useState([])
    const [WareHouse_id, setWareHouse_id] = useState(0)

    const [counterparty_id, setCounterparty_id] = useState(0)
    const [product_id, setProduct_id] = useState(0);
    const [price, setPrice] = useState(0);
    const [ShowModalNewBuy, setShowModalNewBuy] = useState(false);
    const [ShowModalCounterPartys, setShowModalCounterPartys] = useState(false)
    const [modalLoadVisible, setModalLoadVisible] = useState(false);
    const [ShowModalAddProduct, setShowModalAddProduct] = useState(false);
    const [ShowModalWarehouse, setShowModalWarehouse] = useState(false);
    
    const [mode, setMode] = useState('date');

    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    const [showDateStart, setShowDateStart] = useState(false)
    const [showDateEnd, setShowDateEnd] = useState(false)

    const [SumMoney, setSumMoney] = useState(0)
    const [SumQuantity, setSumQuantity] = useState(0)

    const [ShowChoiceAction, setShowChoiceAction] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)

    function handleInfo(data) {
      let sumMoney = 0
      let q = 0
      data.forEach(element => {
        if (element.quantity != -1) {
          sumMoney += element.price * element.quantity
          q += parseInt(element.quantity)
        }
      });
      setSumMoney(sumMoney)
      setSumQuantity(q)
    }

    function addNewBuy(name, buy_id, address) {
      let arr = listBuy.slice()
      arr.push({'id': buy_id, 'name': name, 'address': address})
      setListBuy(arr)
    }

    function handleSetStatus() {
        console.log('setstatusbuy')
      if (statusBuy == '') {
        sendNewStatusBuy(BuyId, 'isbuyied', WareHouse_id, function(data) {
            console.log('ress handleSetStatus', data)
            setStatusBuy('isbuyied')
            handleNewBuy()
          }
        )
      }     
      else if (statusBuy == 'isload') {
        // sendNewStatus(BuyId, 'isbuyd', WareHouse_id, function(data) {
        //         console.log('ress handleSetStatus', data)
        //         setStatusBuy('isbuyd')
        //     }
        // )
      }
    }

    function addToBuyProduct(name, price, quantity, product_id) {
      let arr = listProducts.slice()
      arr.push({'id':  -arr.length, 'name': name, 'price': price, 'quantity': quantity, 'product_id': product_id})
      setListProducts(arr)
      handleInfo(arr)
      if (typeBuy == 'Поступление') {
        setIsUpdate(true)
      }
    }

    function handleProducts(buy_id) {
      getBuyProducts(buy_id, function(data) {
        console.log('ress handleProducts', data)
        setListProducts(data)
        handleInfo(data)
      })
    }
        
    const handleBuy = () => {
      console.log('handleBuy', props.business_id)
      getBuyies(props.user_id, props.business_id, dateStart, dateEnd, function(data) {
        console.log('ress', data)
        setListBuy(data)
      })
    }

    function handleNewBuy() {
      console.log('handleNewBuy', listProducts, WareHouse_id)
      sendNewBuy(props.business_id, counterparty_id, listProducts, typeBuy, BuyId, WareHouse_id, function(data) {
        console.log('ress', data)
        if (data.res) {
          setBuyId(data.id)
          setTypeBuy('Поступление')
          setIsUpdate(false)
          handleProducts(data.id)
          Alert.alert('Успешно')
        }
      })
    }

    const handleCounterparty = () => {
      console.log('handleCounterparty', props.user_id)
      getCounterparties(props.user_id, props.business_id, function(data) {
        console.log('ress', data)
        setListCounterparty(data)
      })
    }

    const handleWarehouse = () => {
      console.log('handleWarehouse', props.user_id)
      getWareHouses(props.business_id, props.user_id, function(data) {
        setListWareHouses(data)
    })
    }

    const onChangeDateStart = (event, selectedDate) => {
        const currentDate = selectedDate || dateStart;
        
        // console.log(currentDate.toLocaleDateString());
        setShowDateStart(false);
        setDateStart(currentDate);
    };
    
    const onChangeDateEnd = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnd;
        
        console.log(currentDate.toLocaleDateString());
        setShowDateEnd(false);
        setDateEnd(currentDate);
        
        //getBuyies(currentDate.toLocaleDateString())
    };

    function deleteFromListProducts() {
      let arr = listProducts.slice()
      for (let i=0; i<arr.length; i++) {
        if (arr[i].id == productBuyId) {
          arr[i].quantity = -1
        }
      }
      setListProducts(arr)

      handleInfo(arr)
    }

    function handleDeleteBuyProduct() {
      console.log('productBuyId', productBuyId)
      deleteFromListProducts()
    }
    
    
    useEffect(() => {
      console.log('useEffect handleBuy')
      

      let d = new Date()
      d.setHours(0, 0, 0, 0);
      setDateStart(d)
      let de = new Date()
      de.setHours(23,59,59,0);
      setDateEnd(de)

      handleBuy()
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
        
        {/* Modal select Counterparties */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalCounterPartys}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalCounterPartys(!ShowModalCounterPartys);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%', height: '90%', backgroundColor: '#F6F6F6', borderRadius: 5, padding: 0}]}>
              <Text style={{margin:20, textAlign: "center"}}>Выберите поставщика</Text>
              <View style={{ width: '100%'}}>
                <ScrollView style={{width: '100%', padding: 10}}>
                  {/* buyieslist */}
                  { listCounterparty !== null &&
                    listCounterparty !== undefined &&
                    listCounterparty.map((Counterparty) => (                    
                        <TouchableOpacity 
                          style={{backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}} 
                          key={Counterparty.id} 
                          onPress={() => {
                            setCounterparty_id(Counterparty.id)
                            setCounterpartyName(Counterparty.name)
                            setShowModalCounterPartys(false)
                          }}>
                          <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{Counterparty.name}</Text>
                          </View> 
                          <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                            <Text style={{textAlign: 'center'}}>{'Адрес: ' + Counterparty.address}</Text>
                          </View> 
                        </TouchableOpacity>
                      ))
                      }
                </ScrollView>
              </View>
            </View>
            
          </View>
        </Modal>

        {/* Modal select Warehouses */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalWarehouse}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalWarehouse(!ShowModalWarehouse);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%', height: '90%', backgroundColor: '#F6F6F6', borderRadius: 5, padding: 0}]}>
              <Text style={{margin:20, textAlign: "center"}}>Выберите склад</Text>
              <View style={{ width: '100%'}}>
                <ScrollView style={{width: '100%', padding: 10}}>
                  {/* List WareHouses */}
                  { ListWareHouses !== null &&
                    ListWareHouses !== undefined &&
                    ListWareHouses.map((WareHouse) => (                    
                        <TouchableOpacity 
                          style={{backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}} 
                          key={WareHouse.id} 
                          onPress={() => {
                            setWareHouse_id(WareHouse.id)
                            setWarehouseName(WareHouse.name)
                            setShowModalWarehouse(false)
                          }}>
                          <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{WareHouse.name}</Text>
                          </View>  
                        </TouchableOpacity>
                      ))
                      }
                </ScrollView>
              </View>
            </View>
            
          </View>
        </Modal>

        {/* Modal addProduct */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalAddProduct}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalAddProduct(!ShowModalAddProduct);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%', height: '90%', backgroundColor: '#F6F6F6', borderRadius: 5, padding: 0}]}>
              <TouchableOpacity style={{alignSelf: 'flex-end', margin: 5}}
                onPress={() => {
                  setShowModalAddProduct(!ShowModalAddProduct)
                }}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
              
              <Products user_id={props.user_id} business_id={props.business_id} addToSaleProduct={addToBuyProduct}/>
            </View>
            
          </View>
        </Modal>

        {/* Modal ShowChoiceAction */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowChoiceAction}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowChoiceAction(!ShowChoiceAction);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '70%', backgroundColor: '#F6F6F6', borderRadius: 5, padding: 10}]}>
              <Text>{productBuyName}</Text>
              <View style={{ width: '80%', marginTop: 20}}>
                  <TouchableOpacity style={{backgroundColor: '#ffd6ba', margin: 10, padding: 10, borderRadius: 5}}
                    onPress={() => {
                      handleDeleteBuyProduct()
                    }}
                  >
                    <Text style={{textAlign: 'center'}}>{'Удалить'}</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={{backgroundColor: '#ffd6ba', margin: 10, padding: 10, borderRadius: 5}}>
                    <Text style={{textAlign: 'center'}}>{'Редактировать'}</Text>
                  </TouchableOpacity> */}
              </View>
            </View>
            
          </View>
        </Modal>

        {Content == 'list_buyies' ? (
              <>
                <View style={[Styles.centeredView, {width: '90%', marginTop: 20}]}>
            
                  {/* <Text style={{fontSize: 20, marginBottom: 7}}>{'Ваши предприятия'}</Text>  */}
                  <TouchableOpacity 
                    style={{position: 'absolute', top: '90%', zIndex: 1}}
                    onPress={() => {
                      setBuyId(0)
                      setTypeBuy('Новое поступление')
                      setContent('new_buy')
                      setStatusBuy('')
                      setCounterpartyName('')
                      setWarehouseName('')
                    }}
                  >
                    <View style={Styles.button}>
                      <Text >{'Новое поступление'}</Text>
                    </View>
                  </TouchableOpacity>

                  
                  {showDateStart && (<DateTimePicker
                      testID="dateTimePicker"
                      value={dateStart}
                      mode={mode}
                      display="default"
                      onChange={onChangeDateStart}
                  />)}
                  {showDateEnd && (<DateTimePicker
                      testID="dateTimePicker"
                      value={dateEnd}
                      mode={mode}
                      display="default"
                      onChange={onChangeDateEnd}
                  />)}

                  <View>
                    <View style={{flexDirection:"row"}}>
                                <TouchableOpacity  style={{margin:10}} onPress={() => setShowDateStart(true)}>
                                  <Text>
                                      {dateStart.toLocaleDateString()}
                                  </Text>
                                </TouchableOpacity>
                                <Divider orientation="vertical" width={1} />
                                <TouchableOpacity  style={{margin:10}} onPress={() => setShowDateEnd(true)}>
                                  <Text>
                                      {dateEnd.toLocaleDateString()}
                                  </Text>
                                </TouchableOpacity>
                                <Divider orientation="vertical" width={1} />
                                <TouchableOpacity  style={{margin:10}} onPress={() => {
                                  handleBuy()
                                }}>
                                  <Text>
                                      Применить
                                  </Text>
                                </TouchableOpacity>
                    </View>
                  </View>
                  <ScrollView style={{width: '90%'}}>
                    {/* buyieslist */}
                    { listBuy !== null &&
                      listBuy !== undefined &&
                      listBuy.map((buy) => (                    
                          <TouchableOpacity style={{backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}} key={buy.id} 
                            onPress={() => {
                              setBuyId(buy.id)
                              setTypeBuy('Поступление')
                              handleProducts(buy.id)
                              setCounterparty_id(buy.counterparty_id)
                              setStatusBuy(buy.status)
                              setCounterpartyName(buy.name)
                              setWarehouseName(buy.warehouse_name)
                              setWareHouse_id(buy.warehouse_id) 
                              setContent('new_buy')
                            }}
                          >
                            <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                              <Text style={{flex:3, textAlign: 'center', fontWeight: 'bold'}}>{buy.name + ', ' + buy.address}</Text>
                              <Text style={{marginEnd:3, flex:1, textAlign: 'right', color: buy.status == 'isbuyied' ? '#264653': '#264653'}}>
                                {buy.status == 'isbuyied' ? 'Проведена': ''}
                              </Text>
                            </View> 
                            <View style={{flexDirection: "row", paddingTop: 10 }}>   
                              <View style={{flex: 1}}>
                                <Text style={{textAlign: 'left'}}>{'Дата: '}</Text>
                                <Text style={{textAlign: 'left'}}>{buy.datetime.slice(0, 10)}</Text>
                              </View>                      
                              <View style={{flex: 1}}>
                                <Text style={{textAlign: 'left'}}>{'Сумма: '}</Text>
                                <Text style={{textAlign: 'left'}}>{buy.sumrub + ' руб'}</Text>
                              </View> 

                            </View> 
                            
                          </TouchableOpacity>
                        ))
                        }
                  </ScrollView>
                </View>
              </>
            ): null}

        {Content == 'new_buy' ? (
          <>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', margin: 10}} onPress={() => {
                setContent('list_buyies')
                setCounterpartyName('')
                setListProducts([])
              }}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
              
              {statusBuy == '' ? (
              <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', margin: 10}} onPress={() => {
                if (CounterpartyName == '') {
                  Alert.alert('Выберите покупателя')
                }
                else if (WarehouseName == '') {
                  Alert.alert('Выберите склад')
                }
                else {
                  handleNewBuy()
                  handleBuy()
                  setContent('list_buyies')
                }
                
              }}>
                <AntDesign name="check" size={30} color="green" />
              </TouchableOpacity>): null}
            </View>
              
            <Text style={{fontSize: 5}}>{BuyId}</Text>

            <View style={{alignItems: 'flex-end'}}>
                {statusBuy == 'isbuyied' ? 
                (
                  <Text style={{margin: 10}}>{'Проведена'}</Text>
                ):
                (
                  typeBuy == 'Новое поступление' || isUpdate ?
                  <TouchableOpacity 
                    style={{
                      backgroundColor: '#ccb3a9', 
                      padding: 5, 
                      width: '30%', 
                      margin: 10, 
                      alignItems: 'center',
                      borderRadius: 5
                    }} 
                    onPress={() => {
                      if (CounterpartyName == '') {
                        Alert.alert('Выберите поставщика')
                      }
                      else if (WarehouseName == '') {
                        Alert.alert('Выберите склад')
                      }
                      else {
                        handleNewBuy()
                      }
                    }}
                  >
                    <Text>{'Сохранить'}</Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity 
                    style={{
                        backgroundColor: '#ccb3a9', 
                        padding: 5, 
                        width: '30%', 
                        margin: 10, 
                        alignItems: 'center',
                        borderRadius: 5
                      }}
                    onPress={() => {
                      handleSetStatus()
                    }}
                  >
                    <Text>
                      {statusBuy == '' ? 'Провести': 'Проведена'}
                    </Text>
                  </TouchableOpacity>
                )
                }
            </View>
            
            <View style={{ alignItems: 'center', }}>
              <Text style={{padding: 0, fontSize: 20,}}>
                {typeBuy}
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
              <Text style={{flex: 1}}>
                {'Поставщик:'}
              </Text>
              <Text style={{flex: 1, marginLeft: 10}}>
                {'Склад:'}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity 
                  style={{
                      flex: 1,
                      backgroundColor: '#D8E3E7', 
                      padding: 5, 
                      width: '50%', 
                      margin: 5, 
                      alignItems: 'center',
                      borderRadius: 5
                    }}
                  onPress={() => {
                    handleCounterparty()
                    setShowModalCounterPartys(true)
                  }}
                >
                  <Text>
                    {CounterpartyName == '' ? 'Выбрать': CounterpartyName}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{
                      flex: 1,
                      backgroundColor: '#D8E3E7', 
                      padding: 5, 
                      width: '50%', 
                      margin: 5, 
                      alignItems: 'center',
                      borderRadius: 5
                    }}
                  onPress={() => {
                    handleWarehouse()
                    setShowModalWarehouse(true)
                  }}
                >
                  <Text>
                    {WarehouseName == '' ? 'Выбрать': WarehouseName}
                  </Text>
                </TouchableOpacity>
            </View>

            {/* info */}
            <View style={{flexDirection: 'row', marginTop: 5, marginLeft: 10}}>
              <Text style={{flex: 1}}>
                {'Всего штук::'}
              </Text>
              <Text style={{flex: 1, marginLeft: 10}}>
                {'Общая стоимость:'}
              </Text>
            </View>
            
            <View style={{flexDirection: 'row'}}>
                <View 
                  style={{
                      flex: 1,
                      // backgroundColor: '#D8E3E7', 
                      padding: 5, 
                      width: '50%', 
                      margin: 5, 
                      alignItems: 'center',
                      // borderRadius: 5
                    }}
                >
                  <Text>
                    {SumQuantity}
                  </Text>
                </View>
                <View 
                  style={{
                      flex: 1,
                      // backgroundColor: '#D8E3E7', 
                      padding: 5, 
                      width: '50%', 
                      margin: 5, 
                      alignItems: 'center',
                      // borderRadius: 5
                    }}
                >
                  <Text>
                    {SumMoney}
                  </Text>
                </View>
            </View>
            <View style={{marginTop: 10, marginLeft: 10, marginBottom: 10}}>
              <Text style={{fontWeight: 'bold'}}>
                {'Товары:'}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                  <Text style={{flex: 3, marginLeft: 12}}>
                    {'Название'}
                  </Text>
                  <Text style={{flex:1, textAlign: 'center'}}>{'Кол-во'}</Text>
                  <Text style={{flex:1, textAlign: 'center'}}>{'Цена'}</Text>
                  <Text style={{flex:1, textAlign: 'center'}}>{'Сумма'}</Text>
            </View>
            <Divider orientation="horizontal" width={1} />

            <ScrollView style={{width: '95%', alignSelf: 'center'}}>
              {/* buyieslist */}
              { listProducts !== null &&
                listProducts !== undefined &&
                listProducts.map((product) => (                    
                    <TouchableOpacity 
                      style={{
                        backgroundColor: '#DDDDDD', 
                        borderRadius: 5, 
                        padding: 3, 
                        margin: 3,
                        display: product.quantity == -1 ? 'none': 'flex',
                      }} 
                      key={product.id} 
                      onPress={() => {
                        setproductBuyName(product.name)
                        productBuyId = product.id
                        console.log('product.id', product.id)
                        setShowChoiceAction(true)
                      }}>
                      <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                        <Text style={{flex:3, textAlign: 'left', fontWeight: 'bold'}}>{product.name}</Text>
                        <Text style={{flex:1, textAlign: 'center'}}>{product.quantity}</Text>
                        <Text style={{flex:1, textAlign: 'center'}}>{product.price}</Text>
                        
                        <Text style={{flex:1, textAlign: 'right'}}>{Math.round(product.price*product.quantity*100)/100}</Text>
                      </View> 
                    </TouchableOpacity>
                  ))
                  }
            </ScrollView>

            {statusBuy == '' ? (<TouchableOpacity 
              style={{position: 'absolute', top: '90%', zIndex: 1, alignSelf: 'center'}}
              onPress={() => {
                setShowModalAddProduct(true)
              }}
            >
              <View style={Styles.button}>
                <Text >{'Добавить товар'}</Text>
              </View>
            </TouchableOpacity>): null}       
            
          </>
        ): null}
              
          
        
      </>
    );
  }