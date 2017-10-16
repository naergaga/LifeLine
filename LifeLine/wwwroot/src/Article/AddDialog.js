import * as React from 'react';
import * as axios from 'axios';
import ReactModal from 'react-modal';
import {AxiosForm} from '../Common/AxiosInstance';
import "../css/modal.css";

export class AddDialog extends React.Component {

    constructor() {
        super();

        this.config = {
            add: {
                title: "添加类别",
                btnText: "添加",
                inputText: ""
            },
            edit: {
                title: "修改类别",
                btnText: "修改"
            }
        };
        this.urls = {
            addCategoryUrl: "/api/Category",
            editCategoryUrl: "/api/Category"
        }

        this.axiosIns = AxiosForm.GetIns();

        this.state = {
            type: "add",
            showModal: false
        }

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    render() {
        let config = this.config[this.state.type];

        return <ReactModal
            isOpen={this.state.showModal}
            className="Modal"
            overlayClassName="Overlay"
            contentLabel={config.title}>
            <input ref={item => this.nameInput = item} className="form-control" defaultValue={config.inputText}/>
            <div className="d-flex mt-5">
                <button
                    className="btn btn-primary"
                    onClick={this.handleClick}>{config.btnText}</button>
                <button
                    className="btn btn-primary ml-auto"
                    onClick={this.handleCloseModal}>关闭</button>
            </div>
        </ReactModal>;
    }

    handleCloseModal() {
        this.setState({ showModal: false});
    }

    handleOpenModal(type, id = null, inputText = "") {
        console.log(type, id, inputText);
        let config = this.config[type];
        config.id = id;
        config.inputText = inputText;
        this.setState({type: type, showModal: true});
    }

    handleClick() {
        if (!this.nameInput) return;
        let name = this.nameInput.value;
        let config = this.config[this.state.type];
        if (this.state.type == "add") {
            this.axiosIns.post(this.urls.addCategoryUrl, {parentId:config.id,name: name})
                .then(reponse => {
                    console.log("add");
                    this.props.workDone();
                    this.handleCloseModal();
                });
        } else if (this.state.type == "edit") {
            this.axiosIns.put(this.urls.editCategoryUrl + "/" + config.id, {name: name})
                .then(reponse => {
                    console.log("edit");
                    this.props.workDone();
                    this.handleCloseModal();
                });
        }
    }
}