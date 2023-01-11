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

import {getSales, sendNewSale, getCounterparties, getSaleProducts, sendNewStatus, getWareHouses} from '../my_func'
import { Products } from './Products';


    var productSaleId = 0
export const Sales = (props) => {
    const [productSaleName, setproductSaleName] = useState(0)
    const navigation = useNavigation();
    const [typeSale, setTypeSale] = useState('Новая продажа')
    const [listSale, setListSale] = useState([]);
    const [SaleId, setSaleId] = useState('');
    const [statusSale, setStatusSale] = useState('');

    const [listProducts, setListProducts] = useState([]);
    
    const [listCounterparty, setListCounterparty] = useState([]);
    const [Content, setContent] = useState('list_sales')
    const [CounterpartyName, setCounterpartyName] = useState('')

    const [WarehouseName, setWarehouseName] = useState('')
    const [ListWareHouses, setListWareHouses] = useState([])
    const [WareHouse_id, setWareHouse_id] = useState(0)

    const [counterparty_id, setCounterparty_id] = useState(0)
    const [product_id, setProduct_id] = useState(0);
    const [price, setPrice] = useState(0);
    const [ShowModalNewSale, setShowModalNewSale] = useState(false);
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


    function addNewSale(name, sale_id, address) {
      let arr = listSale.slice()
      arr.push({'id': sale_id, 'name': name, 'address': address})
      setListSale(arr)
    }

    function handleInfo(data) {
      let sumMoney = 0
      let q = 0
      data.forEach(element => {
        sumMoney += element.price * element.quantity
        q += parseInt(element.quantity)
      });
      setSumMoney(sumMoney)
      setSumQuantity(q)
    }

    function handleSetStatus() {
      if (statusSale == '') {
        sendNewStatus(props.user_id, SaleId, 'isload', WareHouse_id, counterparty_id, function(data) {
            console.log('ress handleSetStatus', data)
            if (data.res) {
              
              setStatusSale('isload')
              handleNewSale()
            }
            else {
              Alert.alert('У вас нет доступа')
            }
          }
        )
      }
      else if (statusSale == 'isload') {
        sendNewStatus(props.user_id, SaleId, 'issaled', WareHouse_id, counterparty_id, function(data) {
          console.log('ress handleSetStatus', data)
          if (data.res) {
            setStatusSale('issaled')
          }
          else {
            Alert.alert('У вас нет доступа')
          }
        }
      )
      }
    }

    function addToSaleProduct(name, price, quantity, product_id) {
      let arr = listProducts.slice()
      arr.push({'id':  -arr.length, 'name': name, 'price': price, 'quantity': quantity, 'product_id': product_id})
      setListProducts(arr)

      handleInfo(arr)
      if (typeSale == 'Продажа') {
        setIsUpdate(true)
      }
    }

    function deleteFromListProducts() {
      let arr = listProducts.slice()
      for (let i=0; i<arr.length; i++) {
        if (arr[i].id == productSaleId) {
          arr[i].quantity = -1
        }
      }
      setListProducts(arr)

      handleInfo(arr)
      if (typeSale == 'Продажа') {
        setIsUpdate(true)
      }
    }

    function handleProducts(sale_id) {
      getSaleProducts(sale_id, function(data) {
        console.log('ress handleProducts', data)
        setListProducts(data)
        handleInfo(data)
      })
    }
        
    const handleSale = () => {
      console.log('handleSale', props.business_id)
      getSales(props.business_id, props.user_id, dateStart, dateEnd, function(data) {
        console.log('ress', data)
        setListSale(data)
      })
    }

    function handleNewSale() {
      console.log('handleNewSale', listProducts)
      sendNewSale(props.business_id, counterparty_id, listProducts, typeSale, SaleId, WareHouse_id, function(data) {
        console.log('ress', data)
        if (data.res) {
          setSaleId(data.id)
          setTypeSale('Продажа')
          handleProducts(data.id)
          handleSale()
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
        
        //getSales(currentDate.toLocaleDateString())
    };

    function handleDeleteSaleProduct() {
      console.log('productSaleId', productSaleId)
      deleteFromListProducts()
    }
    
    useEffect(() => {
      console.log('useEffect handleSale')
      

      let d = new Date()
      d.setHours(0, 0, 0, 0);
      setDateStart(d)
      let de = new Date()
      de.setHours(23,59,59,0);
      setDateEnd(de)

      handleSale()
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
              <Text style={{margin:20, textAlign: "center"}}>Выберите покупателя</Text>
              <View style={{ width: '100%'}}>
                <ScrollView style={{width: '100%', padding: 10}}>
                  {/* saleslist */}
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
              <Text>{productSaleName}</Text>
              <View style={{ width: '80%', marginTop: 20}}>
                  <TouchableOpacity style={{backgroundColor: '#ffd6ba', margin: 10, padding: 10, borderRadius: 5}}
                    onPress={() => {
                      handleDeleteSaleProduct()
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
              
              <Products user_id={props.user_id} business_id={props.business_id} addToSaleProduct={addToSaleProduct}/>
            </View>
            
          </View>
        </Modal>

        {Content == 'list_sales' ? (
              <>
                <View style={[Styles.centeredView, {width: '90%', marginTop: 20}]}>
            
                  {/* <Text style={{fontSize: 20, marginBottom: 7}}>{'Ваши предприятия'}</Text>  */}
                  <TouchableOpacity 
                    style={{position: 'absolute', top: '90%', zIndex: 1}}
                    onPress={() => {
                      setSaleId(0)
                      setTypeSale('Новая продажа')
                      setContent('new_sale')
                      setStatusSale('')
                      setCounterpartyName('')
                      setWarehouseName('')
                      setSumMoney(0)
                      setSumQuantity(0)
                    }}
                  >
                    <View style={Styles.button}>
                      <Text >{'Новая продажа'}</Text>
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
                                  handleSale()
                                }}>
                                  <Text>
                                      Применить
                                  </Text>
                                </TouchableOpacity>
                    </View>
                  </View>
                  <ScrollView style={{width: '90%'}}>
                    {/* saleslist */}
                    { listSale !== null &&
                      listSale !== undefined &&
                      listSale.map((sale) => (                    
                          <TouchableOpacity style={{backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}} key={sale.id} 
                            onPress={() => {
                              setSaleId(sale.id)
                              setTypeSale('Продажа')
                              handleProducts(sale.id)
                              setCounterparty_id(sale.counterparty_id)
                              setStatusSale(sale.status)
                              setCounterpartyName(sale.name)
                              setWarehouseName(sale.warehouse_name)
                              setWareHouse_id(sale.warehouse_id) 
                              setContent('new_sale')
                              setIsUpdate(false)
                            }}
                          >
                            <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                              <Text style={{flex:3, textAlign: 'left', fontWeight: 'bold'}}>{sale.name + ', ' + sale.address}</Text>
                              <Text style={{marginEnd:3, flex:1, textAlign: 'right', color: sale.status == 'isload' ? '#e76f51': '#264653'}}>
                                {sale.status == 'isload' ? 'Собрана': (sale.status == 'issaled' ? 'Проведена' : '')}
                              </Text>
                            </View> 
                            <View style={{flexDirection: "row", paddingTop: 10 }}>   
                              <View style={{flex: 1}}>
                                <Text style={{textAlign: 'left'}}>{'Дата: '}</Text>
                                <Text style={{textAlign: 'left'}}>{sale.datetime.slice(0, 10)}</Text>
                              </View>                      
                              <View style={{flex: 1}}>
                                <Text style={{textAlign: 'left'}}>{'Сумма: '}</Text>
                                <Text style={{textAlign: 'left'}}>{Math.round(sale.sumrub*100)/100 + ' руб'}</Text>
                              </View> 

                            </View> 
                            
                          </TouchableOpacity>
                        ))
                        }
                  </ScrollView>
                </View>
              </>
            ): null}

        {Content == 'new_sale' ? (
          <>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', margin: 5}} onPress={() => {
                setContent('list_sales')
                handleSale()
                setCounterpartyName('')
                setListProducts([])
              }}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
              
              {statusSale == '' ? (
              <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', margin: 5}} onPress={() => {
                if (CounterpartyName == '') {
                  Alert.alert('Выберите покупателя')
                }
                else if (WarehouseName == '') {
                  Alert.alert('Выберите склад')
                }
                else {
                  handleNewSale()
                  
                  setContent('list_sales')
                }
                
              }}>
                <AntDesign name="check" size={30} color="green" />
              </TouchableOpacity>): null}
            </View>
              
            <Text style={{fontSize: 5, color: 'white'}}>{SaleId}</Text>

            <View style={{alignItems: 'flex-end'}}>
                {statusSale == 'issaled' ? 
                (
                  <Text style={{margin: 5}}>{'Проведена'}</Text>
                ):
                (
                  typeSale == 'Новая продажа' || isUpdate ?
                  <TouchableOpacity 
                    style={{
                      backgroundColor: '#ccb3a9', 
                      padding: 5, 
                      width: '30%', 
                      margin: 5, 
                      alignItems: 'center',
                      borderRadius: 5
                    }} 
                    onPress={() => {
                      if (CounterpartyName == '') {
                        Alert.alert('Выберите покупателя')
                      }
                      else if (WarehouseName == '') {
                        Alert.alert('Выберите склад')
                      }
                      else {
                        handleNewSale()
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
                      {statusSale == '' ? 'Собрать': null}
                      {statusSale == 'isload' ? 'Провести': null}
                    </Text>
                  </TouchableOpacity>
                )
                }
            </View>
            
            <View style={{ alignItems: 'center', }}>
              <Text style={{padding: 0, fontSize: 20,}}>
                {typeSale}
              </Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
              <Text style={{flex: 1}}>
                {'Покупатель:'}
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
            <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10}}>
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
                    {Math.round(SumMoney*100)/100}
                  </Text>
                </View>
            </View>

            <View style={{marginTop: 5, marginLeft: 10, marginBottom: 10}}>
              <Text style={{fontWeight: 'bold'}}>
                {'Товары:'}
              </Text>
            </View>
            <Divider orientation="horizontal" width={1} />
            <View style={{flexDirection: 'row'}}>
                <Text style={{flex:3, textAlign: 'left'}}>{'Продукт'}</Text>
                
                <Text style={{flex:1, textAlign: 'center'}}>{'Кол-во'}</Text>
                <Text style={{flex:1, textAlign: 'center'}}>{'Цена'}</Text>
                <Text style={{flex:1, textAlign: 'center'}}>{'Сумма'}</Text>
            </View>
            <Divider orientation="horizontal" width={1} />
            <ScrollView style={{width: '95%', alignSelf: 'center'}}>
              {/* saleslist */}
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
                        //   navigation.navigate('Work', {user_id: props.user_id, sale_id: sale.id})
                        // setproductSaleId(product.id)
                        setproductSaleName(product.name)
                        productSaleId = product.id
                        console.log('product.id', product.id)
                        setShowChoiceAction(true)
                      }}>
                        <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                          <Text style={{flex:3, textAlign: 'left', fontWeight: 'bold'}}>{product.name}</Text>
                          
                          <Text style={{flex:1, textAlign: 'right'}}>{product.quantity}</Text>
                          <Text style={{flex:1, textAlign: 'right'}}>{product.price}</Text>
                          <Text style={{flex:1, textAlign: 'right'}}>{Math.round(product.price*product.quantity*100)/100}</Text>
                        </View> 

                        
                      </TouchableOpacity>
                    

                  ))
                  }
            </ScrollView>

            {statusSale == '' ? (<TouchableOpacity 
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