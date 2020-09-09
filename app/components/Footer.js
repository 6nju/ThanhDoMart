import React from 'react'
import { StyleSheet, Dimensions, View, Text, KeyboardAvoidingView } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faHome, faShoppingCart, faComment, faUser } from '@fortawesome/free-solid-svg-icons'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
       const styles = StyleSheet.create({
  
  navbarContent: {
	  
    flexDirection: 'row',  
  },
  navbar: {
    height: 40,
	width: width,
    position: 'absolute',
	left: 0,
	top: height - 110,
    backgroundColor: '#fed3be',
  },
  navicon: {
    alignItems: 'center',
    width: '25%',
    paddingTop: 10,
    paddingBottom: 10,
  }
});
        return (
            <View style={styles.navbar}>
			<View style={styles.navbarContent}>
            <View style={styles.navicon}>
              <FontAwesomeIcon onPress={() =>this.props.navigation.navigate('List')} icon={ faHome } size={20} color={'#ff5c00'} />
            </View>
            <View style={styles.navicon}>
              <FontAwesomeIcon onPress={() =>this.props.navigation.navigate('List')} icon={ faComment } size={20} color={'#ff5c00'} />
            </View>
            <View style={styles.navicon}>
              <FontAwesomeIcon onPress={() =>this.props.navigation.navigate('List')} icon={ faShoppingCart } size={20} color={'#ff5c00'} />
            </View>
            <View style={styles.navicon}>
              <FontAwesomeIcon onPress={() =>this.props.navigation.navigate('List')} icon={ faUser } size={20} color={'#ff5c00'} />
            </View>
			</View>
			</View>
        )
    }
}

export default Footer

