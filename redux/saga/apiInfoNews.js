import axios from 'axios';
import cheerio from 'react-native-cheerio';

function* getInfoNewsFromAPI(urlInfoNews) {
    //console.log(urlInfoNews.linkNews)
    const response = yield axios({
        method: 'get',
        url: urlInfoNews.linkNews
    })
        .then(res => {
            //console.log("res.data");
            const data = res.data;
            const $ = cheerio.load(data);
            //console.log($(".ArticleDetail").html());
            $('.article-relate').remove();
            $('.inner-article').remove();
            $('.ArticleDateTime').remove();
            $('.FmsArticleBoxStyle').remove();
            $('.title').remove();
            $('iframe').remove();
            $('.bold italic').remove();
            $('.italic').remove();
            $('.bold').remove();
            $('.subtitle').remove();
            return $(".ArticleDetail").html();
        })
        .catch(err => console.log('err'))
    return response
}

export const API = {
    getInfoNewsFromAPI
}