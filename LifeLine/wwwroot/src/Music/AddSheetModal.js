import React, {Component} from 'react';
import ReactModal from 'react-modal';
import {ModalInfo} from "../Models/ModalEnum";
import "../css/modal.css";

export class AddSheetModal extends Component{

    constructor(props){
        super(props);
        this.state={
            modalInfo:new ModalInfo(-1,"test","test")
        };

        this.addSheet = this.addSheet.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    render(){
        let modalInfo = this.state.modalInfo;

        return <ReactModal
            isOpen={this.props.showModal}
            className="Modal"
            overlayClassName="Overlay"
            contentLabel={modalInfo.title}
        >
            <h1>{modalInfo.title}</h1>
            <input className="form-control" defaultValue={modalInfo.inputText} ref={item => this._sheetInput = item}/>
            <div className="d-flex mt-3">
                <button className="btn btn-info" onClick={this.handleClick}>{modalInfo.btnLeftText}</button>
                <button className="btn btn-outline-info ml-auto" onClick={this.props.handleCloseModal}>关闭</button></div>
        </ReactModal>
    }

    handleClick(){
        let info = this.state.modalInfo;
        switch (info.id){
            case 1:this.addSheet();
            break;
            case 2:this.editSheet();
            break;
        }
    }

    addSheet(){
        if (this._sheetInput) {
            let name = this._sheetInput.value;

            if (name == null) {
                console.log("标题不为空");
                return;
            }

            this.props.sheetList.addSheet(name);
        }
    }

    editSheet(){
        if (this._sheetInput) {
            let name = this._sheetInput.value;

            if (name == null) {
                console.log("标题不为空");
                return;
            }

            this.props.sheetList.editSheet(name,this.state.modalInfo.data);
        }
    }

    setModalInfo(modalInfo){
        this.setState({modalInfo:modalInfo});
    }
}