
export default class ArticleInfos {
    constructor() {
        this.infos = [];
    }

    add(info) {
        //if (this.infos.forEach(item => {
        //    if (item.url === info.url) {
        //        return;
        //    }
        //}));
        if (this.infos.length > 10) {
            this.infos.shift(); //删除数组第一个元素
        }
        this.infos.push(info);  //在数组末尾添加元素
        return true;
    }

    tryGet(url) {
        let info;
        this.infos.forEach((item) => {
            if (item.url === url) {
                info = item;
                return false;
            }
        });
        return info;
    }

    onEdit(url) {
        for (let i = 0; i < this.infos.length; i++) {
            let item = this.infos[i];
            if (item.url === url) {
                this.infos.splice(i, 1);
                return false;
            }
        }
    }
}

export class ArticleInfo {
    constructor(data,url) {
        this.data = data;
        this.url = url;
    }
}