import React from 'react';
import { View, Text, Image, Dimensions, Animated, Platform, StatusBar, RefreshControl, TouchableOpacity, Share } from 'react-native';
import { connect } from 'react-redux';
import Item from './Component/Item';
import styles from './StyleDetail';
import { insertNewsToSaved, querryAllSaved, deleteNewsSaved } from '../../realmDB/SavedSchema';
import { getDataSavedFromRealm } from '../../redux/action/actionCreator';
const { width, height } = Dimensions.get('window');
const HEADER_MAX_HEIGHT = height * 0.6;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 85;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0),
            refreshing: false,
            iconSaved: ""
        };
    }

    componentWillMount = () => {
        const item = this.props.navigation.getParam('item');
        querryAllSaved().then(NewsSaved => {
            const NewsSort = NewsSaved.sort(function (a, b) { return b.published - a.published });
            this.props.getDataSavedFromRealm(NewsSort)
        })
        const RealmDataSaved = this.props.RealmDataSaved;
        for (var i of RealmDataSaved) {
            if (item.links == i.links) {
                var alived = true;
                console.log(alived)
                this.setState({ iconSaved: "https://img.icons8.com/small/16/000000/filled-bookmark-ribbon.png" })
            }
        }
        if (alived == null) {
            this.setState({ iconSaved: "https://img.icons8.com/material-outlined/24/000000/bookmark-ribbon.png" })
        }
        //this.getInfoNews(this.props.navigation.navigate('item').links)
    }

    insertNewsToRealmSaved = (item) => {
        const RealmDataSaved = this.props.RealmDataSaved;
        for (var i of RealmDataSaved) {
            if (item.links == i.links) {
                console.log('1')
                var alived = true;
                console.log('2')
                this.setState({ iconSaved: "https://img.icons8.com/material-outlined/96/000000/bookmark-ribbon.png" })
                if (this.props.navigation.getParam('toDetail') == 'a') {
                    console.log('a')
                } else {
                    deleteNewsSaved(i.id)
                        .then(querryAllSaved().then(NewsSaved => {
                            const NewsSort = NewsSaved.sort(function (a, b) { return b.published - a.published });
                            this.props.getDataSavedFromRealm(NewsSort)
                        })).catch(e => console.log(e))
                }
                break;
            }
        }
        if (alived == null) {
            const NewsSavedCurently = {
                id: Math.floor(Date.now() / 1000),
                title: item.title,
                illustration: item.illustration,
                links: item.links,
                subtitle: item.subtitle,
                published: new Date(),
            }
            this.setState({ iconSaved: "https://img.icons8.com/small/96/000000/filled-bookmark-ribbon.png" })
            insertNewsToSaved(NewsSavedCurently)
                .then(querryAllSaved().then(NewsSaved => {
                    const NewsSort = NewsSaved.sort(function (a, b) { return b.published - a.published });
                    this.props.getDataSavedFromRealm(NewsSort)
                }))
                .catch(e => alert(e))
        }
    }

    onShare = async (item) => {
        try {
            const result = await Share.share({
                message: item.links,
                title: item.title,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    render() {
        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
        );
        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });
        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });
        const titleOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 1, 1],
            extrapolate: 'clamp',
        });
        const titleScale = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 1, 1],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -8],
            extrapolate: 'clamp',
        });
        const item = this.props.navigation.getParam('item');
        const backgroundColor = this.props.light ? "#170B3B" : 'white';
        const backgroundColorHeader = this.props.light ? 'white' : "#170B3B";
        const colorT = this.props.light ? 'black' : 'white';
        const tintColorT = this.props.light ? 'black' : 'white';
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <StatusBar
                    translucent
                    barStyle="light-content"
                    backgroundColor="rgba(0, 0, 0, 0.251)"
                />
                <Animated.ScrollView
                    style={[styles.container]}
                    scrollEventThrottle={1}
                    contentInset={{ top: HEADER_MAX_HEIGHT, }}
                    contentOffset={{ y: -HEADER_MAX_HEIGHT, }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        { useNativeDriver: true },
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            progressViewOffset={HEADER_MAX_HEIGHT}
                            onRefresh={() => {
                                this.setState({ refreshing: true });
                                setTimeout(() => this.setState({ refreshing: false }), 500);
                            }}
                        />
                    }
                >
                    <Item item={item} />
                </Animated.ScrollView>
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.header,
                        { transform: [{ translateY: headerTranslate }] },
                        { backgroundColor: backgroundColorHeader }
                    ]}>
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            {
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }],
                            },
                        ]}
                        source={{ uri: item.illustration }}>
                    </Animated.Image>
                </Animated.View>
                <Animated.View
                    style={[
                        styles.bar,
                        {
                            transform: [
                                { scale: titleScale },
                                { translateX: titleTranslate },
                            ],
                            opacity: titleOpacity,
                        },
                    ]}
                >
                    <View style={styles.viewHeader}>
                        <TouchableOpacity onPress={() => this.props.navigation.pop()} style={styles.backToHome}>
                            <Image source={{ uri: "https://img.icons8.com/ios/50/000000/less-than.png" }} style={[styles.image, { tintColor: tintColorT }]} />
                        </TouchableOpacity>
                        <View style={styles.titleView}>
                            <Text numberOfLines={1} style={[styles.title, { color: colorT }]}>{item.title}</Text>
                        </View>
                        <View style={styles.viewIcon}>
                            <TouchableOpacity onPress = {() => this.onShare(item)} style={styles.ViewOneIcon}>
                                <Image source={{ uri: "https://img.icons8.com/material-outlined/96/000000/share-rounded.png" }} style={[styles.image, { tintColor: tintColorT }]} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.insertNewsToRealmSaved(item)} style={styles.ViewOneIcon}>
                                <Image source={{ uri: this.state.iconSaved }} style={[styles.image, { tintColor: tintColorT }]} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </View >
        )
    }
}

function mapSTP(state) {
    console.log(state.RealmDataSaved)
    return {
        light: state.changeLightReducer.light,
        RealmDataSaved: state.RealmDataSaved
    }
}

export default connect(mapSTP, { getDataSavedFromRealm })(Detail)

