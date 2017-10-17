import React, { Component } from 'react';
import * as axios from 'axios';
import * as prism from 'prismjs';
import 'prismjs/themes/prism.css';

export default class ArticleTree extends Component {

    constructor() {
        super();

        this.urls = {
            articleUrl:"/api/Article"
        }

        this.state={
            article: null
        };
    }

    render() {
        console.log(prism);
        let article = this.state.article;
        if (!article) {
            return <noscript />;
        }
        
        return <div>
            <h1>{article.title}</h1>
            <div dangerouslySetInnerHTML={{ __html:article.content }}></div>
            <div>
                创建时间：{article.createTime}
                最后修改时间：{article.lastModifyTime}
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

    componentDidUpdate(){
        prism.highlightAll();
    }
}
