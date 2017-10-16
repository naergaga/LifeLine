import React, {Component} from 'react';
import UploadPreview from "./UploadPreview";
import {AxiosForm} from "../Common/AxiosInstance";
import * as axios from "axios";

class SongList extends Component {

    constructor(props) {
        super(props);
        this.uploadClick = this.uploadClick.bind(this);
        this.handleFile = this.handleFile.bind(this);

        this.urls = {
            songRemoveUrl: "/Music",
            sheetSongsUrl: "/Sheet",
            songAddUrl: "/Music/Add"

        };
        let sheet = this.props.sheet;
        if (sheet) {
            this.sheetName = sheet.name;
            this.initFetchPage(sheet.id, 1);
        }

        this.axiosIns = AxiosForm.GetIns();
        this.state = {files: null, sheetPage: null};

        this.addSongs = this.addSongs.bind(this);
    }

    componentWillReceiveProps(props) {
        let sheet = props.sheet;
        let sheetPage = this.state.sheetPage;
        if (!sheetPage || sheet.id !== sheetPage.id) {
            this.sheetName = sheet.name;
            this.initFetchPage(sheet.id, 1);
        }
    }

    componentDidUpdate() {
        if (this._audio)
            this._audio.volume = 0.5;
    }

    render() {
        if (!this.state.sheetPage) return <noscript/>;
        return <div>
            <h5>当前歌单：{this.sheetName}</h5>
            <input type="file"
                   ref={item => this._fileInput = item}
                   accept="audio/*"
                   onChange={this.handleFile}
                   multiple
                   style={{display: "none"}}/>
            <div className="d-flex">
                <audio
                    ref={item => this._audio = item}
                    src={"./songs/song01.mp3"} controls={true} loop={true}></audio>
                <button title="上传歌曲"
                        onClick={this.uploadClick}
                        className="btn btn-outline-primary ml-auto mr-lg-5"><i className="fa fa-fw fa-plus"></i>
                </button>
            </div>
            <UploadPreview files={this.state.files} addSongs={this.addSongs}/>
            <table className="w-100">
                <thead>
                <tr>
                    <th>标题</th>
                    <th>路径</th>
                </tr>
                </thead>
                <tbody>
                {this.state.sheetPage.songs.map(t => {
                    return <tr key={t.id}>
                        <td>{t.title}</td>
                        <td>{t.path}</td>
                        <td>
                            <button className={"btn btn-light"} onClick={() => this.playSong(t)}>
                                <i className="fa fa-play fa-fw"></i></button>
                            <button className={"btn btn-light"} onClick={() => this.removeSong(t)}>
                                <i className="fa fa-remove fa-fw"></i></button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>
        </div>
    }

    uploadClick() {
        let input = this._fileInput;
        if (input) input.click();
    }

    handleFile() {
        if (!this._fileInput) return;
        this.setState({files: this._fileInput.files});
    }


    playSong(song) {
        if (this._audio) {
            this._audio.src = song.path;
            this._audio.play();
        }
    }

    addSongs(files) {
        if (!files) return;
        let sheetId = this.state.sheetPage.id;
        let form1 = new FormData();
        for (let i = 0; i < files.length; i++) {
            form1.append("songs", files[i]);
        }
        form1.append("sheetId", sheetId);
        axios.post(this.urls.songAddUrl, form1, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            if (response.data.success) {
                console.log('上传成功');
                this.setState({files: null});
                this.fetchPage(this.state.sheetPage.currentPage);
            }
        })
    }

    removeSong(song) {
        axios.delete(this.urls.songRemoveUrl + "/" + song.id).then(response => {
            console.log('删除成功');
            this.fetchPage(this.state.sheetPage.currentPage);
        })
    }

    fetchPage(page) {
        let sheetId = this.state.sheetPage.id;
        this.initFetchPage(sheetId, page);
    }

    initFetchPage(sheetId, page) {
        this.axiosIns.get(
            this.urls.sheetSongsUrl, {
                params: {
                    id: sheetId,
                    currentPage: page,
                    pageSize: 15
                }
            }).then(response => {
            if (response.data.currentPage) {
                this.setState({sheetPage: response.data});
            } else {
                console.log("fetch page error ?_?");
            }
        });
    }
}

export default SongList;