import React from 'react';
import { StyleSheet, Dimensions,LayoutAnimation, Alert, Text, View, Button, TextInput, Picker, ScrollView, TouchableOpacity, Image,Platform, UIManager } from 'react-native';
import { Footer } from './components/index'
const width = Dimensions.get('window').width
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExclamationCircle, faTruck, faCommentDollar, faMinus, faPlus, faCommentDots } from '@fortawesome/free-solid-svg-icons'
const height = Dimensions.get('window').height
import { connect } from 'react-redux'
import Axios from 'axios';
import { apis } from './configs/index'
import { ActionCart } from './redux/ActionCart'
import RNPickerSelect from 'react-native-picker-select';
import { ActionCreators } from './redux/ActionCreators'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
class Pay extends React.Component {
	constructor(props) {
    super(props)
    this.state = { 
		expandedOne: false,
		expandedTow: false,
		expandedFour: false,
		ships: [],
		ship: 0,

		citys: [],
		guild: '',

		pay: '',
		districts: [],
		guilds: [],
		shipCost: 0,
		expandedThree: false,
		total_: 0,
		all_: 0,
		products: props.navigation.state.params.products,
		user_info: this.props.user_login,
		address: (this.props.user_login) ? this.props.user_login.address : '',
		phone: (this.props.user_login) ? this.props.user_login.telephone : '',
		name: (this.props.user_login) ? this.props.user_login.fullName : '',
		district: (this.props.user_login) ? this.props.user_login.district : '',
		city: (this.props.user_login) ? this.props.user_login.city : '',

	}
	if(this.state.user_info){
	Axios.defaults.headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'token': this.state.user_info.token
                        }
	
    }
	if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
	apis.getShip().then(res => {
		this.setState({
			ships: res.data.rows, shipCost: res.data.rows[0].attributes.shippingCost, 
		})	
			
	})
	
