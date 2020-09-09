import React from 'react';
import { StyleSheet, Text, Dimensions, View, Button, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCommentDots, } from '@fortawesome/free-solid-svg-icons'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class Checkout extends React.Component {
  render() {
    return (
      	<View>
          <StatusBar translucent
                    backgroundColor="transparent"
                    barStyle = "dark-content"
                 />
                 <View>
           <ScrollView 
		          contentInsetAdjustmentBehavior="automatic"
		          style={{ backgroundColor:'#e9edf2',}}>
      		<View style={styles.checkoutcomplete}>
      			<Image
                      style={styles.checkout}
                      source={require('./images/complete.png')}
                    />
      		</View>
      		<View style={[styles.sectionbutton,styles.container]}>
      				<TouchableOpacity style={styles.Cmess}>
                          <FontAwesomeIcon icon={ faCommentDots } size={20} color={'#ff5c00'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Cbuy} onPress={() =>this.props.navigation.navigate('Home')}>
                          <Text>Tiếp tục mua sắm</Text>
                    </TouchableOpacity>
      		</View>
      		</ScrollView>
      		</View>
      	</View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign:'left',
	},
  	checkoutcomplete:{
  		flex:1,
  		alignItems:'center',
    	justifyContent:'center',
    	height:height*0.7,
    	
  	},
  	sectionbutton:{
  		backgroundColor:'#2f3657',
  	},
  	Cmess:{
  		justifyContent: 'center',
    	alignItems: 'center',
    	marginLeft:15,
    	
  	},
  	Cbuy:{
    backgroundColor: '#ff5c00',
    width:width*0.75,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:7,
    marginBottom:7,
    marginLeft:30,
    height:width*0.1,
  },
});