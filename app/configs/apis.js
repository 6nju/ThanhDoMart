
import Axios from 'axios'

export default apis = {
    register(username, password) {
        return Axios.post('register-user', { username, password })
    },
   
	getCategories() {
		return Axios.get('api/category')
	},
	getOrder(phone) {
		return Axios.get('api/orders?customerId='+phone+'&pageSize=2000&pageNumber=1')
	},
	getSearch(search, page) {
		return Axios.post('/api/search',{pageSize: 50,pageNumber: page,searchName: search})
	},
	getProducts(id, page) {
		return Axios.post('api/products',{pageSize: 50,pageNumber: page,categoryId: id})
	},
	pay(fullName,  telephone, address, customerId, deliveryCost, subtotal, products, idShipping) {
		return Axios.post('api/order', {
			fullName: fullName,
			telephone: telephone,
			address: address,
			customerId: customerId,
			deliveryCost: deliveryCost,
			subtotal: subtotal,
			statusOrder: 'choXacNhan',
			discount: 0,
			products: products,
			idShipping: idShipping,
		})
	},
	register(fullName, username, telephone, password, email, address, city, district) {
		return Axios.post('api/customer', {
			fullName: fullName,
			telephone: telephone,
			address: address,
			password: password,
			email: email,
			username: username,
			city: city,
			district: district,
		})
	},
	
	getUser() {
		return Axios.get('api/customer')
	},
	login(username, password) {
		return Axios.post('api/logincustomer', {
			username: username,
			password: password,
		})
	},
	getDistrict(id) {
		return Axios.get('api/districts?idProvince='+id)
	},
	getCity() {
			
		return Axios.get('api/provinces')
	},

	getShip() {
		return Axios.get('api/shippingoption')
	},
	getGuild(id) {
		return Axios.get('api/wards?idDistrict='+id)
	},
}