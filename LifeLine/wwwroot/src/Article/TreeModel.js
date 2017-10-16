export class TreeSelectInfo{
    type;
    id;
    positonText;
    title;

    constructor(type, id, title) {
        this.type = type;
        this.id = id;
        this.title = title;
        this.positonText = this.getPositonText();
    }

    getPositonText() {
        let typeText;
        switch (this.type) {
            case 'A':
                typeText = "文章";
                break;
            case 'C':
                typeText = "目录";
                break;
        }
        return typeText + ": " + this.title;
    }
}