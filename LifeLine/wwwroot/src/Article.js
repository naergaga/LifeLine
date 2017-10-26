import React, { Component } from 'react';
import ArticleTree from './Article/ArticleTree';
import ArticleView from './Article/ArticleView';
import { AddDialog } from './Article/AddDialog';

class Article extends Component {
    constructor() {
        super();

        this.state = { treeVisible: true };

        this.onSelectArticle = this.onSelectArticle.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.toggleShowTree = this.hideTree.bind(this);
        this.showTree = this.showTree.bind(this);
    }

    render() {
        let visible = this.state.treeVisible;
        return <div className="article-wrap">
            <div className="row">
                <div className={visible?"col-md-3 p-0 tree-wrap":"d-none"}>
                    <ArticleTree
                        ref={item => this.tree = item}
                        hideTree={this.hideTree}
                        openDialog={this.openDialog}
                        onSelectArticle={this.onSelectArticle}
                        onArticleEdit={this.onArticleEdit}
                    />
                </div>
                <div className={visible ? "col-md-9" : ""}>
                    <div className={visible ? "d-none":"show-tree-nav"}>
                        <button className="btn btn-light"
                            onClick={this.showTree}
                        ><i className="fa fa-cube fa-fw"></i></button>
                    </div>
                    <ArticleView ref={item => this.articleView = item} />
                </div>
            </div>
            <AddDialog
                workDone={() => {
                    this.tree.fetchData();
                }}
                ref={item => this.dialog = item} />
        </div>;
    }

    onSelectArticle(id) {
        this.articleView.openArticle(id);
    }

    onArticleEdit(id) {
        if (this.articleView){
            this.articleView.removeArticleCache(id);
        }
    }

    openDialog(type, id, name) {
        if (this.dialog) {
            this.dialog.handleOpenModal(type, id, name);
        }
    }

    hideTree() {
        this.setState({ treeVisible: false });
    }

    showTree() {
        this.setState({ treeVisible: true });
    }
}

export default Article;

