import axios from 'axios';
import qs from 'qs';
//var DataStore = {};
export default class DataManager{
    static getCostBehavior(data){
        //if exist
        return axios.post("http://127.0.0.1:3000/basic_line", qs.stringify(data), {
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
}