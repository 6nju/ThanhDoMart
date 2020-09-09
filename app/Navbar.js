import React from 'react';

export default class Navbar extends React.Component {
  render() {
    return (
      	<View style={styles.navbar}>
            <View style={styles.navicon}>
              <FontAwesomeIcon onPress={() =>this.props.navigation.navigate('Friends')} icon={ faHome } size={20} color={'#ff5c00'} />
            </View>
            <View style={styles.navicon}>
              <FontAwesomeIcon onPress={() =>this.props.navigation.navigate('Friends')} icon={ faComment } size={20} color={'#ff5c00'} />
            </View>
            <View style={styles.navicon}>
              <FontAwesomeIcon onPress={() =>this.props.navigation.navigate('Friends')} icon={ faShoppingCart } size={20} color={'#ff5c00'} />
            </View>
            <View style={styles.navicon}>
              <FontAwesomeIcon onPress={() =>this.props.navigation.navigate('Friends')} icon={ faUser } size={20} color={'#ff5c00'} />
            </View>
        </View>
    );
  }
}

export default Navbar;

const styles = StyleSheet.create({
  navbar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fed3be',
  },
  navicon: {
    alignItems: 'center',
    width: '25%',
    paddingTop: 10,
    paddingBottom: 10,
  }
});