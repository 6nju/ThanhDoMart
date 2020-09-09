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
class AccountLogin extends React.Component {
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
				array_.push(res.data.rows[i])
			}
		}
		this.setState({
			citys: array_
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
		 
		   
		  if(username == '' || username == null){
			  Alert.alert("Thông báo", "Bạn chưa nhập tài khoản");
			  return
		  }
		
		
		apis.login(username, password).then(res => {
			if(res.data.statusCode == 200){
				Axios.defaults.headers = {
									'Accept': 'application/json',
									'Content-Type': 'application/json',
									'token': res.data.token
								}
				let token_ = res.data.token
				apis.getUser().then(res => {
					
					if(res.data.statusCode == 200){
						
						let user = {
							"fullName": res.data.attributes.fullName,
							"telephone": res.data.attributes.telephone,
							"address": res.data.attributes.address,
							"email": res.data.attributes.email,
							"username": username,
							"city": (res.data.city) ? res.data.attributes.city : 0,
							"district": (res.data.city) ? res.data.attributes.city : 0,
							"token": token_,
							"customerId": res.data.attributes.customerId,
						}
						
						
						Alert.alert("Thông báo", 'Bạn đã đăng nhập thành công');
						this.props.dispatch(ActionCreators.set_user_login(user))
						
						this.props.navigation.navigate('Home')
					}else{
						Alert.alert("Thông báo", "Bạn đã nhập sai tài khoản hoặc mật khẩu");
						
					}
				}).catch(err => {
					Alert.alert("Thông báo", "Bạn đã nhập sai tài khoản hoặc mật khẩu");
						   
				})
				
				
			}else{
				Alert.alert("Thông báo", "Bạn đã nhập sai tài khoản hoặc mật khẩu");
				
			}
		}).catch(err => {
			Alert.alert("Thông báo", "Bạn đã nhập sai tài khoản hoặc mật khẩu");
                   
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
              <View style={styles.sectionavatar}>
                   
              </View>
			  
              <View style={styles.sectioninfo}>
                    <Text style={styles.infotext}>{this.state.user_info.fullName}</Text>
                    <View style={styles.borderbottom}></View>
                    <Text style={styles.infotext}>{this.state.user_info.telephone}</Text>
                    <View style={styles.borderbottom}></View>
                    <Text style={styles.infotext}>{this.state.user_info.username}</Text>
                    <View style={styles.borderbottom}></View>
                    <Text style={styles.infotext}>{this.state.user_info.email}</Text>
                    <View style={styles.borderbottom}></View>
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
                                                      <View style={[styles.btnTextHolder, {marginTop: 200}]}>
                                                                  
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
                                                                        
																		
                                                                        
                                                                  </View>
                                                      </View>
													  <View style={[styles.sectionsubmit]}>
					<TouchableOpacity style={[styles.submit]} onPress={this._save}>
						<Text style={styles.textsubmit}>Đăng nhập</Text>
					</TouchableOpacity>
					
              </View>
			  <View style={[styles.sectionsubmit, {marginBottom:300, marginTop: 10}]}>
					<TouchableOpacity style={[styles.submit,{backgroundColor: '#2f3657' }]} onPress={() => this.props.navigation.navigate('Account')}>
						<Text style={styles.textsubmit}>Đăng ký tài khoản</Text>
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
	paddingTop:10,
	paddingBottom:10,
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
  centertext:{
  	justifyContent:'center',
    alignItems:'center',
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
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
  },
  sectioninfo:{
  	marginTop:height*0.2,

  },
  borderbottom:{
  	height:1,
  	width:width,
  	backgroundColor:'#e9edf2',
  },
});
export default connect(mapStateToProps)(AccountLogin)