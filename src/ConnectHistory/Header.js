import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import styles from './style/stylesHeader';

class Header extends React.Component {

    render() {
        const light = this.props.light;
        const colorText = light ? 'white' : 'black';
        const backgroundColor = light ? "#170B3B" : 'white';
        const colorIcon = light ? 'white' : 'black';
        const borderBottomColorView = light ? 'white' : 'black';
        return (
            <View style={[styles.container, { backgroundColor, borderBottomColor: borderBottomColorView }]}>
                <TouchableOpacity onPress={this.props.backToSetting} style={styles.back}>
                    <Image style={[styles.image, { tintColor: colorIcon }]} source={{ uri: "https://img.icons8.com/ios/50/000000/less-than.png" }} />
                </TouchableOpacity>
                <View style={styles.text}>
                    <Text style={[styles.textHeader, { color: colorText }]}>XEM GẦN ĐÂY</Text>
                </View>
                <TouchableOpacity onPress={this.props.delete} style={[styles.deleteAll]}>
                    <Image style={[styles.image, { tintColor: colorIcon }]} source={{ uri: "https://img.icons8.com/material-outlined/96/000000/trash.png" }} />
                </TouchableOpacity>
            </View>
        )
    }
}
function MapSTP(state) {
    return {
        RealmDataRecently: state.RealmDataRecently,
        light: state.changeLightReducer.light
    }
}
export default connect(MapSTP)(Header)

