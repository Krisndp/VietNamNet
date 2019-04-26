import React from 'react';
import { View, Image, ImageBackground, Text, Alert, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import { get_info_news } from '../../../redux/action/actionCreator'
const urlTriagle = "https://img.icons8.com/cotton/64/000000/warning-triangle.png";
import  styles  from '../styles';

class Item extends React.Component {

    componentWillMount = () => {
        this.props.get_info_news(this.props.item.links, this.props.light)
    }
    render() {
        const item = this.props.item;
        const colorT = this.props.light ? 'white' : 'black';
        const cm = item.cm == null ? "VietNamNet" : item.cm;
        return (
            <View style={styles.container}>
                <View style={styles.viewTotal}>
                    <View style={styles.view1}>
                        <Image source={{ uri: urlTriagle }} style={[styles.icon]} />
                    </View>
                    <View style={styles.view2}>
                        <Text style={{ color: 'blue' }}>{cm}</Text>
                    </View>
                    <View style={styles.view3}>
                        <Text style={{ color: '#848484' }}>{item.publishe}</Text>
                    </View>
                </View>
                <View style={styles.view4}>
                    <Text onPress={this.props.onPress} style={[styles.title, { color: colorT }]}>{item.title}</Text>
                </View>
                <View style={styles.view5} activeOpacity={1}>
                    <HTMLView
                        value={this.props.info}
                        stylesheet={this.props.light ? htmlstyles : null}
                        textComponentProps={{ color: 'red' }} />
                </View>
            </View>
        )
    }
}
function mapSTP(state) {
    return {
        light: state.changeLightReducer.light,
        info: state.infoNewsReducer,
    }
}

export default connect(mapSTP, { get_info_news })(Item)

const htmlstyles = StyleSheet.create({
    p: {
        color: 'white'
    }
})
