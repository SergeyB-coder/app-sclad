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
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';

import { AntDesign } from '@expo/vector-icons'
import Styles from '../Styles';

import {getPayments, sendNewPayment, getCounterparties, getSales, getBuyies} from '../my_func'
import { Divider } from 'react-native-elements';

export const Payment = (props) => {
    const bank_id = props.bank_id
    const bank_name = props.bank_name
    const setContent = props.setContent
    const navigation = useNavigation();
    const [listPayment, setListPayment] = useState([]);
    const [nameNewPayment, setNameNewPayment] = useState('')
    const [balanceNewPayment, setBalanceNewPayment] = useState('')
    const [addressNewPayment, setAddressNewPayment] = useState('')
    const [modalLoadVisible, setModalLoadVisible] = useState(false);
    const [ShowModalNewPayment, setShowModalNewPayment] = useState(false);
    const [is_cash, setIs_cash] = useState(false);

    //counterpartyies
    const [listCounterparty, setListCounterparty] = useState([]);
    const [ShowModalCounterPartys, setShowModalCounterPartys] = useState(false)
    const [counterparty_id, setCounterparty_id] = useState(0)
    const [CounterpartyName, setCounterpartyName] = useState('')

    const [money, setMoney] = useState(null);
    const [incoming, setIncoming] = useState(false);
    const [sale_id, setSale_id] = useState(0);  
    const [sale_date, setSale_date] = useState('');  
    const [sale_money, setSale_money] = useState(0);  

    const [listSales, setListSales] = useState([])
    const [isCheckedOnSale, setCheckedOnSale] = useState(false); 
    const [ShowModalSales, setShowModalSales] = useState(false); 

    const [dateStart, setDateStart] = useState(new Date())
    const [dateEnd, setDateEnd] = useState(new Date())
    const [showDateStart, setShowDateStart] = useState(false)
    const [showDateEnd, setShowDateEnd] = useState(false)

    const [mode, setMode] = useState('date');

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
    
    

    function addNewPayment(id, datetime, bank_id, counterparty_id, money, incoming, sale_id, name) {
        let arr = listPayment.slice()
        arr.push({
            'id': id, 
            'name': name, 
            'money': money, 
            'incoming': incoming, 
            'counterparty_id': counterparty_id, 
            'bank_id': bank_id, 
            'datetime': datetime,
            'sale_id': sale_id
        })
        setListPayment(arr)
    }
        
    const handlePayment = () => {
      console.log('handlePayment', bank_id)
      getPayments(bank_id, function(data) {
        console.log('ress getPayments', data)
        setListPayment(data)
      })
    }

    function handleNewPayment() {
      console.log('handleNewPayment', props.user_id)
      sendNewPayment(bank_id, counterparty_id, money, incoming, sale_id, function(data) {
        console.log('ress', data)
        if (data.res) {
          addNewPayment(data.id, data.date, bank_id, counterparty_id, money, incoming, sale_id, CounterpartyName)
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

    const handleSale = () => {
        console.log('handleSale', props.business_id)
        if (incoming) {
          getSales(props.business_id, props.user_id, dateStart, dateEnd, function(data) {
            console.log('ress', data)
            setListSales(data)
          })
        }
        else if (!incoming) {
          getBuyies(props.user_id, props.business_id, dateStart, dateEnd, function(data) {
            console.log('ress', data)
            setListSales(data)
          })
        }
        
    }

    useEffect(() => {
        console.log('date change')
        handleSale()
    }, [dateEnd, dateStart])
    
    useEffect(() => {
      console.log('useEffect handlePayment')
      handlePayment()
    }, [])

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('drawerItemPress', (e) => {
        // Prevent default behavior
        // e.preventDefault();
    
        handlePayment()
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
        
        {/* Modal new Payments */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalNewPayment}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalNewPayment(!ShowModalNewPayment);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%'}]}>
                <Text style={{fontSize: 1, color: 'white'}}>{counterparty_id}</Text>
                <Text style={{margin:20, textAlign: "center", fontWeight: 'bold'}}>Новый платеж</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{flex: 4, alignSelf: 'flex-start', marginLeft: 10}}>{'Контрагент:'}</Text>
                    
                    
                    <Text style={{flex: 2, fontSize: 12}}>По накладной</Text>
                    <View style={{flex:1}}>
                        <Checkbox
                            style={{ margin: 0}}
                            value={isCheckedOnSale}
                            onValueChange={setCheckedOnSale}
                            color={isCheckedOnSale ? '#4630EB' : undefined}
                        />
                    </View>
                </View>
                
                <View style={{flexDirection: 'row'}}>
                <TouchableOpacity 
                  style={{
                        flex: 1,
                        backgroundColor: '#D8E3E7', 
                        padding: 5, 
                        width: '50%', 
                        margin: 10, 
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                        borderRadius: 5
                    }}
                  onPress={() => {
                    if (!isCheckedOnSale) {
                        handleCounterparty()
                        setShowModalCounterPartys(true)
                    }
                    else {
                        Alert.alert('Платеж по накладной!')
                    }
                  }}
                >
                  <Text>
                    {CounterpartyName == '' ? 'Выбрать': CounterpartyName}
                  </Text>
                </TouchableOpacity>

                {isCheckedOnSale ? (
                    <TouchableOpacity 
                    style={{
                            flex: 1,
                            backgroundColor: '#D8E3E7', 
                            padding: 5, 
                            width: '50%', 
                            margin: 10, 
                            alignItems: 'center',
                            alignSelf: 'flex-start',
                            borderRadius: 5
                        }}
                    onPress={() => {
                        handleSale()
                        setShowModalSales(true)
                    }}
                    >
                    <Text>
                        {sale_id == 0 ? 'Накладная': sale_date + '   ' + sale_money + ' руб'}
                    </Text>
                    </TouchableOpacity>
                ): (
                    <View style={{
                        flex: 1,
                        padding: 5, 
                        width: '50%', 
                        margin: 10, 
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                    }}>

                    </View>
                )}
                </View>
                
                <TextInput
                    style={[Styles.inputname, {alignSelf: 'flex-start', marginLeft: 10}]}
                    onChangeText={setMoney}
                    value={money}
                    keyboardType="numeric"
                    placeholder="Сумма"
                />

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{backgroundColor: incoming ? '#8CC084': '#FFFFFF', margin: 10, borderRadius: 7, padding: 3}}
                    onPress={() => {setIncoming(true)}}
                    >
                    <Text style={{color: incoming ? 'black': '#DCCCA3'}}>{'Входящий'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: incoming ? '#FFFFFF': '#8CC084', margin: 10, borderRadius: 7, padding: 3}}
                    onPress={() => {setIncoming(false)}}
                    >
                    <Text style={{color: incoming ? '#DCCCA3': 'black'}}>{'Исходящий'}</Text>
                    </TouchableOpacity>
                </View>
                
                <Pressable
                    style={[Styles.button, Styles.buttonClose]}
                    onPress={() => {
                        setShowModalNewPayment(!ShowModalNewPayment);
                        handleNewPayment()
                    }}
                >
                    <Text style={Styles.textStyle}>Создать</Text>
                </Pressable>
            </View>
          </View>
        </Modal>

        {/* Modal select sale */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalSales}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalSales(!ShowModalSales);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%', height: '90%', backgroundColor: '#F6F6F6', borderRadius: 5, padding: 0}]}>
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
                <Text style={{margin:20, textAlign: "center"}}>Выберите накладную</Text>
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
                </View>

                <View style={{ width: '100%'}}>
                    <ScrollView style={{width: '100%', padding: 10}}>
                    {/* saleslist */}
                    { listSales !== null &&
                        listSales !== undefined &&
                        listSales.map((sale) => (                    
                            <TouchableOpacity 
                                style={{backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}} 
                                key={sale.id} 
                                onPress={() => {
                                    setSale_id(sale.id)
                                    setSale_date(sale.datetime.slice(0, 10))
                                    setSale_money(sale.sumrub)
                                    setCounterpartyName(sale.name)
                                    setCounterparty_id(sale.counterparty_id)
                                    setShowModalSales(false)
                                }}
                            >
                                <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                                    <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{sale.name + ', ' + sale.address}</Text>
                                </View> 
                                <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                                    <Text style={{flex:3, textAlign: 'left'}}>{sale.datetime.slice(0, 10)}</Text>
                                    <Text style={{flex: 1}}>{sale.sumrub + ' руб'}</Text>
                                </View> 
                            </TouchableOpacity>
                        ))
                        }
                    </ScrollView>
                </View>
            </View>
            
          </View>
        </Modal>

        <View style={[Styles.centeredView, {width: '90%', marginTop: 20}]}>
            <View style={{ width: '100%'}}>
              <TouchableOpacity style={{ alignItems: 'flex-start', margin: 10}} onPress={() => {
                  setContent('banks')
                  props.handleBank()
                }}>
                  <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={{position: 'absolute', top: '90%', zIndex: 1}}
              onPress={() => {
                console.log('test')
                setShowModalNewPayment(true)
              }}
            >
              <View style={Styles.button}>
                <Text >{'Новый платеж'}</Text>
              </View>
            </TouchableOpacity>

            <View style={{width: '90%'}}>
                <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{'Операции по счету'}</Text>
                <Text style={{textAlign: 'center'}}>{bank_name}</Text>
            </View>
            <ScrollView style={{width: '90%', marginTop: 10}}>
              {/* saleslist */}
              { listPayment !== null &&
                listPayment !== undefined &&
                listPayment.map((Payment) => (                    
                    <TouchableOpacity style={{backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}} key={Payment.id} onPress={() => {
                      
                    }}>
                      <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                        <Text style={{flex: 6, textAlign: 'left', fontWeight: 'bold'}}>{Payment.name}</Text>
                        <View style={{flex: 1}}>
                            {Payment.incoming ? (
                                <AntDesign name="login" size={24} color="green" />
                            ): (
                                <AntDesign name="logout" size={24} color="red" />
                            )}
                        </View>
                      </View> 
                      <View style={{flexDirection: "row", paddingTop: 1 }}>                         
                        <Text style={{textAlign: 'center'}}>{'Сумма: ' + Payment.money}</Text>
                      </View> 
                    </TouchableOpacity>
                  ))
                  }
            </ScrollView>
          
        </View>
      </>
    );
  }