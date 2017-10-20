export class DateUtil {
    static getDateStr(isoStr) {
        let date = new Date(isoStr);
        return "".concat(date.getFullYear(), ".", date.getMonth(), ".", date.getDate(),
            " ", date.getHours(), ":", date.getMinutes(),":", date.getSeconds());
    }
}