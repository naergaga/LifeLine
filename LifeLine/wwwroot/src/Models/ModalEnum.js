export class ModalEnum{
    add;
    edit;

    constructor(){
        this.add=new ModalInfo(1,"添加歌单","添加");
        this.edit=new ModalInfo(2,"修改歌单","修改");
    }
}

export class ModalInfo{
    id;
    title;
    btnLeftText;
    inputText;
    data;

    constructor(id,title,btnLeftText,inputText=""){
        this.id = id;
        this.title = title;
        this.btnLeftText = btnLeftText;
        this.inputText = inputText;
    }
}