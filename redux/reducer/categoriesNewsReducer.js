import { CHANGE_CHOOSE_TOPIC } from '../action/actionType';
const defaultState = {
    allTopic: [
        {
            id: 0,
            nameTopic: "Tất cả tin",
            color: "red",
            link: "",
            onClick: true
        },
        {
            id: 1,
            nameTopic: "Tin nổi bật",
            color: "#01DF01",
            link: "http://vietnamnet.vn/rss/tin-noi-bat.rss",
            onClick: false
        },
        {
            id: 2,
            nameTopic: "Pháp luật",
            color: "#FFFF00",
            link: "	http://vietnamnet.vn/rss/phap-luat.rss",
            onClick: false
        },
        {
            id: 3,
            nameTopic: "Công nghệ",
            color: "#BDBDBD",
            link: "	http://vietnamnet.vn/rss/cong-nghe.rss",
            onClick: false
        },
        {
            id: 4,
            nameTopic: "Kinh doanh",
            color: "#FA58AC",
            link: "http://vietnamnet.vn/rss/kinh-doanh.rss",
            onClick: false
        },
        {
            id: 5,
            nameTopic: "Giáo dục",
            color: "#00BFFF",
            link: "http://vietnamnet.vn/rss/giao-duc.rss",
            onClick: false
        },
        {
            id: 6,
            nameTopic: "Thời sự",
            color: "#F3F781",
            link: "	http://vietnamnet.vn/rss/thoi-su.rss",
            onClick: false
        },
        {
            id: 7,
            nameTopic: "Giải trí",
            color: "#FA58D0",
            link: "http://vietnamnet.vn/rss/giai-tri.rss",
            onClick: false
        },
        {
            id: 8,
            nameTopic: "Sức khỏe",
            color: "#2EFE2E",
            link: "http://vietnamnet.vn/rss/suc-khoe.rss",
            onClick: false
        },
        {
            id: 9,
            nameTopic: "Thể thao",
            color: "#0040FF",
            link: "http://vietnamnet.vn/rss/the-thao.rss",
            onClick: false
        },
        {
            id: 10,
            nameTopic: "Thế giới",
            color: "#F7BE81",
            link: "http://vietnamnet.vn/rss/the-gioi.rss",
            onClick: false
        },
        {
            id: 11,
            nameTopic: "Bất động sản",
            color: "#FF00FF",
            link: "http://vietnamnet.vn/rss/bat-dong-san.rss",
            onClick: false
        },
        {
            id: 12,
            nameTopic: "Bạn đọc",
            color: "#F4FA58",
            link: "http://vietnamnet.vn/rss/ban-doc.rss",
            onClick: false
        },
        {
            id: 13,
            nameTopic: "Tin mới nóng",
            color: "#4B8A08",
            link: "http://vietnamnet.vn/rss/tin-moi-nong.rss",
            onClick: false
        },
        {
            id: 14,
            nameTopic: "Tuần Việt Nam",
            color: "#0404B4",
            link: "http://vietnamnet.vn/rss/tuanvietnam.rss",
            onClick: false
        },
        {
            id: 15,
            nameTopic: "Góc nhìn thẳng",
            color: "#FF4000",
            link: "http://vietnamnet.vn/rss/goc-nhin-thang.rss",
            onClick: false
        },

    ],
    choosedTopic: {}
}

const categoriesNewsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_CHOOSE_TOPIC:
            return {
                 allTopic: state.allTopic.map(e => {
                    if (e.id == action.id) {
                        return { ...e, onClick: true }
                    } else {
                        return { ...e, onClick: false }
                    }
                }),
                choosedTopic: state.allTopic.filter(e => {
                    if (e.id == action.id) {
                        return e
                    }
                }),
            }


        default:
            return {
                allTopic: state.allTopic,
                choosedTopic: state.allTopic.filter(e => {
                    if (e.onClick == true) {
                        return e
                    }
                })
            };
    }
}

export default categoriesNewsReducer;