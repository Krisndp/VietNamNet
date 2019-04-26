import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Part1 from './Component/Part1';
import Part2 from './Component/Part2';
import Part4 from './Component/Part4';

class Home extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        const backgroundColor = this.props.light ? "#170B3B" : 'white';
        const gotoSetting = () => this.props.navigation.navigate('Setting');
        const gotoConnectHistory = () => this.props.navigation.navigate('ConnectHistory');
        const gotoSaved = () => this.props.navigation.navigate('Saved');
        const gotoFavorite = () => this.props.navigation.navigate('Favorite');

        return (
            <View style={[styles.container, { backgroundColor: backgroundColor }]}>
                <View style={styles.component}>
                    <Part1 onPress={() => gotoSetting()} />
                    <Part2 onPress={() => gotoConnectHistory()}
                        title={"Xem gần đây"}
                        image={"https://img.icons8.com/windows/96/000000/clock.png"} />
                    <Part2 onPress={() => gotoSaved()}
                        title={"Đánh dấu"}
                        image={"https://img.icons8.com/windows/96/000000/bookmark-ribbon.png"} />
                    <Part2 onPress={() => gotoFavorite()}
                        title={"Quản lý chuyên mục"}
                        image={"https://img.icons8.com/small/96/000000/folder-invoices.png"} />
                    <Part2 onPress={() => { }}
                        title={"Xóa catche"}
                        image={"https://img.icons8.com/ios/100/000000/delete.png"} />
                    <Part4 />
                </View>
            </View>
        )
    }
}
function mapSTP(state) {
    return { light: state.changeLightReducer.light }
}
export default connect(mapSTP)(Home)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    component: {
        flex: 1,
        margin: 20,
        flexDirection: 'column'
    },


})