	apis.getCity().then(res => {
		let array_ = []
		for(let i = 0; i < res.data.rows.length; i++){
			if(res.data.rows[i].name == 'Bắc Giang' || res.data.rows[i].name == 'Hà Nội' || res.data.rows[i].name == 'Lạng Sơn'){
				array_.push({value: res.data.rows[i].idProvince, label:res.data.rows[i].name})
			}
		}
		this.setState({
			citys: array_
		})	
			
	})
	apis.getDistrict(this.state.city).then(res => {
		let array_ = []
		for(let i = 0; i < res.data.rows.length; i++){
			
				array_.push({value: res.data.rows[i].idDistrict, label:res.data.rows[i].name})
			
		}
																							this.setState({
																								districts: array_
																							})	
																							
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

  
  _save = () => {
	  if(this.state.name == '' || this.state.name == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập tên");
		  return
	  }
	  if(this.state.phone == '' || this.state.phone == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập số điện thoại");
		  return
	  }
	  if(this.state.address == '' || this.state.address == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập địa chỉ");
		  return
	  }
	  const { username, password, name, email, address, phone, city, district } = this.state
	  let products = []
	  for(let i = 0; i < this.state.products.length; i++){
		  let p = this.state.products[i];
		  products.push({
			  productId: p.product.productId,
			  categoryId: p.product.categoryId,
			  code: p.product.attributes.code,
			  name: p.product.attributes.name,
			  price: p.product.attributes.price,
			  description: p.product.attributes.description,
			  sale: p.product.attributes.sale,
			  originPrice: p.product.attributes.originPrice,
			  totalAmount: p.value*p.product.attributes.price,
			  quantity: p.value,
			  avatar: p.product.attributes.avatar,
			  image: p.product.attributes.image,
		  })
	  }
		apis.pay(name, phone, address, (this.state.user_info != null) ? this.state.user_info.customerId  : '', this.state.shipCost, this.state.all_, products, this.state.ships[this.state.ship].id).then(res => {
				
				let user = {
					"fullName": name,
					"telephone": phone,
					"address": address,
					"city": city,
					"district": district,
					
					"customerId": 0,
				}
				
				if(!this.state.user_info){
					this.props.dispatch(ActionCreators.set_user_login(user))
					
				}

				this.props.dispatch(ActionCart.set_cart([]))
                
				this.props.navigation.navigate('Checkout')
				
			
		}).catch(err => {
			Alert.alert("Thông báo", "Có lỗi trong quá trình nhập thông tin");
                   
		})
	  
  }
  componentDidMount() {
	let ps = this.state.products
	let total = 0
	for(let i = 0; i < this.state.products.length; i++){
		total = total + ps[i].value*(ps[i].product.attributes.price *(100 - ps[i].product.attributes.sale))/100
	}
	let all_ = total + this.state.shipCost
       this.setState({
				total_:total,
				all_:all_
		})
    }
	_plus(id) {
		let value = this.state.products
			value[id].value = value[id].value + 1;
			this.setState({
				products:value
			})
let ps = this.state.products
	let total = 0
	for(let i = 0; i < this.state.products.length; i++){
		total = total + ps[i].value*(ps[i].product.attributes.price *(100 - ps[i].product.attributes.sale))/100
	}
       let all_ = total + this.state.shipCost
       this.setState({
				total_:total,
				all_:all_
		})
    }
	_delete(id) {
	 let products = this.state.products
	 products.splice(id, 1);
	 let total = 0
	 for(let i = 0; i < products.length; i++){
		total = total + products[i].value*(products[i].product.attributes.price *(100 - products[i].product.attributes.sale))/100
	}
       let all_ = total + this.state.shipCost
       this.setState({
				total_:total,
				all_:all_
		})
 
	 this.setState({
				products:products
			})
	this.props.dispatch(ActionCart.set_cart(products))
 }
  _minus(id) {
	  let value = this.state.products
		if(value[id].value > 1){
			value[id].value = value[id].value - 1;
			this.setState({
				products:value
			})
		}
		let ps = this.state.products
		let total = 0
		for(let i = 0; i < this.state.products.length; i++){
		total = total + ps[i].value*(ps[i].product.attributes.price *(100 - ps[i].product.attributes.sale))/100
	}
       let all_ = total + this.state.shipCost
       this.setState({
				total_:total,
				all_:all_
		})
    }
	payClick(id) {
		 this.setState({
		  pay: id
		})
	 }
	 payShip(id) {
		 this.setState({
		  ship: id, shipCost: this.state.ships[id].attributes.shippingCost
		})
	 }
  changeLayoutOne = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedOne: !this.state.expandedOne }); 
  }
  changeLayoutTow = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedTow: !this.state.expandedTow }); 
  }
  changeLayoutThree = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedThree: !this.state.expandedThree }); 
  }
  changeLayoutFour = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedFour: !this.state.expandedFour });
  }
  render() {
    const { username, password, name, email, address, phone, city, district } = this.state
    const pays = [{
			id: 0,
			text: 'Nhận hàng và thanh toán'
		},
		{
			id: 1,
			text: 'Thanh toán chuyển khoản'
		}
	];
	 
    return (
      <View>
                  
              <View>
                  <ScrollView 
                      contentInsetAdjustmentBehavior="automatic"
                      style={{ backgroundColor:'#e9edf2',}}>
                                                    <View style={styles.section1}>
                                                      <View style={styles.btnTextHolder}>
                                                                  <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayoutOne} style={styles.Btn}>
                                                                    <View style={[styles.btnText, {width: '100%', height: 20, position:'relative'}]}>
                                                                          <FontAwesomeIcon icon={ faExclamationCircle } size={15} style={[{left: 0, position: 'absolute',top: 2}]} color={'#ff5c00'} />
                                                                          <Text style={[styles.s1text, {left: 15, position: 'absolute',top: 0}]}>Thông tin giao hàng</Text>
                                                                    </View>
                                                                  </TouchableOpacity>
                                                                  <View style={{ height: this.state.expandedOne ? null : 0, overflow: 'hidden', }}>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.extext}>Tên</Text></View>
                                                                              <View><TextInput 
																			  style={styles.fill} 
																			  placeholder = 'Điền tên'
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(name) => this.setState({ name })}
																				value={name}
																			  /></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.extext}>Số điện thoại</Text></View>
                                                                              <View>
																			  <TextInput 
																			  style={styles.fill} 
																			  placeholder = 'Điền số điện thoại'
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(phone) => this.setState({ phone })}
																				value={phone}
																			  /></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={[styles.extext,styles.picker]}>Tỉnh thành phố</Text></View>
                                                                              <View><View>
	                                                                             
			                                                                              <RNPickerSelect
			                                                                              placeholder={{
																					              label: 'Chọn thành phố?',
																					              value: null,
																					              color: '#000',
																					            }}
			                                                                              value={this.state.city}
																					            onValueChange={(value) => {
																					            	this.setState({city: value, district: ''})
																					            	apis.getDistrict(value).then(res => {
		let array_ = []
		for(let i = 0; i < res.data.rows.length; i++){
			
				array_.push({value: res.data.rows[i].idDistrict, label:res.data.rows[i].name})
			
		}
																							this.setState({
																								districts: array_
																							})	
																							
																						})	
																					        }}
																					            
																					            items={this.state.citys}
																					            style={{
																					            	inputIOS: {
																						                fontSize:16,
																						                marginTop:14,
																						                marginLeft:7
																						              },
																						    	placeholder:{
																						    		fontSize:16,
																						    		marginTop:15,
																						    		marginLeft:7,
																						    	},
																						    }}	
																					        />
																			        
																					
																					
																					</View><
																				/View>
                                                                        </View>

                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={[styles.extext,styles.picker]}>Quận huyện</Text></View>
                                                                              <View><View>
                                                                              <RNPickerSelect
                                                                              			placeholder={{
																					              label: 'Chọn quận huyện?',
																					              value: null,
																					              color: '#000',
																					            }}
																					   
			                                                                              value={this.state.district}
																					            onValueChange={(value) => {
																					            
																						this.setState({district: value})
																						}}
																					            
																					            items={this.state.districts}
																					    style={{
																					    	inputIOS: {
																						                fontSize:16,
																						                marginTop:14,
																						                marginLeft:7,
																						              },
																					    	placeholder:{
																					    		fontSize:16,
																					    		marginTop:15,
																					    		marginLeft:7,
																					    	},
																					    }}	
																					        />
																					
																					</View></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={[styles.centertext, {marginTop: 15}]}><Text style={styles.extext}>Địa chỉ cụ thể</Text></View>
                                                                              <View><View>
																					
																					  <TextInput 
																			  style={[styles.fill, {width: width, marginTop: 15, marginLeft: 5}]}
																			  placeholder = 'Nhập địa chỉ cụ thể'
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(address) => this.setState({ address })}
																				value={address}
																			  />
																					 
																					</View></View>
                                                                        </View>
                                                                  </View>
                                                      </View>
                                                    </View>
                                                    <View style={styles.section1}>
                                                      <View style={styles.btnTextHolder}>
                                                                  <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayoutTow} style={styles.Btn}>
                                                                    <View style={[styles.btnText, {width: '100%', height: 20, position:'relative'}]}>
                                                                          <FontAwesomeIcon icon={ faTruck } size={15} style={[{left: 0, position: 'absolute',top: 2}]} color={'#ff5c00'} />
                                                                          <Text style={[styles.s1text, {left: 15, position: 'absolute',top: 0}]}>Hình thức vận chuyển</Text>
                                                                    </View>
                                                                  </TouchableOpacity>
                                                                  <View style={{ height: this.state.expandedTow ? null : 0, overflow: 'hidden', }}>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                                {
			this.state.ships.map((val, index) => {
				return (
					<View style={ [styles.formGroup, {height: 40, position: 'relative'}] }>
					<TouchableOpacity  style={ [styles.itemInput, {position: 'relative', marginTop: 10,height: 30, width: width}] } key={val.id} onPress={this.payShip.bind(this, index)}>
					<View style={{
					  height: 20,
					  width: 20,
					  borderRadius: 10,
					  borderWidth: 1,
					  borderColor: '#757F8C',
					  alignItems: 'center',
					  justifyContent: 'center',
					  position: 'absolute',
					  bottom: 7,
					  left: 10
					}}>
					  {
						index == this.state.ship ?
						  <View style={{
							height: 14,
							width: 14,
							borderRadius: 7,
							backgroundColor: '#ff5c00',
						  }} />
						  : null
					  }
					</View>
					<Text style={[styles.title, {color: '#757F8C', fontSize: 14, bottom: -2, left: 40}]}>
						{val.attributes.shippingType} {val.attributes.timeRange}
					</Text>
				  </TouchableOpacity>
				  
				
				  </View>
				)
			  })
			}
                                                                        </View>
                                                                  </View>
                                                      </View>
                                                    </View>
                                                    <View style={styles.section1}>
                                                      <View style={styles.btnTextHolder}>
                                                                  <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayoutThree} style={styles.Btn}>
                                                                    <View style={[styles.btnText, {width: '100%', height: 20, position:'relative'}]}>
                                                                          <FontAwesomeIcon icon={ faCommentDollar } size={15} style={[{left: 0, position: 'absolute',top: 2}]} color={'#ff5c00'} />
                                                                          <Text style={[styles.s1text, {left: 15, position: 'absolute',top: 0}]}>Hình thức thanh toán</Text>
                                                                    </View>
                                                                  </TouchableOpacity>
                                                                  <View style={{ height: this.state.expandedThree ? null : 0, overflow: 'hidden', }}>
                                                                        {
			pays.map((val) => {
				return (
					<View style={ [styles.formGroup, {height: 40, position: 'relative'}] }>
					<TouchableOpacity  style={ [styles.itemInput, {position: 'relative', marginTop: 10,height: 30, width: width}] } key={val.id} onPress={this.payClick.bind(this, val.id)}>
					<View style={{
					  height: 20,
					  width: 20,
					  borderRadius: 10,
					  borderWidth: 1,
					  borderColor: '#757F8C',
					  alignItems: 'center',
					  justifyContent: 'center',
					  position: 'absolute',
					  bottom: 7,
					  left: 10
					}}>
					  {
						val.id == this.state.pay ?
						  <View style={{
							height: 14,
							width: 14,
							borderRadius: 7,
							backgroundColor: '#ff5c00',
						  }} />
						  : null
					  }
					</View>
					<Text style={[styles.title, {color: '#757F8C', fontSize: 14, bottom: -2, left: 40}]}>
						{val.text}
					</Text>
				  </TouchableOpacity>
				  
				
				  </View>
				)
			  })
			}
                                                                  </View>
                                                      </View>
                                                    </View>
                                                    <View style={styles.section1}>
                                                      <View style={styles.btnTextHolder}>
                                                                  <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayoutFour} style={styles.Btn}>
                                                                    <View style={[styles.btnText, {width: '100%', height: 20, position:'relative'}]}>
                                                                          <FontAwesomeIcon icon={ faCommentDollar } size={15} style={[{left: 0, position: 'absolute',top: 2}]} color={'#ff5c00'} />
                                                                          <Text style={[styles.s1text, {left: 15, position: 'absolute',top: 0}]}>Thông tin tài khoản thưởng</Text>
                                                                    </View>
                                                                  </TouchableOpacity>
                                                                  <View style={{ height: this.state.expandedFour ? null : 0, overflow: 'hidden', }}>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Tên ngân hàng</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>Viecombank</Text></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Chi nhánh</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>Thanh xuân</Text></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Tên chủ tài khoản</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>Trần Thị Loan</Text></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Số tài khoản</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>0011345609</Text></View>
                                                                        </View>
                                                                  </View>
                                                      </View>
                                                    </View>
                                                    
														{
				this.state.products.map((val, index) => {
						

				return(
									<View style={[styles.section2,styles.container]}>
                                                          <View style={styles.payitem}>
                                                                   <Image
                                                                      style={styles.payitemimage}
                                                                      source={{uri: val.product.attributes.avatar}}
                                                                    />
                                                          </View>
                                                          <View style={styles.payiteminfo}>
                                                                   <Text style={styles.pinfotext1}>{val.product.attributes.name}</Text>
                                                                   <Text style={styles.pinfotext2}>{parseFloat(val.product.attributes.price*(100 - val.product.attributes.sale)/100).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                                   <View style={[styles.container,styles.pinfoamount]}>
                                                                          <View style={styles.floatbot}> 
                                                                            <TouchableOpacity style={styles.pamount} key={index} onPress={this._minus.bind(this, index)}>
                                                                                <FontAwesomeIcon icon={ faMinus } size={13} color={'#fff'} />
                                                                            </TouchableOpacity>
                                                                          </View>
                                                                          <View style={styles.floatbot}>
                                                                            <View style={styles.patext}>
                                                                                <Text style={styles.pmiddletext}>{val.value}</Text>
                                                                            </View>
                                                                          </View>
                                                                          <View style={styles.floatbot}>
                                                                            <TouchableOpacity style={styles.pamount} key={index} onPress={this._plus.bind(this, index)}>
                                                                                <FontAwesomeIcon icon={ faPlus } size={13} color={'#fff'} />
                                                                            </TouchableOpacity>
                                                                          </View>
                                                                          <View style={styles.floatbot}>
                                                                              <TouchableOpacity style={styles.delete} key={index} onPress={this._delete.bind(this, index)}>
                                                                                  <Text style={styles.deletetext}>Xóa</Text>
                                                                              </TouchableOpacity>
                                                                          </View>
                                                                   </View>
                                                          </View>
														  </View>
														)
  })}
                                                    
                                                    <View style={styles.section3}>
                                                        <View style={styles.container}>
                                                              <Text style={styles.servicestext}>Tổng tiền</Text>
                                                              <Text style={styles.services}>{parseFloat(this.state.total_).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                        </View>
                                                        <View style={[styles.container,styles.margin12]}>
                                                              <Text style={styles.servicestext}>Phí vận chuyển</Text>
                                                              <Text style={styles.services}>{parseFloat(this.state.shipCost).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                        </View>
                                                        <View style={[styles.container,styles.margin12]}>
                                                              <Text style={styles.converttext}>Thành tiến</Text>
                                                              <Text style={styles.convert}>{parseFloat(this.state.all_).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                        </View>
                                                    </View>
                                                    <View style={[styles.sectionbutton,styles.container]}>
                                                        <TouchableOpacity style={styles.Cmess}>
                                                                    <FontAwesomeIcon icon={ faCommentDots } size={20} color={'#ff5c00'} />
                                                              </TouchableOpacity>
                                                              <TouchableOpacity style={styles.Cpay} onPress={this._save}>
                                                                    <Text>Thanh toán</Text>
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
  },
  section1: {
    marginTop:15,
  },
  s1text:{
	  fontSize: 16,
    marginLeft:10,
  },
  text: {
    fontSize: 17,
    color: 'black',
  },
  btnTextHolder: {
    backgroundColor:'#fff',
   
   
  },
  Btn: {
    marginLeft:16,
    marginRight:16,
    backgroundColor: '#fff',
  },
  expand:{
    borderTopWidth:1,
    borderColor:'#e9edf2',
  },
  btnText: {
    marginLeft:7,
    color: '#2f3657',
    marginTop:7,
    marginBottom:7,
  },
  fill:{
	height: 50,
    width:width*0.60,
    marginLeft: 10,
	fontSize: 16,
	
  },
  extext:{
	fontSize: 16,
    marginLeft:8,
    width:width*0.35,
    color:'#909090',
  },
  picker:{
  	paddingTop:15,
  	paddingBottom:15,
  },
  tranfertext:{
    marginLeft:8,
    color:'#909090',
    marginTop:7,
    marginBottom:7,
  },
  infotext:{
    marginLeft:8,
    color:'#909090',
    marginTop:7,
    width:width*0.4,
    marginBottom:7,
  },
  userinfotext:{
    marginLeft:8,
    color:'#ff5c00',
    marginTop:7,
    width:width*0.4,
    marginBottom:7,
    textAlign:'right',
  },
  centertext:{
    justifyContent: 'center',
  },
  section2:{
    marginLeft:16,
    marginRight:16,
    marginTop:15,
    backgroundColor:'#fff',
    borderRadius:10,
  },
  payitem:{
    width:width*0.4,
  },
  payiteminfo:{
    width:width*0.5,
  },
  payitemimage:{
    width:width*0.4,
    height:width*0.4,
  },
  pinfotext1:{
    marginLeft:9,
    color:'#2f3657',
    marginTop:10,
    fontSize:15,
  },
  pinfotext2:{
    marginLeft:9,
    marginTop:8,
    color:'#ff5c00',
    fontSize:17,
  },
  pamount:{
    width:width*0.07,
    backgroundColor:'#ffc0a8',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height:width*0.07,
    marginTop:4,
  },
  patext:{
    width:width*0.10,
    color: '#2f3657',
    alignItems: 'center',
    fontWeight: '600',
  },
  pmiddletext:{
    color: '#2f3657',
    fontSize: 20,
    fontWeight:'bold',
  },
  floatbot:{
    justifyContent: 'flex-end',
    marginBottom:9,
    marginLeft:8,
  },
  delete:{
    width:width*0.15,
    alignItems: 'flex-end',
  },
  deletetext:{
    color:'#2f3657',
  },
  section3:{
    marginLeft:16,
    marginRight:16,
    marginTop:15,
  },
  servicestext:{
    width:width*0.4,
    color:'#2f3657',
    fontSize:15, 
  },
  services:{
    width:width*0.5,
    textAlign:'right',
    color:'#ff5c00',
    fontSize:17,
  },
  margin12:{
    marginTop:12,
  },
  converttext:{
    width:width*0.4,
    color:'#2f3657',
    fontSize:15, 
  },
  convert:{
    width:width*0.5,
    textAlign:'right',
    color:'#ff5c00',
    fontSize:19,
  },
  sectionbutton:{
      backgroundColor:'#2f3657',
      marginTop:15,
    },
    Cmess:{
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:15,
      
    },
    Cpay:{
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
export default connect(mapStateToProps)(Pay)