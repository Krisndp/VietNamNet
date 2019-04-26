const defaultState = [
    {
        id: 1,
        name: 'All News',
        image: 'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/news-512.png'
    },
    {
        id: 2,
        name: 'My Feed',
        image: 'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/news-512.png'
    },
    {
        id: 3,
        name: 'Top',
        image: 'https://cdn1.iconfinder.com/data/icons/web-development-33/24/_network-128.png'
    },
    {
        id: 4,
        name: 'All News',
        image: 'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/news-512.png'
    },
    {
        id: 5,
        name: 'All News',
        image: 'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/news-512.png'
    },
    {
        id: 6,
        name: 'All News',
        image: 'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/news-512.png'
    },
    {
        id: 7,
        name: 'All News',
        image: 'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/news-512.png'
    },
    {
        id: 8,
        name: 'All News',
        image: 'https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/news-512.png'
    },
]

const categoriesReducer = (state = defaultState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default categoriesReducer;