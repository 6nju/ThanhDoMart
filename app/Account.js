import React from 'react';
import { StyleSheet, Text, Alert, Dimensions, View, Button, TextInput, Picker, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { connect } from 'react-redux'
import Axios from 'axios';
import { colors, settings } from './configs/index'
import { apis } from './configs/index'
import { ActionCreators } from './redux/ActionCreators'
import { ActionCart } from './redux/ActionCart'
import RNPickerSelect from 'react-native-picker-select';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExclamationCircle, faTruck, faCommentDollar, faMinus, faPlus, faCommentDots } from '@fortawesome/free-solid-svg-icons'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
class Account extends React.Component {
	constructor(props) {
    super(props)
    this.state = { 
		user_info: this.props.user_login,
		username: '',
		address: '',
		phone: '',
		name: '',
		password: '',
		email:'',
		district: (this.props.user_login) ? this.props.user_login.district : '',
		expandedOne: true,
		citys: [],
		guild: '',
		city: (this.props.user_login) ? this.props.user_login.city : '',
		pay: '',
		districts: [],
		guilds: [],
		mgBot: 0,
	}
	
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
  _logout = () => {
	  this.props.dispatch(ActionCreators.set_user_login(null))
	  this.props.navigation.navigate('Home')
  }
  _save = () => {
		
		
		const { username, password, name, email, address, phone, city, district } = this.state
		
		if(password == '' || password == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập mật khẩu");
		  return
		  }
		  if(phone == '' || phone == null){
			  Alert.alert("Thông báo", "Bạn chưa nhập số điện thoại");
			  return
		  }
		   if(email == '' || email == null){
			  Alert.alert("Thông báo", "Bạn chưa nhập email");
			  return
		  }
		  if(username == '' || username == null){
			  Alert.alert("Thông báo", "Bạn chưa nhập tài khoản");
			  return
		  }
		
		
		apis.register(name, username, phone, password, email, address, city, district).then(res => {
			if(res.data.statusCode == 201){
				let user = {
					"fullName": name,
					"telephone": phone,
					"address": address,
					"password": password,
					"email": email,
					"username": username,
					"city": city,
					"district": district,
					"token": res.data.token,
					"customerId": res.data.customerId,
				}
				
				Axios.defaults.headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'token': res.data.token
                        }
				Alert.alert("Thông báo", 'Bạn đã tạo tài khoản thành công');
                this.props.dispatch(ActionCreators.set_user_login(user))
				
                this.props.navigation.navigate('Home')
				
			}else{
				Alert.alert("Thông báo", "Đã tồn tại tài khoản hoặc số điện thoại, email");
				
			}
		}).catch(err => {
			Alert.alert("Thông báo", "Đã tồn tại tài khoản hoặc số điện thoại, email");
                   
		})
}
 
  render() {
	   const { username, password, name, email, address, phone } = this.state
    return (
	<View>
	 {
		 (this.state.user_info)?
      	<View>
          <StatusBar translucent
                    backgroundColor="transparent"
                    barStyle = "dark-content"
                 />
      		<View>
		      	<ScrollView 
		          contentInsetAdjustmentBehavior="automatic"
		          style={{ backgroundColor:'#e9edf2',}}>
			  
              <View style={styles.sectioninfo}>
                    <Text style={styles.infotext}>{this.state.user_info.fullName}</Text>
                    <Text style={styles.infotext}>{this.state.user_info.telephone}</Text>
                    <Text style={styles.infotext}>{this.state.user_info.username}</Text>
                    <Text style={styles.infotext}>{this.state.user_info.email}</Text>
                    <Text style={styles.infotext}>{this.state.user_info.address}</Text>
              </View>
              <View style={styles.sectionsubmit}>
                  <TouchableOpacity style={styles.submit}  onPress={this._logout}>
                      <Text style={styles.textsubmit}>Đăng xuất</Text>
                  </TouchableOpacity>
				  </View>
				  <View style={styles.sectionsubmit}>
				  <TouchableOpacity style={[styles.submit, {backgroundColor: '#2f3657', marginTop: -15}]} onPress={() =>this.props.navigation.navigate('History')}>
                      <Text style={styles.textsubmit}>Lịch sử mua hàng</Text>
                  </TouchableOpacity>
              </View>
		        </ScrollView>
          	</View>
      	</View>
		:
		<View style={styles.section1}>
		<ScrollView style={{minHeight: height}}>
                                                      <View style={styles.btnTextHolder}>
                                                                  
                                                                  <View style={{ height: this.state.expandedOne ? null : 0, overflow: 'hidden', }}>
																  <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.extext}>Tài khoản</Text></View>
                                                                              <View><View>
																					
																					  <TextInput 
																			  style={[styles.fill]}
																			  placeholder = 'Nhập tài khoản'
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(username) => this.setState({ username })}
																				value={username}
																			  />
																					 
																					</View></View></View>
																					<View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.extext}>Email</Text></View>
                                                                              <View><View>
																					
