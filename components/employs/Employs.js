import React, {useState, useEffect, Component} from 'react';
import {
  Alert,
  Modal,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  ScrollView
} from 'react-native';
import Checkbox from 'expo-checkbox';
import {useNavigation} from '@react-navigation/native'

import { AntDesign } from '@expo/vector-icons'; 
import Styles from '../Styles';

import {
  getEmploys, 
  sendNewEmploy, 
  sendInfoEmploy, 
  getRoles, 
  sendDeleteEmployRole, 
  sendSetEmployRole,
  getRoleCounters,
  getCounterparties,
  sendSetCounter,
  sendSetSalaryType,
} from '../my_func'

export const Employs = (props) => {
    const navigation = useNavigation();
    const [listEmploy, setListEmploy] = useState([]);
    const [nameNewEmploy, setNameNewEmploy] = useState('')
    const [mailNewEmploy, setMailNewEmploy] = useState('')

    const [listRoles, setListRoles] = useState([])
    const [listEmployRoles, setListEmployRoles] = useState([])
    const [mailEmploy, setMailEmploy] = useState('')
    const [Employ_Id, setEmploy_Id] = useState('')
    const [nameEmploy, setNameEmploy] = useState('')
    
    const [InfoEmployContent, setInfoEmployContent] = useState('list_roles')
    const [listRoleCounters, setListRoleCounters] = useState([])
    const [listCounters, setListCounters] = useState([])
    const [RoleEmployId, setRoleEmployId] = useState(0)

    const [Content, setContent] = useState('list_employ')
    const [modalLoadVisible, setModalLoadVisible] = useState(false);
    const [ShowModalNewEmploy, setShowModalNewEmploy] = useState(false);
    const [ShowModalNewRole, setShowModalNewRole] = useState(false);
    const [SelectedRoleId, setSelectedRoleId] = useState(0);
    const [SelectedCounterId, setSelectedCounterId] = useState(0);
    
    const [ShowModalNewCounterparty, setShowModalNewCounterparty] = useState(false);
    const [ShowModalSalaryType, setShowModalSalaryType] = useState(false);
    const [isSelectedChProc, setSelectionChProc] = useState(false);
    const [isSelectedChPie, setSelectionChPie] = useState(false);
    const [salary, setSalary] = useState('');

    const [RoleCounterId, setRoleCounterId] = useState(0)
       

    function addNewEmploy(name, employ_id) {
      let arr = listEmploy.slice()
      arr.push({'id': employ_id, 'name': name})
      setListEmploy(arr)
    }
        
    const handleEmploy = () => {
      console.log('handleEmploy', props.user_id)
      getEmploys(props.user_id, props.business_id, function(data) {
        console.log('ress', data)
        setListEmploy(data)
      })
    }

    function handleNewEmploy() {
      console.log('handleNewEmploy', props.user_id)
      sendNewEmploy(props.business_id, nameNewEmploy, mailNewEmploy, function(data) {
        console.log('ress', data)
        if (data.res) {
          addNewEmploy(nameNewEmploy, data.id)
        }
      })
    }

    function handleInfoEmploy(employ_id) {
      console.log('handleInfoEmploy', props.user_id)
      sendInfoEmploy(employ_id, function(data) {
        console.log('ress handleInfoEmploy', data)
        if (data.res) {
          setListEmployRoles(data.roles)
          setMailEmploy(data.mail_employ)
          setNameEmploy(data.name_employ)
        }
      })
    }

    function handleRoles() {
      getRoles(Employ_Id, function(data) {
        console.log('ress handleRoles', data)
        if (data.res) {
          setListRoles(data.roles)
        }
      })
    }

    function handleDeleteEmployRole(role_id) {
      sendDeleteEmployRole(role_id, function(data) {
        console.log('ress handleDeleteEmployRole', data)
        if (data.res) {
          let arr = []
          for (let i=0; i<listEmployRoles.length; i++) {
            if (listEmployRoles[i].id != role_id) {
              arr.push(listEmployRoles[i])
            }
          }
          setListEmployRoles(arr)
        }
      })
    }

    
    function handleSetRole(role_id) {
      sendSetEmployRole(Employ_Id, role_id, function(data) {
        console.log('ress handleSetRole', data)
        if (data.res) {
          handleInfoEmploy(Employ_Id)
        }
      })
    }

    function handleRoleCounters(role_id) {
      getRoleCounters(role_id, Employ_Id, function(data) {
        console.log('ress handleRoleCounters', data)
        if (data.res) {
          setListRoleCounters(data.list_role_counters)
        }
      })
    }

    function handleCounterparties() {
      getCounterparties(props.user_id, props.business_id, function(data) {
        console.log('ress handleCounterparties', data)
        setListCounters(data)
      })
    }

    function handleSetCounter() {
      sendSetCounter(RoleEmployId, SelectedCounterId, function(data) {
        console.log('ress handleSetCounter', data)
        handleRoleCounters(RoleEmployId)
      })
    }

    function handleSetSalaryType() {
      let type_salary = '%'
      if (isSelectedChPie) {
        type_salary = 'pie'
      } 
      sendSetSalaryType(RoleCounterId, type_salary, salary, function(data) {
        console.log('ress handleSetSalaryType', data)
        handleRoleCounters(RoleEmployId)
      })
    }
    
    useEffect(() => {
      console.log('useEffect handleEmploy')
      handleEmploy()
    }, [])

    useEffect(() => {
      if (isSelectedChProc) {
        setSelectionChPie(false)
      }
    }, [isSelectedChProc])

    useEffect(() => {
      if (isSelectedChPie) {
        setSelectionChProc(false)
      }
    }, [isSelectedChPie])

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
        
        {/* Modal new Employs */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalNewEmploy}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalNewEmploy(!ShowModalNewEmploy);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%'}]}>
              <Text style={{margin:20, textAlign: "center"}}>Данные контрагента</Text>
              <TextInput
                style={Styles.inputname}
                onChangeText={setNameNewEmploy}
                value={nameNewEmploy}
                //keyboardType="numeric"
                placeholder="Название"
              />

              <TextInput
                style={Styles.inputname}
                onChangeText={setMailNewEmploy}
                value={mailNewEmploy}
                keyboardType="email-address"
                placeholder="Email"
              />
              
              <Pressable
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => {
                  setShowModalNewEmploy(!ShowModalNewEmploy);
                  handleNewEmploy()
                }}
              >
                <Text style={Styles.textStyle}>Создать</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* Modal Choice Role */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalNewRole}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalNewRole(!ShowModalNewRole);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%'}]}>
              <Text style={{margin:20, textAlign: "center"}}>Выберите должность</Text>

              <ScrollView style={{width: '90%'}}>
                {/* saleslist */}
                { listRoles !== null &&
                  listRoles !== undefined &&
                  listRoles.map((role) => (                    
                      <TouchableOpacity 
                        // style={[
                        //   {backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}, 
                          
                        // ]} 
                        style={role.id == SelectedRoleId ? (
                            {backgroundColor: '#efdecd', borderRadius: 5, padding: 3, margin: 3}):
                          (
                            {backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}
                          )}
                        key={role.id} 
                        onPress={() => {
                          setSelectedRoleId(role.id)
                          // handleInfoEmploy(role.id)
                          // setContent('info_employ')
                        }}>
                        <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{role.name}</Text>
                        </View> 
                        
                      </TouchableOpacity>
                    ))
                    }
              </ScrollView>
              
              {listRoles.length > 0 ? (
                <Pressable
                  style={[Styles.button, Styles.buttonClose]}
                  onPress={() => {
                    handleSetRole(SelectedRoleId)
                    setShowModalNewRole(!ShowModalNewRole);
                  }}
                >
                  <Text style={Styles.textStyle}>Назначить</Text>
                </Pressable>
              ): null}
            </View>
          </View>
        </Modal>

        {/* Modal Choice Counter */}
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
              <Text style={{margin:20, textAlign: "center"}}>Выберите контрагента</Text>

              <ScrollView style={{width: '90%'}}>
                {/* saleslist */}
                { listCounters !== null &&
                  listCounters !== undefined &&
                  listCounters.map((counter) => (                    
                      <TouchableOpacity 
                        // style={[
                        //   {backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}, 
                          
                        // ]} 
                        style={counter.id == SelectedCounterId ? (
                            {backgroundColor: '#efdecd', borderRadius: 5, padding: 3, margin: 3}):
                          (
                            {backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}
                          )}
                        key={counter.id} 
                        onPress={() => {
                          setSelectedCounterId(counter.id)
                          // handleInfoEmploy(role.id)
                          // setContent('info_employ')
                        }}>
                        <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{counter.name}</Text>
                        </View> 
                        
                      </TouchableOpacity>
                    ))
                    }
              </ScrollView>
              
              {listCounters.length > 0 ? (
                <Pressable
                  style={[Styles.button, Styles.buttonClose]}
                  onPress={() => {
                    handleSetCounter()
                    setShowModalNewCounterparty(!ShowModalNewCounterparty);
                  }}
                >
                  <Text style={Styles.textStyle}>Назначить</Text>
                </Pressable>
              ): null}
            </View>
          </View>
        </Modal>

        {/* Modal set salary type */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={ShowModalSalaryType}
          onRequestClose={() => {
            //Alert.alert("Modal has been closed.");
            setShowModalSalaryType(!ShowModalSalaryType);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={[Styles.modalView1, {width: '90%'}]}>
              <Text style={{fontSize: 3, color: 'white'}}>{RoleCounterId}</Text>
              <Text style={{margin:20, textAlign: "center"}}>Тип расчета ЗП</Text>
              <View style={{flexDirection: 'row', margin: 10}}>
                <Checkbox
                  value={isSelectedChProc}
                  onValueChange={setSelectionChProc}
                  style={{marginRight: 5}}
                />
                <Text style={{marginRight: 35}}>{'% от прибыли'}</Text>
                <Checkbox
                  value={isSelectedChPie}
                  onValueChange={setSelectionChPie}
                  style={{marginRight: 5}}
                />
                <Text>{'За шт'}</Text>
              </View>

              <TextInput
                style={Styles.inputnum}
                onChangeText={setSalary}
                value={salary}
                keyboardType="numeric"
                placeholder={isSelectedChProc ? '%': 'руб'}
              />
              
              <Pressable
                style={[Styles.button, Styles.buttonClose]}
                onPress={() => {
                  handleSetSalaryType()
                  setShowModalSalaryType(false)
                }}
              >
                <Text style={Styles.textStyle}>Применить</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {Content == 'list_employ' ? (
          <View style={[Styles.centeredView, {width: '100%', marginTop: 20}]}>
              
              <TouchableOpacity 
                style={{position: 'absolute', top: '90%', zIndex: 1}}
                onPress={() => {
                  console.log('test')
                  setShowModalNewEmploy(true)
                }}
              >
                <View style={Styles.button}>
                  <Text >{'Добавить сотрудника'}</Text>
                </View>
              </TouchableOpacity>

              <ScrollView style={{width: '90%'}}>
                {/* saleslist */}
                { listEmploy !== null &&
                  listEmploy !== undefined &&
                  listEmploy.map((Employ) => (                    
                      <TouchableOpacity style={{backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3}} key={Employ.id} 
                        onPress={() => {
                          handleInfoEmploy(Employ.id)
                          setEmploy_Id(Employ.id)
                          setContent('info_employ')
                        }}>
                        <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                          <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{Employ.name}</Text>
                        </View> 
                        {/* <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                          <Text style={{textAlign: 'center'}}>{'Адрес: ' + Employ.address}</Text>
                        </View>  */}
                      </TouchableOpacity>
                    ))
                    }
              </ScrollView>
            
          </View>
        ): null}

        {Content == 'info_employ' ? (
          <View style={[Styles.centeredView, {width: '100%', marginTop: 20}]}>
              <Text style={{fontSize: 3, color: 'white'}}>{Employ_Id}</Text>
              <TouchableOpacity style={{alignSelf: 'flex-start', marginStart: 10}} onPress={() => {
                  setContent('list_employ')
                  }}>
                  <Text>
                  {'Назад'}
                  </Text>
              </TouchableOpacity>
              {/* NAME */}
              <View style={{alignSelf: 'flex-start', marginStart: 10}}>
                <Text style={{fontSize: 20, margin: 10}}>
                  {nameEmploy}
                </Text>
              </View>
              <View style={{alignSelf: 'flex-start', marginStart: 10}}>
                <Text style={{margin: 10}}>
                  {mailEmploy}
                </Text>
              </View>


              {InfoEmployContent == 'list_roles' ? (
                <>
                  <View style={{alignSelf: 'flex-start', marginStart: 10}}>
                    <Text style={{margin: 10}}>
                      {'Должности:'}
                    </Text>
                  </View>
                  <ScrollView style={{width: '90%'}}>
                    {/* saleslist */}
                    { listEmployRoles !== null &&
                      listEmployRoles !== undefined &&
                      listEmployRoles.map((role) => (  
                        <View key={role.id} style={{flexDirection: 'row'}}>
                          <TouchableOpacity style={{backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3, flex: 10}}  
                            onPress={() => {
                              if (role.type == 'sklad') {
                                handleRoleCounters(role.id)
                                setRoleEmployId(role.id)
                                setInfoEmployContent('sklad_salary')
                              }
                              else if (role.type == 'agent') {
                                handleRoleCounters(role.id)
                                setRoleEmployId(role.id)
                                setInfoEmployContent('sklad_salary')
                              }
                            }}>
                            <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>{role.name_role}</Text>
                            </View> 
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={{ flex: 1, alignItems: 'center', paddingTop: 7}}  
                            onPress={() => {
                              Alert.alert(
                                "Снятие должности",
                                "Вы уверены?",
                                [
                                  // The "Yes" button
                                  {
                                    text: "Да",
                                    onPress: () => {
                                      console.log('role.id', role.id)
                                      handleDeleteEmployRole(role.id)
                                    },
                                  },
                                  // The "No" button
                                  // Does nothing but dismiss the dialog when tapped
                                  {
                                    text: "Отмена",
                                  },
                                ]
                              );

                          }}>                        
                              <AntDesign name="deleteuser" size={24} color="black" />
                          </TouchableOpacity>
                        </View>                  
                        ))
                        }
                  </ScrollView>
                  <TouchableOpacity 
                    style={{position: 'absolute', top: '90%', zIndex: 1}}
                    onPress={() => {
                      handleRoles()
                      setShowModalNewRole(true)
                    }}
                  >
                    <View style={Styles.button}>
                      <Text >{'Назначить должность'}</Text>
                    </View>
                  </TouchableOpacity>
                </>
              ): null}

              {InfoEmployContent == 'sklad_salary' ? (
                <>
                  <Text style={{fontSize: 3, color: 'white'}}>{RoleEmployId}</Text>
                  <View style={{alignSelf: 'flex-start', marginStart: 10, flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity style={{flex: 1}} onPress={() => {
                      setInfoEmployContent('list_roles')
                    }}>
                      <AntDesign name="arrowleft" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{margin: 10, flex: 6}}>
                      {'Контрагенты-ставки:'}
                    </Text>
                  </View>
                  <ScrollView style={{width: '90%'}}>
                    {/* saleslist */}
                    { listRoleCounters !== null &&
                      listRoleCounters !== undefined &&
                      listRoleCounters.map((counter) => (  
                        <View key={counter.id} style={{flexDirection: 'row'}}>
                          <TouchableOpacity style={{backgroundColor: '#DDDDDD', borderRadius: 5, padding: 3, margin: 3, flex: 10}}  
                            onPress={() => {
                              setRoleCounterId(counter.id)
                              setShowModalSalaryType(true)
                            }}>
                            <View style={{flexDirection: "row", paddingTop: 10 }}>                         
                              <Text style={{flex:2, textAlign: 'left', fontWeight: 'bold'}}>{counter.name}</Text>
                              <Text style={{flex: 1}}>{'ЗП: ' + Math.round(counter.all_salary) + ' руб'}</Text>
                            </View> 
                            {counter.type_salary == '%' ? 
                              <Text>{counter.salary + ' % от прибыли'}</Text>: null}
                            {counter.type_salary == 'pie' ? 
                              <Text>{counter.salary + ' руб/шт'}</Text>: null}
                            {counter.type_salary == '' ? 
                              <Text>{''}</Text>: null}
                          </TouchableOpacity>
                          <TouchableOpacity 
                            style={{ flex: 1, alignItems: 'center', paddingTop: 7}}  
                            onPress={() => {
                              Alert.alert(
                                "Снятие контрагента",
                                "Вы уверены?",
                                [
                                  // The "Yes" button
                                  {
                                    text: "Да",
                                    onPress: () => {
                                      console.log('counter.id', counter.id)
                                      // handleDeleteEmployCounter(counter.id)
                                    },
                                  },
                                  // The "No" button
                                  // Does nothing but dismiss the dialog when tapped
                                  {
                                    text: "Отмена",
                                  },
                                ]
                              );

                          }}>                        
                              <AntDesign name="deleteuser" size={24} color="black" />
                          </TouchableOpacity>
                        </View>                  
                        ))
                        }
                  </ScrollView>
                  <TouchableOpacity 
                    style={{position: 'absolute', top: '90%', zIndex: 1}}
                    onPress={() => {
                      handleCounterparties()
                      setShowModalNewCounterparty(true)
                    }}
                  >
                    <View style={Styles.button}>
                      <Text >{'Добавить контрагента'}</Text>
                    </View>
                  </TouchableOpacity>
                </>
              ): null}

          </View>
        ): null}
      </>
    );
  }