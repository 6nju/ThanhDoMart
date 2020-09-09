import React from 'react';
import { StyleSheet, Dimensions, Alert, ActivityIndicator, Text, View, Button, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Footer } from './components/index'
const width = Dimensions.get('window').width
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faHome,faArrowLeft,  faMinus, faPlus,faShoppingCart, faComment, faUser, faSearch,faCartPlus  } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

import { ActionCart } from './redux/ActionCart'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
const height = Dimensions.get('window').height
class Search extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            page:1,
            total_:0,
            count:0,
            array_page: [],
			length: (this.props.cart) ? this.props.cart.length : 0,
            progess: true,
            products: [],
			cart: (this.props.cart) ? this.props.cart : [], 
            search: props.navigation.state.params.search,
        }
		
		apis.getSearch(this.state.search, this.state.page).then(res => {
			let array_page = this.state.array_page
			let pages
			if((res.data.count % 50) != 0){
				pages = parseInt(res.data.count / 50) + 1;
			}else{
				pages = parseInt(res.data.count / 50);
			}
			for(let i = 0;  i < pages ; i++){
				let key = i + 1;
				array_page.push(key)
			}
			for(let a = 0 ; a < res.data.rows.length; a++){
				res.data.rows[a].value_ = 1
			}
			this.setState({
				products: res.data.rows,
				count: res.data.count,
				progess: false,
				array_page: array_page,
			})	
			
		})
	}
	componentWillUnmount() {
		const { navigation } = this.props
		navigation.state.params.getData();
	}
	componentDidMount() {
	let ps = this.state.cart
	let total = 0
	for(let i = 0; i < this.state.cart.length; i++){
		total = total + ps[i].value*(ps[i].product.attributes.price *(100 - ps[i].product.attributes.sale))/100
	}

       this.setState({
				total_:total,
			
		})
    }
	/*static navigationOptions = {
	
    headerRight: () => (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#ddd"
		style={{ }}

        hardwareAccelerated
      />
    ),
  };*/
  _search = () => {
	
	this.setState({
		 page: 1,
		 progess: true,
	  })
	apis.getSearch(this.state.search, this.state.page).then(res => {
			let array_page =[]
			let pages
			if((res.data.count % 50) != 0){
				pages = parseInt(res.data.count / 50) + 1;
			}else{
				pages = parseInt(res.data.count / 50);
			}
			for(let i = 0;  i < pages ; i++){
				let key = i + 1;
				array_page.push(key)
			}
			for(let a = 0 ; a < res.data.rows.length; a++){
				res.data.rows[a].value_ = 1
			}
			this.setState({
				products: res.data.rows,
				count: res.data.count,
				progess: false,
				array_page: array_page,
			})	
			
		})
		
}
  _add(id){
		let product = []
		let key = 0;
		let p = this.state.products[id]
		let length = this.state.length
		if(typeof this.state.cart == 'undefined' || this.state.cart.length == 0){
			product = []
			product.push({product: p, value: p.value_})	
			length = 1
		}else{
			product = this.state.cart
			for(let i = 0; i < product.length; i++){
				if(product[i].product.productId == p.productId){
					key = 1;
					product[i].value = p.value_
				}
			}
			if(key == 0){
				length = length + 1
				product.push({product: p, value: p.value_})	
			}
		}
		this.setState({
			length: length,
			cart: product
		})
		let ps = product
		let total = 0
		for(let i = 0; i < ps.length; i++){
			total = total + ps[i].value*(ps[i].product.attributes.price *(100 - ps[i].product.attributes.sale))/100
		}

		   this.setState({
					total_:total,
				
			})
		Alert.alert("Thông báo", "Đã thêm sản phẩm vào giỏ hàng");
		this.props.dispatch(ActionCart.set_cart(product))
	}
	
  _showPage(id){
	  this.setState({
		 page: id,
		 progess: true,
	  })
	 
	  apis.getSearch(this.state.search, this.state.page).then(res => {
			
			
			this.setState({
				products: res.data.rows,

				progess: false,
				
			})	
			
		})
  }
 _minus(id){
		let value = this.state.products
		if(value[id].value_ > 1){
			value[id].value_ = value[id].value_ - 1;
			this.setState({
				products:value
			})
		}
	}
	_plus(id){
		
		let value = this.state.products
		
			value[id].value_ = value[id].value_ + 1;
			this.setState({
				products:value
			})
		
	}
  render() {
    return (
	<View>
	{
		(this.state.progess) ?
		<View style={[{flex: 1,justifyContent: 'center', alignItems: 'center'}, {marginTop: '60%',flexDirection: 'row',justifyContent: 'space-around',padding: 10}]}>

        <ActivityIndicator size="large" color="#ff5c00" />

      </View>
		
		:
	
    <View style={{backgroundColor:'#e9edf2', position: 'relative',minHeight: height}}>
      <View>
          <ScrollView 
          contentInsetAdjustmentBehavior="automatic"
          style={{ backgroundColor:'#e9edf2' }}>
              <View style={{width: width, height: 75, backgroundColor: '#fed3be', position: 'relative'}}>
				<View style={[{height: 40, width: width - 80, marginLeft: 65, marginRight: 15, marginTop: 30}]}>
				<TouchableOpacity style={[{width: 30, height: 30, right: 0, top: 7, position: 'absolute', zIndex: 1000,  elevation: 6}]} onPress={this._search} >
						<FontAwesomeIcon  icon={ faSearch } size={20} color={'#000'} />
				</TouchableOpacity>
				  <TextInput 
						style={[styles.search, {position:'relative', zIndex: 0}]}
					  placeholder = 'Tìm kiếm'
					  onChangeText={(search) => this.setState({ search })}
					value={this.state.search}

					autoCorrect={false}
					returnKeyType='done'
				/>
					
				</View>
				<TouchableOpacity onPress={() =>this.props.navigation.goBack()}  style={{position:'absolute', left: 15, top: 40}}>
				<FontAwesomeIcon icon={ faArrowLeft } size={20} color={'#000'}/>
				</TouchableOpacity>
		  </View>
              
              <View>
			  {(this.state.products.length > 0)?
              <View style={[styles.container, {marginBottom: 100}]}>
				  
				{
						this.state.products.map((val_, key) => {
							
							return (
							
							<View style={styles.product}>
							  <TouchableOpacity onPress={() => this.props.navigation.navigate('Item', {product: val_})}>
								   <Image 
									style={styles.pimg1}
									source={{uri: val_.attributes.avatar}}
									/>
									<Text style={styles.ptext}>{val_.attributes.name}</Text>
									<Text style={styles.price}>{parseFloat(val_.attributes.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
							  </TouchableOpacity>
							  <View style={[styles.container,styles.Ibar]}>
									
									<TouchableOpacity   key={key} onPress={this._minus.bind(this, key)} style={styles.amount}>
									<View style={styles.amount}>
										<FontAwesomeIcon icon={ faMinus } size={13} color={'#fff'} />
									</View>
									</TouchableOpacity>
									<View style={[styles.atext, {marginTop: -20}]}>
										<Text style={styles.middletext}>{val_.value_}</Text>
									</View>
									<TouchableOpacity   key={key} onPress={this._plus.bind(this, key)} style={styles.amount}>
									<View style={styles.amount}>
										<FontAwesomeIcon icon={ faPlus } size={13} color={'#fff'} />
									</View>
									</TouchableOpacity>
									<TouchableOpacity style={[styles.Icart, {marginTop: 0, right: -20}]}  key={key} onPress={this._add.bind(this, key)}>
										  <FontAwesomeIcon icon={ faCartPlus } size={30} color={'#ff5c00'} />
									</TouchableOpacity>
							  </View>
							</View>
				)
						})
				}
                
              
			  
				{
				  (this.state.array_page.length > 0)?
				  <View style={[{height: 40, alignItems: 'center',flexWrap: 'wrap', marginBottom: 180, width: width}, {flexDirection: 'row',padding: 10}]}>
				  {
						this.state.array_page.map((val_, key) => {
							if(this.state.page == val_){
							return (
							<TouchableOpacity style={[styles.page, {height: 32, backgroundColor:'#ff5c00'}]}  key={key} onPress={this._showPage.bind(this, val_)}>
							  <View>
								  
									<Text style={[styles.ptext, {color: '#fff'}]}>{val_}</Text>
									
							  </View>
							</TouchableOpacity>
					)
							}else{
								return (
							<TouchableOpacity style={[styles.page, {height: 32}]}  key={key} onPress={this._showPage.bind(this, val_)}>
							  <View>
								  
									<Text style={styles.ptext}>{val_}</Text>
									
							  </View>
							</TouchableOpacity>
					)
							}
						})
					}
					 </View>
				  : null
				}
				</View>
				:
				null
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
              <FontAwesomeIcon onPress={() => (this.state.user_info == null) ? this.props.navigation.navigate('AccountLogin') : this.props.navigation.navigate('Account')} icon={ faUser } size={30} color={'#ff5c00'} />
            </View>
      </View>
      </View>
	</View>
	}
	{
		(this.state.expandedOne)
		?
		<TouchableOpacity onPress={() =>this.setState({expandedOne: !this.state.expandedOne})} style={{width: width, height: height, position:'absolute', top: 0, left:0, backgroundColor: '#000', opacity: 0.5}}>
		
		</TouchableOpacity>
	: null
	}
	<View style={{ backgroundColor: '#fff',height: this.state.expandedOne ? null : 0, overflow: 'hidden',position: 'absolute', width: width*.6, borderRadius: 10, right: 10, bottom: 110 }}>
<View style={{width: width*.6}}>
<Text style={{marginTop: 10,marginLeft: 15,marginBottom: 10,marginRight: 15,}}>Tổng hóa đơn: <Text style={styles.price}>{parseFloat(this.state.total_).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text></Text>
</View>
<TouchableOpacity style={[{position:'relative'}]} onPress={() =>this.props.navigation.navigate('Cart')}>
              <Text style={[styles.price, {marginTop: 10,marginLeft: 15,marginBottom: 10,marginRight: 15}]}>Xem giỏ hàng</Text>
				
	</TouchableOpacity>
	<TouchableOpacity style={[{position:'relative'}]} onPress={() => this.props.navigation.navigate('Pay', {products : this.state.cart})}>
              <Text style={[styles.price, {marginTop: 10,marginLeft: 15,marginBottom: 10,marginRight: 15}]}>Thanh toán</Text>
				
	</TouchableOpacity>
	</View>
	<View style={{position: 'absolute', width: 50, height: 50, borderRadius: 25, right: 10, bottom: 50, backgroundColor: '#2f3657'}}>
	<TouchableOpacity style={[{position:'relative', top: 10, left: 10}]} onPress={() =>this.setState({expandedOne: !this.state.expandedOne})}>
              <FontAwesomeIcon icon={ faShoppingCart } size={30} color={'#ff5c00'} />
				<Text style={[{position: 'absolute', width: 20, height: 20, backgroundColor: '#ff5c00', top: 0, left: 15, borderRadius: 10, color: '#fff', textAlign:'center',overflow: 'hidden'}]}>
					{(this.props.cart) ? this.props.cart.length : 0}
				</Text>
	</TouchableOpacity>
	</View>
	</View>
    );
  }
}


const styles = StyleSheet.create({
  tabActive: {
	  borderColor: '#fed3be',
	  borderBottomWidth: 3
  },
  search: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    paddingTop:7,
    paddingBottom:7,
    width: '100%',
    backgroundColor:'#fff',
    position:'relative',
  },
  container: {
	
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign:'left',
	
	
  },
  bgcolor1: {
	 
    backgroundColor:'#dfe5ef',
  },
  bgcolor2: {
    backgroundColor:'#fceedd',
  },
  ctext: {
    paddingTop:7,
    paddingBottom:7,
    paddingLeft:10,
	paddingRight: 10,
    color:'#000',
  },
  ctimg: {
    width: width/6 - 5,
    height: width/6 - 5,
	borderRadius:30,
  },
  middletext:{
    color: '#2f3657',
    fontSize: 20,
    fontWeight:'bold',
	marginTop: 25,
	marginLeft: 10, marginRight: 10
  },
  pimg1: {
    width: width *.5 - 20 - 20 + 5,
	height:width *.5 - 20 - 20 + 5
  },
  amount:{
    width:width*0.07,
    backgroundColor:'#ffc0a8',
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    height:width*0.07,
    marginTop:4,
  },
  text1:{
    textAlign: 'center',
    fontWeight:'bold',
    fontSize:8,
  },
  price:{
    fontWeight:'bold',
    fontSize:12,
    color:'orange',
  },
  item: {
    alignItems: 'center',
    width: '19%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft:15,
  },
  product: {
    textAlign: 'center',
    width: width *.5 - 15,
    marginTop: 10,
    marginBottom: 10,
    marginLeft:10,

    paddingTop:10,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  page: {
    textAlign: 'center',

    marginTop: 10,
    marginBottom: 10,
    marginLeft:10,

    paddingBottom:5,
    paddingTop:5,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#fff',
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
  },
  Ibar:{
 
    marginLeft:0,
  },
  
  Icart:{
    backgroundColor: '#fff',
    width:width*0.1,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height:width*0.1,
    marginTop:7,
    marginBottom:7,
    marginLeft:5,
  },
  Ibuy:{
    backgroundColor: '#ff5c00',
    width:width*0.25,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height:width*0.1,
    marginTop:7,
    marginBottom:7,
    marginLeft:10,
  },
  ibuytext:{
    fontWeight:'bold',
    color:'#fff',
    fontSize:15,
  },
});
export default connect(mapStateToProps)(Search)