import React, { Component } from 'react';
import ArtcileTree from './Article/ArticleTree';
import ArticleView from './Article/ArticleView';
import { AddDialog } from './Article/AddDialog';

class Article extends Component {
    constructor() {
        super();

        this.onSelectArticle = this.onSelectArticle.bind(this);
        this.openDialog = this.openDialog.bind(this);
    }

    render() {
        return <div>
            <div className="row">
                <div className="col-md-3">
                    <ArtcileTree
                        ref={item => this.tree=item}
                        openDialog={this.openDialog}
                        onSelectArticle={this.onSelectArticle}
                    />
                </div>
                <div className="col-md-9">
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

    openDialog(type, id, name) {
        if (this.dialog) {
            this.dialog.handleOpenModal(type, id, name);
        }
    }
}

export default Article;

