import React, {Component} from 'react';
import {AddSheetModal} from './Music/AddSheetModal';
import SongList from './Music/SongList';
import SheetList from './Music/SheetList';

class Music extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentSheet: null,
            showModal: false,
        }

        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.selectSheetChange = this.selectSheetChange.bind(this);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <SheetList
                            ref={(item)=>this.sheetList=item}
                            selectSheetChange={this.selectSheetChange}
                            handleOpenModal={this.handleOpenModal}
                            handleCloseModal={this.handleCloseModal}
                        />
                    </div>
                    <div className="col-md-9">
                        <SongList
                            sheet={this.state.currentSheet}
                            />
                    </div>
                </div>

                <AddSheetModal
                    ref={(item)=>this.modal=item}
                    showModal={this.state.showModal}
                    sheetList={this.sheetList}
                    handleCloseModal={this.handleCloseModal}/>
            </div>
        );
    }

    selectSheetChange(sheet) {
        this.setState({currentSheet: sheet});
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    handleOpenModal(modalInfo) {
        this.modal.setModalInfo(modalInfo);
        this.setState({showModal: true});
    }


}

export default Music;
