import React from 'react';
import { StyleSheet, Text, ActivityIndicator, BackHandler, View, Button, Image, Dimensions, StatusBar, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faHome, faShoppingCart, faComment, faUser, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Footer } from './components/index'
import Axios from 'axios';
import { colors, settings } from './configs/index'
import { apis } from './configs/index'
import { connect } from 'react-redux'

import { ActionCart } from './redux/ActionCart'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	
	cart: state.cart,
})

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
class Home extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            categories: [],
            search: '',
			user_info: this.props.user_login,
            cart: this.props.cart,
            length: (this.props.cart) ? this.props.cart.length : 0,
            progess: true,
			details: [
				{
				  image: require('./images/ct-1.png')
				},
				{
				  image: require('./images/ct-2.png')
				},
				{
				  image: require('./images/ct-3.png')
				},
				{
				  image: require('./images/ct-4.png')
				},
				{
				  image: require('./images/ct-5.png')
				},
				{
				  image: require('./images/ct-6.png')
				},
				{
				  image: require('./images/ct-3.png')
				}
				
		  ]
        }
		apis.getCategories().then(res => {
			this.setState({
				categories: res.data.rows,
				progess: false,
			})	
			
		})
		

    }
	componentWillMount() {
		this.getData()
	}
	  
	getData() {
		let cart = this.props.cart
		this.setState({
			cart: cart,
			length: (cart) ? cart.length : 0,
			})	
	}
	render() {
	const { search } = this.state
    return (
	<View>
	
	{
		(this.state.progess) ?
		<View style={[styles.container, styles.horizontal]}>

        <ActivityIndicator size="large" color="#ff5c00" />

      </View>
		
		:
		<View>
		<View style={{marginBottom:60,}}>
      <ScrollView 
          contentInsetAdjustmentBehavior="automatic"
          style={{ backgroundColor:'#fff' , }}>
	<View style={{backgroundColor:'#fff'}}>
      <View>
		<StatusBar translucent
                    backgroundColor="transparent"
                 />
        <Image
          style={styles.banner}
          source={require('./images/banner.png')}
        />
        </View>
        <View style={[styles.itemcenter, {height: 30, width: width}]}>
		<TouchableOpacity style={[{width: 30, height: 30, right: 20, top: -5, position: 'absolute', zIndex: 1000,  elevation: 6}]} onPress={() =>this.props.navigation.navigate('Search', {search: this.state.search, getData: this.getData.bind(this)})}>
				<FontAwesomeIcon  icon={ faSearch } size={20} color={'#ff5c00'} />
		</TouchableOpacity>
          <TextInput 
				style={[styles.search, {position:'relative', zIndex: 0,shadowColor: '#000',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,  elevation: 5}]}
              placeholder = 'Tìm kiếm'
			  onChangeText={(search) => this.setState({ search })}
			value={search}
			autoCorrect={false}
			returnKeyType='done'
        />
			
        </View>
		{
			this.state.categories.map((val, index) => {
				
				return (
					<View>
						<TouchableOpacity style={styles.itemcenter} onPress={() => this.props.navigation.navigate('List', {category: val, categories: this.state.categories,getData: this.getData.bind(this)})}>
							
								
							<Image 
							style={styles.ctimg}
							source={this.state.details[index].image}
							/>
							
							<Text style={styles.textCategory}>
								{val.categoryName} 
							</Text>
						</TouchableOpacity>
					</View>
				)
			})
		}
        
        
        
  </View>
  </ScrollView>
  </View>
  <View style={styles.navbar}>
      <View style={styles.navbarContent}>
            <View style={styles.navicon}>
              <FontAwesomeIcon onPress={() =>this.props.navigation.navigate('Home')} icon={ faHome } size={30} color={'#ff5c00'} />
            </View>
            <View style={styles.navicon}>
              <FontAwesomeIcon icon={ faComment } size={30} color={'#ff5c00'} />
            </View>
            <TouchableOpacity style={[styles.navicon, {position:'relative'}]} onPress={() =>this.props.navigation.navigate('Cart')}>
              <FontAwesomeIcon icon={ faShoppingCart } size={30} color={'#ff5c00'} />
				<Text style={[{position: 'absolute', width: 20, height: 20, backgroundColor: '#ff5c00', top: 0, left: 55, borderRadius: 10, color: '#fff', textAlign:'center',overflow: 'hidden'}]}>
					{this.state.length}
				</Text>
			</TouchableOpacity>
            <View style={styles.navicon}> 
              <FontAwesomeIcon onPress={() => (!this.state.user_info || typeof this.state.phone == 'undefined') ? this.props.navigation.navigate('AccountLogin') : this.props.navigation.navigate('Account')} icon={ faUser } size={30} color={'#ff5c00'} />
            </View>
      </View>
      </View>
	  </View>
	  
	}
  </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    justifyContent: 'center',
	alignItems: 'center'
  },
  horizontal: {
	marginTop: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  banner: {
    width:'100%',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    backgroundColor:'#fff',
  },
  search: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    paddingTop:3,
	paddingLeft: 20,
    paddingBottom:3,
    marginTop:-16,
    width: '90%',
    backgroundColor:'#fff',
	height: 40
  },
  textCategory: {
	 position: 'absolute', 
	 
	 textAlign: 'center',
	 paddingBottom: 10,
	 paddingLeft: 20,
	 paddingRight: 20,
	 paddingTop:10,
	 color: '#fff',
	 backgroundColor: '#ff5c00',
	 top: ((width-40)/344)*64 - 5,
	 fontSize: 18,

	},
  itemcenter: {
    alignItems: 'center',
	
	position: 'relative',
  },
  ctimg: {
    borderRadius: 10,
    width: width-40,
    height: ((width-40)/344)*128,
    marginTop:25,
  },
  navbarContent: {
	flex: 1,
    flexDirection: 'row',  
  },
  navbar: {
	width: width,
    position: 'absolute',
	bottom:0,
    backgroundColor: '#fed3be',
  },
  navicon: {
    alignItems: 'center',
    width: '25%',
    paddingTop: 5,
    paddingBottom: 10,
	position: 'relative'
  }
});
export default connect(mapStateToProps)(Home)