import axios from 'axios';
import * as rssParser from 'react-native-rss-parser';
//const newsUrl = 'https://vietnamnet.vn/rss/phap-luat.rss';

function* getNewsFromAPI(linkNewsTopic) {
    //alert(JSON.stringify(linkNewsTopic))
    const response = yield axios({
        method: 'get',
        url: linkNewsTopic,
        // params: {
        //     query: 'khắc'
        // }
    })
        .then(response => {
            let data = rssParser.parse(response.data);
            //console.log(data._55);
            return data._55;
        })
        .then(res => {
            console.log(res)
            let data = res.items;
            var cm =res.title.substring(12,50);
            //console.log(cm);
            var arr = [];
            for (i of data) {
                let description = i.description;
                var inital = description.indexOf('/>') + 2;
                var finish = description.indexOf('</');
                if (finish > inital) {
                    var cut = description.substring(inital, finish);
                } else {
                    var firstSymbol = description.indexOf('">')
                    var cut = description.substring(firstSymbol, finish);
                };
                var one = cut.indexOf('<');
                var two = cut.indexOf('>') + 1;
                var des = cut.substring(one, two);
                var subtitle = cut.replace(des, '');
                let links = i.links[0].url;
                let title = i.title;
                let publishe = i.published;
                var fisrtSrc = description.lastIndexOf('src=') + 5;
                var lastSrc = description.lastIndexOf('w=220');
                var illustration = description.substring(fisrtSrc, lastSrc);

                var obj = { title, links, subtitle, illustration, publishe, cm };
                arr.push(obj);
            }
            console.log(arr)
            return arr;
        })
        .catch(function (error) {
            //console.log(error);
        })

        return response
}

export const API = {
    getNewsFromAPI
}