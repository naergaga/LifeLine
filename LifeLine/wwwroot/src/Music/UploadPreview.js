import React, {Component} from 'react';

class UploadPreview extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let files = this.props.files;
        if (!files) {
            return <noscript/>;
        }

        return <div>
            <ul>
                {Array.prototype.map.call(files, (file,index) => {
                    return <li key={index}>
                        {file.name},{file.size}
                    </li>
                })}
            </ul>
            <div className="d-flex">
            <button
                onClick={()=>this.props.addSongs(files)}
                className="ml-auto mr-lg-5 btn btn-secondary">上传</button>
            </div>
        </div>
    }

}

export default UploadPreview;