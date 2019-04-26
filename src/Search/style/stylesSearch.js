import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewHeader: {
        width,
        height: width / 7,
        flexDirection: 'row'
    },
    viewSearch: {
        flex: 6,
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10
    },
    textInput: {
        paddingLeft: 20,
        paddingTop: -5,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: width / 25,
        marginHorizontal: 10,
        flex: 7
    },
    viewHuy: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 25,
        height: 25
    },
    text: {
        color: 'blue',
        fontSize: width / 22
    },
    viewFlatList: { 
        width, 
        height: height - width / 7, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
})

export default styles;