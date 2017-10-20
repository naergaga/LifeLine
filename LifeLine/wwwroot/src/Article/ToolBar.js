import React, { Component } from 'react';

export default class ToolBar extends Component {

    constructor() {
        super();
        this.state = {
            isLoad: true,
            selectInfo: null
        };

        this.setLoad = this.setLoad.bind(this);
        this.setSelectInfo = this.setSelectInfo.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
    }

    render() {
        let isCategory, isNull, isArticle;
        if (!this.state.selectInfo) {
            isNull = true;
            isCategory = false;
            isArticle = false;
        }
        else {
            isNull = false;
            isCategory = this.state.selectInfo.type === "C";
            isArticle = this.state.selectInfo.type === "A";
        }
        return <div>
            <span style={{ height: "1em" }}>{isNull ? "" : this.state.selectInfo.positonText}</span>
            <div className="btn-group w-100">
                <button className="btn btn-light"
                    onClick={this.props.removeSelect}
                    disabled={isNull}
                ><i className="fa fa-remove fa-fw"></i></button>
                <button
                    onClick={this.onEditClick}
                    className="btn btn-light"
                    disabled={isNull}
                    title={isNull ? "" : isArticle ? "修改文章" : "修改类别"}><i className="fa fa-edit fa-fw"></i></button>
                <button
                    title="添加类别"
                    onClick={this.props.doAdd}
                    disabled={isArticle}
                    className="btn btn-light"><i className="fa fa-folder fa-fw"></i></button>
                <a href={isCategory ? this.props.articleAddUrl + "/" + this.state.selectInfo.id : "#"}
                    target="_blank"
                    className={"btn btn-light" + (!isCategory ? " disabled" : "")} title="添加文章">
                    <i className="fa fa-plus fa-fw"></i></a>
                <button className="btn btn-light" title="打开文章"
                    onClick={this.props.openArticle}
                    disabled={!isArticle}><i className="fa fa-file-text-o fa-fw"></i></button>
                <button className="btn btn-light" title="刷新"
                    disabled={this.state.isLoad}
                    onClick={this.props.doRefresh}><i
                        className={"fa fa-refresh fa-fw" + (this.state.isLoad ? " fa-spinner" : "")}></i></button>
            </div>
        </div>;
    }

    setSelectInfo(info) {
        this.setState({ seletInfo: info });
    }

    setLoad(load) {
        this.setState({ isLoad: load });
    }

    onEditClick() {
        let info = this.state.selectInfo;
        if (info.type === "C") {
            this.props.doEdit();
        } else {
            window.open("/Article/Edit/" + info.id, "_blank");
        }
    }
}