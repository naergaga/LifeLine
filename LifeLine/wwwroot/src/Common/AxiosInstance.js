import * as axios from 'axios';
import * as qs from 'querystring';

export class AxiosForm{
    static GetIns(){
        return axios.create({
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: [function (data) {
                // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
                let info = qs.encode(data);
                return info;
            }],
        });
    }
}