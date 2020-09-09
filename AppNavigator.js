import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';
import Home from './app/Home';
import List from './app/List';
import Item from './app/Item';
import Account from './app/Account';
import Checkout from './app/Checkout';
import Pay from './app/Pay';
import Search from './app/Search';
import Cart from './app/Cart';
import AccountLogin from './app/AccountLogin';
import History from './app/History';

const screens = {
	Home: { 
		screen: Home,
		navigationOptions: {
			headerShown: false,
		}
	},
	List: { 
		screen: List,
		navigationOptions: {
			headerShown: false,
		}
	},
	Item: { 
		screen: Item,
		navigationOptions: {
			headerStyle: {
      			backgroundColor: '#fed3be',
      			height:70,

    		},
    	title:'Hàng hóa',
		}
	},
	AccountLogin: { 
		screen: AccountLogin,
		navigationOptions: {
			headerStyle: {
      			backgroundColor: '#fed3be',
      			height:70,
	
    		},
		title:'Đăng nhập',	
    	}
	},
	History: { 
		screen: History,
		navigationOptions: {
			headerStyle: {
      			backgroundColor: '#fed3be',
      			height:70,
	
    		},
		title:'Lịch sử',	
    	}
	},
	Account: { 
		screen: Account,
		navigationOptions: {
			headerStyle: {
      			backgroundColor: '#fed3be',
      			height:70,
	
    		},
		title:'Tài khoản',	
    	}
	},
	Checkout: { 
		screen: Checkout,
		navigationOptions: {
			headerStyle: {
      			backgroundColor: '#fed3be',
      			height:70,

    		},
    	}
	},
	Pay: { 
		screen: Pay,
		navigationOptions: {
			headerStyle: {
      			backgroundColor: '#fed3be',
      			height:70,
			
    		},
			title:'Thanh toán',
    	},
		
	},
	Search: { 
		screen: Search,
		navigationOptions: {
			headerShown: false,
		}
		
	},
	Cart: { 
		screen: Cart,
		navigationOptions: {
			headerStyle: {
      			backgroundColor: '#fed3be',
      			height:70,
		
    		},
			title:'Giỏ hàng',
    	},
		
	}
}


const AppNavigator = createStackNavigator(screens);

export default createAppContainer(AppNavigator);