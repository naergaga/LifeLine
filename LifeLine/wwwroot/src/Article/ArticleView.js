import React, { Component } from 'react';
import * as axios from 'axios';
import * as prism from 'prismjs';
import { DateUtil } from '../Common/DateUtil';
import 'prismjs/themes/prism.css';
import '../css/articleView.css';

export default class ArticleTree extends Component {

    constructor() {
        super();

        this.urls = {
            articleUrl: "/api/Article"
        }

        this.state = {
            article: null
        };
    }

    render() {
        let article = this.state.article;
        if (!article) {
            return <noscript />;
        }

        return <div>
            <h1>{article.title}</h1>
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
        axios.get(this.urls.articleUrl + "/" + id)
            .then((response) => {
                if (response.data) {
                    this.setState({ article: response.data });
                }
            });
    }

    componentDidUpdate() {
        prism.highlightAll();
    }
}
