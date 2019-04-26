import React from 'react';
import { View, Text, FlatList, Dimensions, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { getDataFavoriteFromRealm, get_all_news } from '../../redux/action/actionCreator';
import { querryAllFavorite, deleteAllFavorite, deleteNewsFavorite, insertNewsToFavorite } from '../../realmDB/FavoriteNewsSchema';
import { connect } from 'react-redux';
import Item from './Item';
const { width, height } = Dimensions.get('window');

class Favorite extends React.Component {

    componentWillMount = () => {
        querryAllFavorite()
            .then(NewsFavorite => this.props.getDataFavoriteFromRealm(NewsFavorite))
            .catch(e => console.log(e))
    }

    getAllFavoriteNewsAgain = async () => {
        await querryAllFavorite()
            .then(NewsFavorite => this.props.getDataFavoriteFromRealm(NewsFavorite))
            .catch(e => console.log(e));

        const RealmDataFavorite = this.props.RealmDataFavorite;
        const AllFavoriteNews = RealmDataFavorite.map(e => { return e.links });
        //console.log(AllFavoriteNews)
        this.props.get_all_news(AllFavoriteNews)
    }

    toggleFavorite = (item) => {
        const RealmDataFavorite = this.props.RealmDataFavorite;
        for (var i of RealmDataFavorite) {
            if (item.id == i.id) {
                var alived = true;
                deleteNewsFavorite(i.id)
                    .then(
                        querryAllFavorite()
                            .then(NewsFavorite => this.props.getDataFavoriteFromRealm(NewsFavorite))
                            .catch(e => console.log(e))
                    )
                    .catch(e => console.log(e))
                break;
            }
        }
        if (alived == null) {
            const NewsFavoriteCurently = {
                id: item.id,
                nameTopic: item.nameTopic,
                links: item.link,
            }
            insertNewsToFavorite(NewsFavoriteCurently)
                .then(
                    querryAllFavorite()
                        .then(NewsFavorite => this.props.getDataFavoriteFromRealm(NewsFavorite))
                        .catch(e => console.log(e))
                )
                .catch(e => alert(e))
        }
    }

    render() {
        return (
            <ImageBackground style={{ width, height }} source = {{uri: "http://images2.fanpop.com/image/photos/13900000/Best-fantasy-wallpapers-of-author-Kagaya-Yutaka-fantasy-13958337-1600-1200.jpg"}}>
                <View style={{ flex: 1, borderBottomColor: 'black', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center', flexDirection:'row' }}>
                    <TouchableOpacity onPress={() => {this.props.navigation.pop(), this.getAllFavoriteNewsAgain()}} style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Image source={{ uri: 'https://img.icons8.com/ios/50/000000/less-than.png' }} style={{ width: 20, height: 20, tintColor: 'black' }} />
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 10 }}>
                        <Text style={{ color: 'blue', fontSize: width / 18, fontWeight:'bold' }}>Chuyên mục quan tâm</Text>
                    </View>
                </View>
                <View style={{ flex: 12 }}>
                    <FlatList
                        data={this.props.allTopic.slice(1, 20)}
                        renderItem={({ item }) => <Item toggleFavorite={() => this.toggleFavorite(item)} item={item} />}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </ImageBackground>
        )
    }
}
function MapSTP(state) {
    return {
        RealmDataFavorite: state.RealmDataFavorite,
        allTopic: state.categoriesNewsReducer.allTopic
    }
}
export default connect(MapSTP, { getDataFavoriteFromRealm, get_all_news })(Favorite);