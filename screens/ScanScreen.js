import React from 'react';
import { Text, View,StyleSheet,TouchableOpacity,Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
      super();
      this.state={
        hasCameraPermissions:null,
        scanned:false,
        scannedData:'',
        buttonState:'normal'
      }
    }

    getCameraPermission= async()=>{
      const {status}=await Permissions.askAsync(Permissions.CAMERA);
      this.setState({hasCameraPermissions:status==="granted",buttonState:'clicked'});
    }

    barCodeScanned=async({type,data})=>{
      this.setState({
        scanned:true,
        scannedData:data,
        buttonState:'normal'
      })
    }

    render() {
      
      const hasCameraPermissions=this.state.hasCameraPermissions;
      const scanned=this.state.scanned;
      const buttonState=this.state.buttonState;

      if(buttonState === 'clicked' && hasCameraPermissions){

        return(
          <BarCodeScanner
          onBarCodeScanned={scanned?
            undefined:
            this.barCodeScanned
          }
          style={StyleSheet.absoluteFillObject}
          />
        )
      }

      else if(buttonState === 'normal'){

      return (
        <View style={styles.container}>
          <Text style={styles.displayText}>
           { 
            hasCameraPermissions===true?
            this.state.scannedData
            :"REQUEST CAMERA PERMISSION"
          }
          </Text>
          <View style={{marginTop:50,marginBottom:40}}>
            <Image source={
              require('../assets/scanner.png')
            }
            style={{width:120,height:120}}
            />
          </View>
          <TouchableOpacity style={styles.button}
          onPress={
            this.getCameraPermission
          }
          title="BAR CODE SCANNER">
            <Text style={styles.buttonText}>SCAN BAR CODE</Text>
          </TouchableOpacity>

        </View>

      );
     }
    }
  }

  const styles = StyleSheet.create({
    button:{
      padding:10,
      marginTop:50,
      backgroundColor:'rgb(43,300,180)',
      borderWidth:3,
      borderColor:'darkgreen',
      marginBottom:80
    },
    buttonText:{
      fontSize:18,
      fontFamily:'robota'
    },
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'rgb(43,230,156)'  
    },
    displayText:{
      fontSize:18,
      marginTop:80,
      fontWeight:'bold'
    }
  });