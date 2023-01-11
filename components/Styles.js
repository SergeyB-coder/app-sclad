import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    login_header_text: {
      marginTop: 25,
      color: '#f0f0f0',
      fontSize: 20,
    },
    login_container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    login_header: {
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 10,
      backgroundColor: '#4E6680',
      height: 140,
    },
    buttonplus: {
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      height: 100,
      justifyContent: "center",
    },
    buttonNewvape: {
      flex:1,
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      //height: 39,
      justifyContent: "center",
      marginBottom: 10,
      borderWidth:1,
      borderRadius: 3,
    },
    
    input: {
      width: 150,
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 3,
      marginBottom: 10,
    },


    inputModAll: {
      width: 100,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      margin: 10,
      height: 40,
    },

    inputname: {
      width: '90%',
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      marginBottom: 10,
    },

    inputnum: {
      width: '50%',
      height: 44,
      padding: 10,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 5,
      marginBottom: 10,
    },

    newvape: {
      flex: 5,
      padding: 5,
      borderWidth: 1,
      borderColor: 'black',
      marginBottom: 10,
      borderRadius: 3,
      marginRight: 10,
    },
    header: {
          },
    container: {
      flex: 1,
      marginTop: 10,
      padding: 10,
      backgroundColor: "#FFFFFF",
    },
    header: {
      fontSize: 20
    },
    nav: {
      flexDirection: "row",
      justifyContent: "space-around"
    },
    navItem: {
      flex: 1,
      alignItems: "center",
      padding: 10
    },
    subNavItem: {
      padding: 5
    },
    topic: {
      textAlign: "center",
      fontSize: 15
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      height:'95%'
    },
    modalView: {
      width: '100%',
      height: '100%',
      margin: 20,
      backgroundColor: "white",
      borderWidth: 2,
      borderColor: '#2F4F4F',
      padding: 20,
      alignItems: "baseline",
    },
    modalView2: {
      height: '80%',
      width: '100%',
      margin: 20,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      //alignItems: "baseline",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5
    },
    modalView1: {
      margin: 1,
      backgroundColor: "white",
      borderRadius: 3,
      padding: 10,
      alignItems: "center",
      shadowColor: "black",
      shadowOffset: {
        width: 7,
        height: 10
      },
      shadowOpacity: 3,
      shadowRadius: 4,
      elevation: 8,
    },
    modalView3: {
      width: 200,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 10,
      padding: 10,
      margin: 10,
      backgroundColor: '#D5DBDB'
    },
    buttonSale: {
      borderRadius: 10,
      borderWidth:2,
      justifyContent: 'center'
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "white",
    },

    buttonCloseSave: {
      backgroundColor: '#D5DBDB',
      marginVertical: 10,
      marginRight: 10,
      padding: 10,
    },

    textStyle: {
      fontSize: 18,
      color: "#208AEC",
      fontWeight: "bold",
      textAlign: "center",
      margin: 5,
      //justifyContent: "flex-start"
    },
  
    textSale: {
      fontSize: 12,
      color: "#208AEC",
      fontWeight: "bold",
      textAlign: "center",
    },
  
    textBackStyle: {
      marginTop: 10,
      marginBottom:10,
      fontSize: 15,
      color: "#FFD1BA",
      fontWeight: "bold",
      textAlign: "left",
    },
  
    textTitleStyle: {
      margin:10,
      fontSize: 20,
      color: "#696969",
      fontWeight: "bold",
      textAlign: 'center',
    },
   
    textStyleC: {
      color: "#FF8C00",
      fontSize: 12,
      //fontWeight: "bold",
      textAlign: "left",
      padding:10
    },
    textStyleSum: {
      color: "#FF8C00",
      fontSize: 16,
      fontWeight: "bold",
      textAlignVertical: "bottom",
      paddingTop:25
    },
    plusStyle: {
      color: "#483D8B",
      fontWeight: "bold",
      textAlign: "center",
      fontSize: 18,
      //justifyContent: "center",
      //borderWidth: 1,
      //borderColor: "#20232a",
      //borderRadius: 6,
    },
    modalText: {
      flex:5,
      marginBottom: 15,
      textAlign: "left"
    },

    buttonText: {
        alignSelf: 'center', 
        color: '#EBF3F6', 
        //fontWeight: 'bold',
        paddingHorizontal: 5,
        fontSize: 16,
    },

    buttonSelect: {
        marginTop:5, 
        borderWidth:1, 
        borderColor: '#EBF3F6',
        borderRadius: 5, 
        marginHorizontal: 20, 
        justifyContent: 'center',
    },

    bookmark: {
      //fontWeight: 'bold',
      borderBottomWidth: 1,
      padding: 2,
      alignContent: 'center'
    },

    bookmarkActiv: {
      borderBottomWidth: 0,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      paddingLeft: 5,
      //alignSelf: 'center'
    },

    header: {
      flex:1, 
      padding: 10, 
      textAlign: 'left', 
      color: 'black', 
      fontWeight: 'bold',
      fontSize: 13,
    },

    containerSpin: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });

  export default Styles;