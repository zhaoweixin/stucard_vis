import axios from 'axios';
import qs from 'qs';
//var DataStore = {};
export default class DataManager{
    static getCostBehavior(data){
        //if exist
        return axios.post("http://localhost:3000/basic_line", qs.stringify({"config": {'name': '18工业设计'}}), {
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
    static test(data){
        //if exist
        return axios.post("http://localhost:3000/testmongodb", qs.stringify(data), {
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
    static getfrequentpattern(data){
        //data = {'config': {'steps': 1}}
        //if exist
        return axios.post("http://localhost:3000/getfrequentpattern", qs.stringify(data), {
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
    static getHall(data){
        //data = {'config': {'table': 'hall_weekday'}}
        //if exist
        console.log('gethall', data)
        return axios.post("http://localhost:3000/getHall", qs.stringify(data), {
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
    static getVector(data){
        //data = {'config': {'label': -1}}
        //if exist
        return axios.post("http://localhost:3000/getVector", qs.stringify(data), {
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
    static getCluster(data){
        //data = {'config': {}}
        //if exist
        return axios.post("http://localhost:3000/getCluster", qs.stringify(data), {
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
    static getConfig(){
        //data = {'config': {}}
        //if exist
        return axios.post("http://localhost:3000/getConfig", qs.stringify(), {
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
}