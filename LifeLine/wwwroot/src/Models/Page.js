export class SheetPage {
    currentPage;
    songs;
    totalPage;
    pageSize;
    id;
    name;

    constructor(id, name){
        this.id = id;
        this.name = name;
        this.songs=[];
        this.currentPage=1;
        this.pageSize=15;
    }
}