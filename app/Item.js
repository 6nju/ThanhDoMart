import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, Alert, View, StatusBar, ScrollView, Image, Dimensions, TouchableOpacity, BackHandler } from 'react-native'
import  styles  from './components/style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMinus, faPlus, faCommentDots, faShoppingCart, faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { ActionCart } from './redux/ActionCart'
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})

class SwiperComponent extends Component {
	constructor(props) {
        super(props)
        this.state = {
            product: props.navigation.state.params.product,
            total_: 0,
            value: 1,
            cart: (this.props.cart) ? this.props.cart : [], 
        }
		
		
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
	componentWillUnmount() {
		const { navigation } = this.props
		navigation.state.params.getData_();
	}
	_minus = () => {
		let value = this.state.value
		if(this.state.value > 1){
			value = value - 1;
			this.setState({
				value:value
			})
		}
	}
	_plus = () => {
		
		let value = this.state.value
		
			value = value + 1;
			this.setState({
				value:value
			})
		
	}
	_add = () => {
		let product = []
		let key = 0;
		if(typeof this.state.cart == 'undefined' || this.state.cart.length == 0){
			product = []
			product.push({product: this.state.product, value: this.state.value})	
			
		}else{
			product = this.state.cart
			
			for(let i = 0; i < product.length; i++){
				if(product[i].product.productId == this.state.product.productId){
					key = 1;
				}
			}
			if(key == 0){
			product.push({product: this.state.product, value: this.state.value})	
			}
		}
		Alert.alert("Thông báo", "Đã thêm sản phẩm vào giỏ hàng");
		this.props.dispatch(ActionCart.set_cart(product))
		this.props.navigation.navigate('List')
	}
	_alert = () => {
		Actions.alerts()
	}
	
  render() {
    return (
    <View>
                <StatusBar translucent
                    backgroundColor="transparent"
                    barStyle = "dark-content"
                 />
      <ScrollView 
          contentInsetAdjustmentBehavior="automatic"
          style={{ backgroundColor:'#e9edf2',}}>
		  <View style={[styles.section3]}>
                      <View style={styles.tranfer1}>
                        <Image
                          style={styles.tranfericon}
                          source={require('./images/tranfer1.png')}
                        />
                        <Text style={styles.tranfertext}>Giao hàng tiết kiệm</Text>
                      </View>
                      <View style={styles.tranfer1}>
                        <Image
                          style={styles.tranfericon}
                          source={require('./images/tranfer2.png')}
                        />
                        <Text style={styles.tranfertext}>Giao hàng nhanh</Text>
                      </View>
                      <View style={styles.tranfer1}>
                        <Image
                          style={styles.tranfericon}
                          source={require('./images/tranfer3.png')}
                        />
                        <Text style={styles.tranfertext}>Đổi trả hàng trong ngày</Text>
                      </View>
              </View>
              <View style={[styles.container,styles.Ibar]}>
                    <TouchableOpacity style={styles.Imess}>
                          <FontAwesomeIcon icon={ faCommentDots } size={20} color={'#ff5c00'} />
                    </TouchableOpacity> 
                    <TouchableOpacity style={styles.Icart} onPress={() => this._add()}>
					<Text style={[styles.ibuytext, {color: '#ff5c00'}]}>ĐẶT HÀNG</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Ibuy} onPress={() => this.props.navigation.navigate('Pay', {products : [{product: this.state.product, value: this.state.value}]})}>
                          <Text style={styles.ibuytext}>MUA NHANH</Text>
                    </TouchableOpacity>
              </View>
        <Swiper style={styles.wrapper} 
              //autoplay={true}

              paginationStyle={{
                top:0,
                marginTop:5,
                alignItems: 'flex-start',
              }}
              dotStyle={{
                backgroundColor:'#ffc0a8',
                width:50,
                marginLeft:-2,
                marginRight:-2,
              }}
              activeDotStyle={{
                backgroundColor:'#ff5c00',
                width:50,
                marginLeft:-2,
                marginRight:-2,
              }}
              >
			  {
				  this.state.product.attributes.image.map((val, index_) => {
				
							return (
							<View style={[styles.slide1,{}]}>
							<Image
							  style={[styles.image,{width: width - 30, height: width - 30}]}
							  source={{uri: val}}
							/>
						  </View>
							)
				  })
			  }
          
        </Swiper>
              <View style={[styles.container, {position:'relative'}]}>
                <Text style={[styles.title,{marginTop: 5}]}>{this.state.product.attributes.name}</Text>
				<TouchableOpacity onPress={this._minus} style={styles.amount}>
                <View style={styles.amount}>
                    <FontAwesomeIcon icon={ faMinus } size={13} color={'#fff'} />
                </View>
				</TouchableOpacity>
                <View style={[styles.atext, {top: -10, left: width*0.55 + 28,position: 'absolute'}]}>
                    <Text style={styles.middletext}>{this.state.value}</Text>
                </View>
				<TouchableOpacity onPress={this._plus} style={[styles.amount, {marginLeft: 40}]}>
                <View style={styles.amount}>
                    <FontAwesomeIcon icon={ faPlus } size={13} color={'#fff'} />
                </View>
				</TouchableOpacity>
              </View>
              <View style={[styles.container, {marginTop: 30}]}>
                  <View style={styles.left}>
                      <Text style={[styles.oldprice,{textAlign: 'center', width: 120}]}>{parseFloat(this.state.product.attributes.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
                      <Text style={[styles.line,{textAlign: 'center', width: 100}]}></Text>
                  </View>
                   <View style={styles.center}>
                      <Text style={styles.discount}>{this.state.product.attributes.sale}%</Text>
                  </View>
                  <View style={styles.right}>
                      <Text style={styles.newprice}>{parseFloat(this.state.product.attributes.price*(100 - this.state.product.attributes.sale)/100).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
                  </View>
              </View>
              <View style={[styles.section2, {marginBottom: 15}]}>
                  <Text style={styles.ibrand}>Mã sản phẩm: {this.state.product.attributes.code}</Text>
                  <Text style={styles.linebrand}></Text>
                  <Text style={styles.idetail}>Chi tiết sản phẩm :</Text>
                  <Text style={styles.icontent}>{this.state.product.attributes.description}.
                  </Text>
              </View>
               
      </ScrollView>
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
    )
  }
}
export default connect(mapStateToProps)(SwiperComponent)
