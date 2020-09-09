
import { Dimensions, StyleSheet } from 'react-native'
const win = Dimensions.get('window');
const styles = StyleSheet.create({
    imgBackground: {
        flex: 1,
        alignSelf: 'stretch',
        width: win.width,
        height: win.height, 
    },
})

const colors = {
    primaryColor: '#FFA500',
    secondaryColor: '#BC664B',
    tertiaryColor: '#F05F42',
    backgroundColor: '#fff',
    textColor: '#0C0D12'
};

const globalStyles = {
}

export { colors, globalStyles, styles }