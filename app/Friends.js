import React from 'react';
import { StyleSheet, Text, Dimensions, View, Button } from 'react-native';
const width = Dimensions.get('window').width
export default class Friends extends React.Component {
  render() {
    return (
      <View style={styles.container}>
		<View style={{width: width*.5}}>
        <Button
          title="Back to home"
          onPress={() => alert('This is a button!')}
        />
		</View>
		<View style={{width: width*.5}}>
		<Button
          title="Back to home"
          onPress={() => alert('This is a button!')}
        />
		</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
	flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});