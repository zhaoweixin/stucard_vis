const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//--------------------------server config
const MysqlPool = require('./mysql_pool.js');
const mysqlPool = new MysqlPool();
const pool = mysqlPool.getPool();

const assert = require('assert');
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017';
const dbname = 'stu_vis'
//---------------------------------
app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/getfrequentpattern', (req,res,next) => {
    //req.body.config = {'steps': 1}
    MongoClient.connect(url, (err, client) => {
        if(err){
            console.log(err)
        }
        assert.equal(null, err);
        var db = client.db(dbname)
        var result = findFrequentPattern(db, req.body.config, (docs) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.send(docs);
        })
        client.close()
    })
})

app.post('/getHall', (req, res, next) => {
    
    MongoClient.connect(url, (err, client) => {
        if(err){
            console.log(err)
        }
        assert.equal(null, err);
        var db = client.db(dbname)
        var result = findHall(db, req.body.config, (docs) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.send(docs);
        })
        client.close()
    })

    // let data = [
    //     {'country': "Brent", 'date': '2017-11-14 11:46:00', 'price': 2.5},
    //     {'country': "Brent", 'date': '2017-11-14 17:46:00', 'price': 8},
    //     {'country': "Brent", 'date': '2017-11-15 13:46:00', 'price': 8},
    //     {'country': "xx", 'date': '2017-11-14 11:46:00', 'price': 2.5},
    //     {'country': "xx", 'date': '2017-11-15 16:46:00', 'price': 6}
    // ]

    // res.setHeader("Access-Control-Allow-Origin", "*");
    // res.send(data);
})


app.post('/testmongodb', (req, res, next) => {
    //req.body
    MongoClient.connect(url, (err, client) => {
        if(err){
            console.log(err)
        }
        assert.equal(null, err);
        var db = client.db(dbname)
        var result = findDocuments(db, req.body.config, (docs) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.send(docs);
        })
        client.close()
    })
})

app.post('/testmysql', (req, res, next) => {
    pool.getConnection(function(err, connection) {
        connection.query(`select * from behavior`, function(err, result) {
            if(err){
                console.log('query->', sql)
                res.send(err)
            };
            //console.log(result);
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.send(result);
            connection.release();
        });
    });
})

const findDocuments = function(db, config, callback) {
    // Get the documents collection
    const collection = db.collection('behavior');
    // Find some documents
    collection.find(config).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      callback(docs);
    });
  }

  const findFrequentPattern = function(db, config, callback) {
    // Get the documents collection
    const collection = db.collection('frequentpattern');
    // Find some documents
    collection.find(config).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      callback(docs);
    });
  }

  const findHall = function(db, config, callback) {
    // Get the documents collection
    const collection = db.collection(config.table);
    // Find some documents
    collection.find().toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      callback(docs);
    });
  }

app.listen(3000, () => console.log('stu_vis server app listening on port 3000!'))

