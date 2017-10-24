import React, { Component } from 'react';

export default class TopToolBar extends Component {

    constructor() {
        super();
        this.state = {
            
        };
    }

    render() {
        return <div>
            <div className="btn-group w-100">
                <button className="btn btn-light"
                ><i className="fa fa-home fa-fw"></i> 回到根目录</button>
                <button className="btn btn-light"
                    onClick={this.props.toggleShowTree}
                ><i className="fa fa-cube fa-fw"></i> 折叠</button>
            </div>
        </div>;
    }

}

/*
<button className="btn btn-light" title="打开文章"
                    onClick={this.props.openArticle}
                    disabled={!isArticle}><i className="fa fa-file-text-o fa-fw"></i></button>
*/