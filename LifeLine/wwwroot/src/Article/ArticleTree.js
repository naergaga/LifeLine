﻿import React, { Component } from 'react';
import Tree, { TreeNode } from 'rc-tree';
import * as axios from 'axios';
import { TreeSelectInfo } from './TreeModel';
import 'rc-tree/assets/index.css';
import '../css/articleTree.css';
import ToolBar from "./ToolBar";
import TopToolBar from "./TopToolBar";
import { AxiosForm } from '../Common/AxiosInstance';

export default class ArticleTree extends Component {

    constructor() {
        super();

        this.urls = {
            dataUrl: "/api/Article",
            articleAddUrl: "/Article/Add",
            moveUrl: "api/Category/Move",
            removeCategoryUrl: "/api/Category",
            removeArticleUrl: "/api/Article"
        }
        this.axiosIns = AxiosForm.GetIns();

        this.state = {
            treeData: null,
        };

        this.fetchData();
        this.onSelect = this.onSelect.bind(this);
        //this.openArticle = this.openArticle.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.doRefresh = this.doRefresh.bind(this);
        this.removeSelect = this.removeSelect.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.addFolder = this.addFolder.bind(this);
        this.editFolder = this.editFolder.bind(this);
        this.backToRoot = this.backToRoot.bind(this);
    }

    render() {
        //test
        if (!this.state.treeData) return <div>加载中...</div>;

        //呈现目录
        const loopCate = data => {
            let doms = [];
            if (data.subCategories) {
                data.subCategories.map((item) => {
                    doms.push(loopCate(item));
                });
            }
            if (data.articles) {
                doms.push(renderArticles(data.articles));
            }
            if (data.category) {
                return (<TreeNode key={"C" + data.category.id} title={data.category.name}>
                    {doms}
                </TreeNode>);
            }
            return doms;
        };

        //呈现文章
        const renderArticles = articles => {
            return articles.map((article) => {
                return (<TreeNode key={"A" + article.id} title={article.title} />)
            });
        };

        return <div className="tree-nav">
            <TopToolBar
                backToRoot={this.backToRoot}
                hideTree={this.props.hideTree}
            />
            <Tree
                defaultExpandAll={true}
                draggable={true}
                onDragStart={this.onDragStart}
                onDragEnter={this.onDragEnter}
                onDrop={this.onDrop}
                onSelect={this.onSelect}>
                {loopCate(this.state.treeData)}
            </Tree>
            <ToolBar
                ref={item => this.toolBar = item}
                doRefresh={this.doRefresh}
                doEdit={this.editFolder}
                openArticle={this.openArticle}
                removeSelect={this.removeSelect}
                onArticleEdit={this.props.onArticleEdit}
                doAdd={this.addFolder}
                articleAddUrl={this.urls.articleAddUrl}
            />
        </div>
    }

    addFolder() {
        let info = this.selectInfo;
        if (info === undefined) {
            this.props.openDialog("add");
            return;
        }
        this.props.openDialog("add", info.id, info.title);
    }

    editFolder() {
        let info = this.selectInfo;
        this.props.openDialog("edit", info.id, info.title);
    }

    onDragStart(info) {
        //console.log('start', info);
    }

    onDragEnter(info) {
        //console.log('enter', info);
    }

    onDrop(info) {
        const dropId = info.node.props.eventKey.substring(1);
        const dropType = info.node.props.eventKey.substring(0, 1);
        const dragId = info.dragNode.props.eventKey.substring(1);
        const dragType = info.dragNode.props.eventKey.substring(0, 1);

        if (info.dropToGap) {
            if (dropType !== "C") {
                return;
            }
            const loop = (cate, id, callback) => {
                cate.subCategories.forEach((item, index, arr) => {
                    if (item.id === id) {
                        callback(cate.category);
                    }
                });
            }

            console.log("hello");
            let subs = this.state.treeData.subCategories;
            for (var i = 0; i < subs.length; i++) {
                let item = subs[i];
                let cateItem;
                loop(subs, dropId, cate => {
                    cateItem = cate;
                    console.log(cate);
                });
                if (cateItem !== undefined){
                    console.log(cateItem);
                    return;
                }
            }

            console.log(info.node);
        }
        this.axiosIns.post(this.urls.moveUrl, {
            dropId: dropId,
            dragId: dragId,
            dropIsCategory: dropType === "C",
            dragIsCategory: dragType === "C"
        }).then((response) => {
            console.log("drop over");
            this.fetchData();
        });
    }

    onDrop1(info) {
        if (info.dropToGap) return;
        const dropKey = info.node.props.eventKey.substring(1);
        const dropType = info.node.props.eventKey.substring(0, 1);
        const dragKey = info.dragNode.props.eventKey.substring(1);
        const dragType = info.dragNode.props.eventKey.substring(0, 1);
        // const dragNodesKeys = info.dragNodesKeys;
        const loop = (data, key, type, callback) => {
            if (type === "C") {
                data.subCategories.forEach((item, index, arr) => {
                    if (item.category.id === key) {
                        return callback(item, index, arr);
                    }
                });
            }
            else if (type === "A") {
                data.articles.forEach((item, index, arr) => {
                    if (item.id == key) {
                        return callback(item, index, arr);
                    }
                });
            }
            if (data.subCategories) {
                return data.subCategories.forEach(item => loop(item, key, type, callback));
            }
        };
        const data = this.state.treeData;
        let dragObj;

        //找到 删除 取出
        loop(data, dragKey, dragType, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        loop(data, dropKey, dropType, (item) => {
            if (dragType == "C") {
                item.subCategories.push(dragObj);
            } else if (dragType == "A") {
                item.articles = item.articles || [];
                item.articles.push(dragObj);
            }
        });

        this.setState({
            visible: true,
            treeData: data,
        });
    }

    //selectedKeys, e:{selected: bool, selectedNodes, node, event}
    onSelect(selectedKeys, e) {
        let treeNode = e.node;
        let key = treeNode.props.eventKey;
        let type = key.substring(0, 1);
        let id = key.substring(1);
        this.selectInfo = new TreeSelectInfo(type, id, treeNode.props.title);
        //如果是文章，打开
        if (this.selectInfo.type === 'A') {
            this.props.onSelectArticle(this.selectInfo.id);
        }
        //设置toolBar状态
        if (this.toolBar)
            this.toolBar.setState({ selectInfo: this.selectInfo });
    }

    removeSelect() {
        let info = this.selectInfo;
        console.log("remove" + info.positonText);

        let url = info.type == "C" ? this.urls.removeCategoryUrl : this.urls.removeArticleUrl;

        axios.delete(url + "/" + info.id).then(response => {
            console.log("删除成功");
            this.doRefresh();
        });
    }

    //openArticle() {
    //    let selectInfo = this.selectInfo;
    //    if (selectInfo.type === 'A') {
    //        this.props.onSelectArticle(selectInfo.id);
    //    }
    //}

    doRefresh() {
        this.fetchData();
    }

    fetchData() {
        console.log("Fetch Data");
        axios.get(this.urls.dataUrl).then(response => {
            this.setState({
                treeData: response.data
            });
            if (this.toolBar)
                this.toolBar.setState({ isLoad: false });
        });
    }

    backToRoot() {
        if (this.toolBar) {
            //Warning:query dom
            let selectNode = document.querySelector(".rc-tree-node-selected");
            selectNode.className = selectNode.className.replace(" rc-tree-node-selected", "");

            this.toolBar.switchToRoot();
        }
    }

}
