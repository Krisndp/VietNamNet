import React from 'react';
import { View, Dimensions, ScrollView, Text, FlatList } from 'react-native';
import { querryAllFavorite} from '../../realmDB/FavoriteNewsSchema';
import { connect } from 'react-redux';
import FlatlistItem from './component/FlatlistItem';
import { change_choose_topic, get_all_news, getDataFavoriteFromRealm } from '../../redux/action/actionCreator';
const { width, height } = Dimensions.get('window');

class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentWillMount = async () => {
        await querryAllFavorite()
            .then(NewsFavorite => this.props.getDataFavoriteFromRealm(NewsFavorite))
            .catch(e => console.log(e));
        this.getAllFavoriteNews();
    }

    getAllFavoriteNews = () => {
        const RealmDataFavorite = this.props.RealmDataFavorite;
        const AllFavoriteNews = RealmDataFavorite.map(e => { return e.links });
        //console.log(AllFavoriteNews)
        this.props.get_all_news(AllFavoriteNews)
    }

    onPress = async (id) => {
        await this.props.change_choose_topic(id);
        this.props.navigation.toggleDrawer();
        if(id == 0){
            this.getAllFavoriteNews()
        } else {
            this.props.get_all_news([this.props.categoriesNewsReducer.choosedTopic[0].link]);
        }
    }
    
    render() {
        const allTopic = this.props.categoriesNewsReducer.allTopic;
        const backgroundColor = this.props.light ? '#170B3B' : 'white';
        return (
            <View style={{ flex: 1, paddingTop: 10, backgroundColor }}>
                <FlatList
                    data={allTopic}
                    renderItem={({ item, index }) => <FlatlistItem onPress={() => this.onPress(item.id)} item={item} />}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}
function mapSTP(state) {
    return {
        categoriesNewsReducer: state.categoriesNewsReducer,
        light: state.changeLightReducer.light,
        RealmDataFavorite: state.RealmDataFavorite,
    }
}
export default connect(mapSTP, { change_choose_topic, get_all_news, getDataFavoriteFromRealm })(Drawer)