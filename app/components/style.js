import React from 'react';
import { StyleSheet,Dimensions } from 'react-native';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign:'left',
    marginLeft:18,
  },
  title: {
    color: '#2f3657',
    fontSize: 20,
    fontWeight: '600',
    width:width*0.55,
  },
  wrapper: {
    height:width,
  },
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:25,
  },
  image:{
    
  },
  amount:{
    width:width*0.07,
    backgroundColor:'#ffc0a8',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height:width*0.07,
    marginTop:4,
  },
  atext:{
    width:width*0.10,
    justifyContent: 'center',
    color: '#2f3657',
    alignItems: 'center',
    fontWeight: '600',
  },
  middletext:{
    color: '#2f3657',
    fontSize: 20,
    fontWeight:'bold',
	marginTop: 15,
  },
  price:{
    fontWeight:'bold',
    fontSize:12,
    color:'orange',
  },
  oldprice:{
    color:'#c0c0c0',
    fontSize: 20,
  },
  newprice:{
    color:'#ff5c00',
    fontSize: 20,
  },
  discount:{
    color: '#2f3657',
    fontSize: 15,
    fontWeight:'bold',
  },
  line:{
    height:1,
    borderRadius:10,
    backgroundColor:'#c0c0c0',
    marginTop:-13,
    width:width*0.24,
  },
  right:{
    width:width*0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center:{
    width:width*0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  left:{
    width:width*0.35,
  },
  section2:{
    marginLeft:18,
    backgroundColor:'#fff',
    marginRight:18,
    borderRadius:10,
    marginTop:10,
  },
  ibrand:{
    marginLeft:7,
    color: '#2f3657',
    fontWeight:'bold',
    marginTop:10,
    marginBottom:10,
  },
  linebrand:{
    borderBottomColor: '#e9edf2',
    borderBottomWidth: 2,
    height:1,
  },
  idetail:{
    marginLeft:7,
    color: '#2f3657',
    fontWeight:'bold',
    marginTop:10,
  },
  icontent:{
    marginLeft:7,
    color: '#7a7a7a',
    fontSize:12,
    marginTop:15,
    marginBottom:20,
  },
  section3:{
    marginLeft:18,
    backgroundColor:'#fff',
    marginRight:18,
    borderRadius:10,
    marginTop:10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign:'left',
    marginBottom:10,
  },
  tranfer1:{
    justifyContent: 'center',
    alignItems: 'center',
    width:width*0.30,
    marginTop:10,
    marginBottom:10,
  },
  tranfertext:{
    textAlign:'center',
    color: '#2f3657',
    fontSize:12,
    width:'65%',
    marginTop:5,
  },
  Ibar:{
    backgroundColor:'#2f3657',
    marginLeft:0,
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
    width:width*0.4,
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