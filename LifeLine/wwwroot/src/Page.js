import React, { Component } from 'react';
//interface PageState {
//    showCount: number,
//    totalPage: number,
//    currentPage: number,
//    startPage: number,
//}

//interface PageProps {
//    total: number,
//    current: number,
//    onPageChange: Function
//}

export class Page extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showCount: 10,
            totalPage: props.total,
            currentPage: props.current,
            startPage: 1
        };
    }

    render() {
        let arr = [];
        let startPage = this.state.startPage;
        let endPage = this.getEndPage();

        //向上翻页
        let upPageIndex = this.getUpPageIndex();
        let upPage = this.turnPageLink(upPageIndex, "↑")

        for (var i = startPage; i <= endPage; i++) {
            let className = i == this.state.currentPage ? "active" : "";
            arr.push(
                this.getPageLink(i, i.toString(), className)
            );
        }

        //向下翻页
        let downPageIndex = endPage == this.state.totalPage ? endPage : endPage + 1;
        let downPage = this.turnPageLink(downPageIndex, "↓")

        return <div className="music-page">
            <ul className="pagination flex-wrap">
                {upPage}
                {arr}
                {downPage}
            </ul>
        </div>;
    }

    getEndPage() {
        let start = this.state.startPage;
        let length = this.state.showCount;
        let total = this.state.totalPage;
        let tmpEnd = start + length - 1;
        return tmpEnd > total ? total : tmpEnd;
    }

    getUpPageIndex() {
        let start = this.state.startPage;
        let length = this.state.showCount;
        //let total = this.state.totalPage;
        let tmpStart = start - length;
        return tmpStart > 0 ? tmpStart : 1;
    }

    getPageLink(index, text, className) {
        return <li key={index} className={"page-item "+className} onClick={() => { this.turnToPage(index) }}>
            <a href="javascript:void(0);" className="page-link">{text}</a>
        </li>;
    }

    turnPageLink(index, text) {
        return <li className="page-item" onClick={() => { this.turnPage(index) }}>
            <a href="javascript:void(0);" className="page-link">{text}</a>
        </li>;
    }

    turnPage(index) {
        this.setState({
            currentPage: index,
            startPage: index
        });
        this.props.onPageChange(index);
    }

    turnToPage(index) {
        this.setState({ currentPage: index });
        this.props.onPageChange(index);
    }

}
