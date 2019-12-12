const mysql = require('mysql')

class MysqlPool {
    constructor(){
        this.flag = true;
        this.pool = mysql.createPool({
            //connectionLimit: 100,
            host:'119.23.31.186',
            //host:'localhost',
            user:'mysqld',
            password:'my1768',
            database:'stu_vis',
            port:3306,
            multipleStatements: true
        });
    }
    getPool(){
        if(this.flag){
            this.pool.on('connection', (connection)=>{
                connection.query('SET SESSION auto_increment_increment=1');
                this.flag = false;
            });
        }
        return this.pool;
    }
}

module.exports = MysqlPool;