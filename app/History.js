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
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExclamationCircle, faTruck, faCommentDollar, faMinus, faPlus, faCommentDots } from '@fortawesome/free-solid-svg-icons'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
class History extends React.Component {
	constructor(props) {
    super(props)
    this.state = { 
		user_info: this.props.user_login,
		username: '',
		address: '',
		phone: (this.props.user_login) ? this.props.user_login.telephone : '',
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
		orders: [],
	}
	
	apis.getOrder(this.state.phone).then(res => {
		this.setState({
			orders: res.data.rows
		})
			
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
             <View style={{marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20}}>
			  {
						this.state.orders.map((val, index) => {
							
							return (
								<View style={[styles.sectioninfo, {paddingTop: 3, paddingBottom: 3}]}>
								<View style={[{width: width - 40, position:'relative', marginLeft: 0}]}>
									<Text style={[styles.infotext, {width: width - 40,paddingTop: 10, paddingBottom: 10, position:'relative', fontWeight: 'bold', fontSize: 16}]}>{val.creationDate}</Text>
									
									</View>
									<Text style={[styles.infotext, {paddingTop: 5, paddingBottom: 5, marginTop: -2}]}>Người đặt hàng: {val.attributes.fullName}</Text>
									<Text style={[styles.infotext, {paddingTop: 5, paddingBottom: 5, marginTop: -2}]}>Địa chỉ: {val.attributes.address}</Text>
									<Text style={[styles.infotext, {paddingTop: 5, paddingBottom: 5, marginTop: -2}]}>Số điện thoại: {val.attributes.telephone}</Text>
									<Text style={[styles.infotext, {paddingTop: 5, paddingBottom: 5, marginTop: -2}]}>Thời gian: {val.attributes.timeRange}</Text>
									<Text style={[styles.infotext, {paddingTop: 5, paddingBottom: 5, marginTop: -2}]}>Trạng thái: {val.attributes.statusOrder}</Text>
									<Text style={[styles.infotext, {paddingTop: 5, paddingBottom: 5, marginTop: -2, color: 'red'}]}>Tổng hóa đơn: {parseFloat(val.attributes.subtotal).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
								</View>
								)
								
							})
						
					  }
              
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
                                                                              <View style={styles.centertext}><Text style={styles.extext}>Tỉnh thành phố</Text></View>
                                                                              <View><View>
																					<Picker 
																					  selectedValue={this.state.city}
																					  
																					  style={[{color:'#909090', marginLeft: 5, fontSize: 10, marginTop: -14, width:width*.60} ]}
																					  itemStyle={{fontSize: 10}}
																					  onValueChange={(itemValue, itemIndex) => {
																						this.setState({city: itemValue, district: '', guild: '', guilds: [],districts:[] })
																						
																						apis.getDistrict(itemValue).then(res => {
																							this.setState({
																								districts: res.data.rows
																							})	
																							
																						})
																					  }}>
																					  
																					  <Picker.Item value='' label='Chọn thành phố?' />
																					  {
																						this.state.citys.map((val, index) => {
																							return (
																								<Picker.Item label={val.name} value={val.idProvince} />
																							)
																						})
					}
																					  
																					</Picker>
																					</View></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.extext}>Quận huyện</Text></View>
                                                                              <View><View>
																					<Picker 
																					  selectedValue={this.state.district}
																					  
																					  style={[styles.extext, {color:'#909090', marginLeft: 5, fontSize: 10, marginTop: -14, width:width*.60} ]}
																					  itemStyle={{fontSize: 10}}
																					  onValueChange={(itemValue, itemIndex) => {
																						this.setState({district: itemValue, guild: '', guilds: []})
																						apis.getGuild(itemValue).then(res => {
																							this.setState({
																								guilds: res.data.rows
																							})	
																							
																						})
																					  }}>
																					  
																					  <Picker.Item value='' label='Chọn quận huyện?' />
																					  {
																						this.state.districts.map((val, index) => {
																							return (
																								<Picker.Item label={val.name} value={val.idDistrict} />
																							)
																						})
					}
																					  
																					</Picker>
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
	marginTop: -14
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
	marginTop:15,
    borderColor:'#e9edf2',
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
});
export default connect(mapStateToProps)(History)