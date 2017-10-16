export class SheetView {
    id;
    name;
    songs;

    constructor(id, name, songs = []) {
        this.name = name;
        this.songs = songs;
        this.id = id;
    }

}

export class Song {
    id;
    title;
    path;

    constructor(id,title, path) {
        this.title = title;
        this.path = path;
        this.id = id;
    }
}

export class Sheet {
    id;
    name;

    constructor(id,name = 'test') {
        this.name= name;
        this.id = id;
    }
}