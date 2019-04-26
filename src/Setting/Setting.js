import React from 'react';
import { View, Text, Alert, Image, StyleSheet, Dimensions, TouchableOpacity, Touc } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import Header from './Component/Header';
import { querryAllSaved } from '../../realmDB/SavedSchema';
import { querryAll, updateWatchedNews, insertRecentlyRead } from '../../realmDB/allShema';
import { get_all_news, get_info_news, getDataFromRealm, getDataSavedFromRealm, getDataFavoriteFromRealm } from '../../redux/action/actionCreator';
import { querryAllFavorite} from '../../realmDB/FavoriteNewsSchema';
import styles from './styles/stylesSetting';
const { width, height } = Dimensions.get('window');
const urlTriagle = "https://img.icons8.com/cotton/64/000000/warning-triangle.png";
class Setting extends React.Component {

    componentWillMount = async () => {
        await querryAllFavorite()
            .then(NewsFavorite => this.props.getDataFavoriteFromRealm(NewsFavorite))
            .catch(e => console.log(e));
        this.getAllFavoriteNews();
        querryAll().then(allNewsList => {
            const NewsSort = allNewsList.sort(function (a, b) { return b.published - a.published });
            this.props.getDataFromRealm(NewsSort)
        });
        querryAllSaved().then(NewsSaved => {
            const NewsSort = NewsSaved.sort(function (a, b) { return b.published - a.published });
            this.props.getDataSavedFromRealm(NewsSort)
        })
    }

    getAllFavoriteNews = () => {
        const RealmDataFavorite = this.props.RealmDataFavorite;
        const AllFavoriteNews = RealmDataFavorite.map(e => { return e.links });
        //console.log(AllFavoriteNews)
        this.props.get_all_news(AllFavoriteNews)
    }

    CarouselTouch = (item) => {
        this.props.navigation.navigate('Detail', { item });
        this.addToRealm(item)
    }

    addToRealm = async (item) => {
        const RealmDataRecently = this.props.RealmDataRecently;
        for (var i of RealmDataRecently) {
            if (item.links == i.links) {
                var alived = true;
                const NewsUpdate = {
                    id: i.id,
                    published: new Date()
                };
                updateWatchedNews(NewsUpdate)
                    .then(querryAll().then(allNewsList => {
                        const NewsSort = allNewsList.sort(function (a, b) { return b.published - a.published });
                        this.props.getDataFromRealm(NewsSort)
                    })).catch(e => console.log(e))
                break;
            }
        }
        if (alived == null) {
            const recentlyRead = {
                id: Math.floor(Date.now() / 1000),
                title: item.title,
                illustration: item.illustration,
                links: item.links,
                subtitle: item.subtitle,
                published: new Date(),
            }
            insertRecentlyRead(recentlyRead)
                .then(querryAll().then(allNewsList => {
                    const NewsSort = allNewsList.sort(function (a, b) { return b.published - a.published });
                    this.props.getDataFromRealm(NewsSort)
                }))
                .catch(e => alert(e))
        } else { }
    }

    renderItem({ item, index }, parallaxProps) {
        const colorT = this.props.light ? 'white' : 'black';
        return (
            <View style={styles.carouselView}>
                <TouchableOpacity activeOpacity={1} onPress={() => this.CarouselTouch(item)} style={styles.carouselView}>
                    <Image
                        source={{ uri: item.illustration }}
                        containerStyle={styles.containerStyle}
                        style={styles.containerStyle}
                    />
                    <View style={styles.viewTotal}>
                        <View style={styles.view1}>
                            <Image source={{ uri: urlTriagle }} style={styles.icon} />
                        </View>
                        <View style={styles.view2}>
                            <Text style={{ color: 'blue' }}>{item.cm}</Text>
                        </View>
                        <View style={styles.view3}>
                            <Text style={{ color: "#848484" }}>{item.publishe}</Text>
                        </View>
                    </View>
                    <View style={styles.view4}>
                        <Text numberOfLines={2} style={[styles.title, { color: colorT }]}>{item.title}</Text>
                    </View>
                    <View style={styles.view5}>
                        <Text numberOfLines={4} style={[styles.text, { color: colorT }]}>{item.subtitle}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const goHome = () => this.props.navigation.navigate('Home');
        const search = () => this.props.navigation.navigate('Search');
        const backgroundColor = this.props.light ? "#170B3B" : 'white';
        const toggleDrawer = () => this.props.navigation.toggleDrawer();
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <Header setting={goHome} drawer={toggleDrawer} search = {search}/>
                <View style={styles.main}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.props.allNewsReducer}
                        renderItem={(item) => this.renderItem(item)}
                        sliderWidth={width}
                        itemWidth={0.8 * width}
                        sliderHeight={0.7 * height}
                        itemHeight={0.6 * height}
                        layout={'default'}
                        hasParallaxImages={true}
                    />
                </View>
            </View>
        )
    }
}
function mapSTP(state) {
    //console.log(state.allNewsReducer.sort(function (a, b) { return b.publishe - a.publishe }));
    return {
        RealmDataRecently: state.RealmDataRecently,
        linkNewsTopic: state.categoriesNewsReducer.choosedTopic[0].link,
        allNewsReducer: state.allNewsReducer.sort(function(a, b){return 0.5 - Math.random()}),
        light: state.changeLightReducer.light,
        RealmDataSaved: state.RealmDataSaved,
        RealmDataFavorite: state.RealmDataFavorite,
    }
}

export default connect(mapSTP, { get_all_news, get_info_news, getDataFromRealm, getDataSavedFromRealm, getDataFavoriteFromRealm })(Setting)

