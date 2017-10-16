import React, {Component} from 'react';
import * as axios from 'axios';
import {AxiosForm} from "../Common/AxiosInstance";
import {ModalEnum} from "../Models/ModalEnum";

class SheetList extends Component {

    constructor(props) {
        super(props);

        this.urls = {
            removeUrl: "/Sheet",
            getListUrl: "/Music/Sheets",
            addUrl: "/Sheet",
            editUrl: "/Sheet"
        };
        this.axiosIns = AxiosForm.GetIns();
        this.modalEnum = new ModalEnum();

        this.state = {
            sheets: []
        }

        this.fetchSheets();
    }

    render() {
        let sheets = this.state.sheets;

        return <div>
            <table className="w-100">
                <tbody>
                {sheets.map(item => {
                    return <tr key={item.id}>
                        <td>
                            <button className="btn btn-link"
                                    onClick={() => this.setSheet(item.id)}>{item.name}</button>
                        </td>
                        <td>
                            <button
                                onClick={() => {
                                    this.removeSheet(item)
                                }}
                                className="btn btn-outline-secondary border-0">
                                <i className="fa fa-remove fa-fw"></i></button>
                            <button
                                onClick={() => this.handleOpenModal(item)}
                                className="btn btn-outline-secondary border-0">
                                <i className="fa fa-edit fa-fw"></i></button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
            <div className="d-flex">
                <button title="上一页" className="btn btn-light"><i className="fa fa-arrow-left fa-fw"></i></button>
                <button title="下一页" className="btn btn-light"><i className="fa fa-arrow-right fa-fw"></i></button>
                <button onClick={() => this.props.handleOpenModal(this.modalEnum.add)} title="添加歌单"
                        className="btn btn-outline-primary ml-auto mr-lg-5">
                    <i className="fa fa-plus fa-fw"></i>
                </button>
            </div>
        </div>
    }

    removeSheet(sheet) {
        console.log("remove sheet Click");
        axios.delete(this.urls.removeUrl + "/" + sheet.id)
            .then((response) => {
                this.fetchSheets();
            });
    }

    fetchSheets() {
        this.axiosIns.post(this.urls.getListUrl).then((response) => {
            if (response.data instanceof Array) {
                this.setState({sheets: response.data});
                this.props.selectSheetChange(this.state.sheets[0]);
            }
        });
    }

    setSheet(id) {
        let item = this.state.sheets.find((item) => {
            return item.id == id;
        });
        this.props.selectSheetChange(item);
    }

    addSheet(name) {
        let sheets = this.state.sheets;
        for (let i = 0; i < sheets.length; i++) {
            if (sheets[i].title == name) {
                console.log("标题重复了");
                return;
            }
        }
        this.axiosIns.post(this.urls.addUrl, {name: name}).then((response) => {
            if (!response.data.id) {
                console.log("添加sheet出错");
            }
            sheets.push(response.data);
            this.setState({sheets: sheets});
            this.props.handleCloseModal();
        }).catch(function (error) {
            console.log("添加sheet出错");
        });
    }

    editSheet(name, sheet) {
        let index=0;
        let sheets = this.state.sheets;
        for (let i = 0; i < sheets.length; i++) {
            if (sheets[i].title == name) {
                console.log("标题重复了");
                return;
            }
            if (sheets[i].id==sheet.id){
                index = i;
            }
        }

        this.axiosIns.put(this.urls.editUrl + "/" + sheet.id, {name: name}).then((response) => {
            if (!response.data.id) {
                return;
            }
            sheets[index]=response.data;
            this.setState({sheets: sheets});
            this.props.handleCloseModal();

        }).catch(function (error) {
            console.log(error);
        });
    }

    handleOpenModal(item) {
        this.modalEnum.edit.inputText = item.name;
        this.modalEnum.edit.data = item;
        this.props.handleOpenModal(this.modalEnum.edit);
    }

}

export default SheetList;