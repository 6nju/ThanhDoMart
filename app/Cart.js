import React from 'react';
import { StyleSheet, Dimensions, Text, View, Button, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Footer } from './components/index'
const width = Dimensions.get('window').width
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExclamationCircle, faTruck, faCommentDollar, faMinus, faPlus, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { ActionCart } from './redux/ActionCart'
const height = Dimensions.get('window').height
class Cart extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            products: (this.props.cart == null) ? [] : this.props.cart,

        }
		
		if(typeof this.state.products == 'undefined'){
			this.setState({products: []})
		}
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
 _delete(id) {
	 let products = this.state.products
	 products.splice(id, 1);
	 this.setState({
				products:products
			})
	this.props.dispatch(ActionCart.set_cart(products))
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
  render() {
    return (
	 <View>
                  
              <View>
                  <ScrollView contentInsetAdjustmentBehavior="automatic"
                      style={{ backgroundColor:'#e9edf2',}}>
    
                                                    
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
  {                       
	(this.state.products.length > 0) ?
                    <View style={[styles.container,styles.Ibar]}>
                    <TouchableOpacity style={styles.Ibuy} onPress={() => this.props.navigation.navigate('Pay', {products : this.state.products})}>
                          <Text style={styles.ibuytext}>THANH TOÁN</Text>
                    </TouchableOpacity>
              </View> : null
  }			  
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
    marginLeft:10,
  },
  text: {
    fontSize: 17,
    color: 'black',
  },
  btnTextHolder: {
    backgroundColor:'#fff',
    marginLeft:16,
    marginRight:16,
    borderRadius:10,
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
	
    width:width*0.56,
    height:width*0.1,
  },
  extext:{
	
    marginLeft:8,
    width:width*0.3,
    color:'#909090',
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
  Ibar:{
    backgroundColor:'#2f3657',
    marginLeft:0,
	marginTop:20,
  },
  Imess:{
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:15,
  },
  Icart:{
    backgroundColor: '#fff',
    width:width*0.4,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height:width*0.1,
    marginTop:7,
    marginBottom:7,
    marginLeft:15,
  },
  Ibuy:{
    backgroundColor: '#ff5c00',
    width:width - 40,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height:width*0.1,
    marginTop:7,
    marginBottom:7,
    marginLeft:15,
  },
  ibuytext:{
    fontWeight:'bold',
    color:'#fff',
    fontSize:15,
  },
});

export default connect(mapStateToProps)(Cart)