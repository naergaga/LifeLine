import React, { Component } from 'react';
import * as axios from 'axios';
import * as prism from 'prismjs';
import { DateUtil } from '../Common/DateUtil';
import ArticleInfos, { ArticleInfo } from './ArticleInfo';
import 'prismjs/themes/prism.css';
import '../css/articleView.css';

export default class ArticleTree extends Component {

    constructor() {
        super();

        this.urls = {
            articleUrl: "/api/Article"
        }

        this.infos = new ArticleInfos();

        this.state = {
            article: null
        };

        this.getArticleUrl = this.getArticleUrl.bind(this);
        this.removeArticleCache = this.removeArticleCache.bind(this);
    }

    render() {
        let article = this.state.article;
        if (!article) {
            return <noscript />;
        }

        return <div>
            <h3>{article.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            <div className="d-flex mt-5">
                <div className="article-time ml-auto">
                    <div><span>创建时间：</span><span>{DateUtil.getDateStr(article.createTime)}</span></div>
                    <div><span>最后修改时间：</span><span>{DateUtil.getDateStr(article.lastModifyTime)}</span></div>
                </div>
            </div>
        </div>;
    }

    openArticle(id) {
        let url = this.getArticleUrl(id);
        let info = this.infos.tryGet(url);
        if (info !== undefined) {
            this.setState({ article: info.data });
            return;
        }
        axios.get(url)
            .then((response) => {
                if (response.data) {
                    this.infos.add(new ArticleInfo(response.data, url));
                    this.setState({ article: response.data });
                }
            });
    }

    removeArticleCache(id) {
        let url = this.getArticleUrl(id);
        console.log(this.infos.TryRemove(url));
    }

    getArticleUrl(id) {
        return this.urls.articleUrl + "/" + id;
    }

    componentDidUpdate() {
        prism.highlightAll();
    }
}