																					  <TextInput 
																			  style={[styles.fill]}
																			  placeholder = 'Nhập email'
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(email) => this.setState({ email })}
																				value={email}
																			  />
																					 
																					</View></View></View>
																					<View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.extext}>Mật khẩu</Text></View>
                                                                              <View><View>
																					
																					  <TextInput 
																			  style={[styles.fill]}
																			  placeholder = 'Nhập mật khẩu'
																			  autoCorrect={false}
																			  secureTextEntry={true}
																			  returnKeyType='done'
																				onChangeText={(password) => this.setState({ password })}
																				value={password}
																			  />
																					 
																					</View></View></View>
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
																						                
																						                marginLeft:7
																						              },
																						    	placeholder:{
																						    		fontSize:16,
																						    		
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
                
                marginLeft:7
              },
																					    	placeholder:{
																					    		fontSize:16,
																					    		
																					    		marginLeft:7,
																					    	},
																					    }}	

																					        />
																					    
																					    
																					
																					</View></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.extext}>Địa chỉ cụ thể</Text></View>
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
													  <View style={[styles.sectionsubmit, {marginBottom:300}]}>
					<TouchableOpacity style={[styles.submit]} onPress={this._save}>
						<Text style={styles.textsubmit}>Lưu thông tin</Text>
					</TouchableOpacity>
					
              </View>
			  
			  </ScrollView>
                                                    </View>
													
	 }
		</View>
  
    );
  }
}

const styles = StyleSheet.create({
	fill:{
	
    width:width*0.60,
    marginLeft: 10,
	fontSize: 16,
  },
  section1: {
   
  },
  s1text:{
    marginLeft:10,
  },
  text: {
    fontSize: 19,
    color: 'black',
  },
  btnTextHolder: {
    backgroundColor:'#fff',
   
  },
  avatar:{
      borderColor:'#fff',
      borderRadius: 50,
      borderWidth: 1,
	  width: 100,
	  height: 100
  },
  sectionavatar:{
    alignItems:'center',
    marginTop:20,
    marginBottom:20,
  },
  sectionsubmit:{
    height: width*0.1,
    width: width,
    alignItems:'center',
    marginTop:20,
    marginBottom:20,
  },
  expand:{
    borderBottomWidth:1,
    borderColor:'#e9edf2',
    paddingBottom:10,
    paddingTop:10,
    fontSize:16,
  },
  container:{
    
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  extext:{
	fontSize: 16,
    marginLeft:8,
    width:width*0.35,
    color:'#909090',
  },
  submit:{
    width:width*0.9,
    height:width*0.14,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#ff5c00',
    borderRadius:10,
  },
  textsubmit:{
    color:'#fff',
    fontWeight:'400',
    fontSize:18,
  },
  infotext:{
    color:'#2f3657',
    borderBottomColor: '#e9edf2',
    borderBottomWidth: 1,
    backgroundColor:'#fff',
    paddingTop:6,
    paddingBottom:6,
    paddingLeft:20,
  },
  picker:{
  	paddingTop:1,
  	paddingBottom:1,
  },
  pickerSelectStyles:{
  	fontSize:18,
  },
  
});
export default connect(mapStateToProps)(Account)