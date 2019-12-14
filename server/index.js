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

})


app.post('/getVector', (req,res,next) => {
    //req.body.config = {'label': 1}
    MongoClient.connect(url, (err, client) => {
        if(err){
            console.log(err)
        }
        assert.equal(null, err);
        var db = client.db(dbname)
        var result = findvector(db, req.body.config, (docs) => {
            let data = {'box': [], 'bar': docs[0].value.dept}
            let dict = {
                'raw1': '总存储金额',
                'raw2': '总消费金额/总存储金额',
                'raw3': '食堂消费/总存储',
                'raw4': '一天消费超20RMB次数',
                'raw5': '超市消费次数'
            }
            for(key in dict){

            }
            
            for(key in dict){
                data['box'].push({'x': dict[key],
                                    'low': docs[0]['value'][key][0],
                                    'q1': docs[0]['value'][key][1],
                                    'median': docs[0]['value'][key][2],
                                    'q3': docs[0]['value'][key][3],
                                    'high': docs[0]['value'][key][4]
                                })
            }
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.send(data);
        })
        client.close()
    })
})

app.post('/getCluster', (req,res,next) => {
    //req.body.config = {}
    MongoClient.connect(url, (err, client) => {
        if(err){
            console.log(err)
        }
        assert.equal(null, err);
        var db = client.db(dbname)
        var result = findCluster(db, {}, (docs) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.send(docs);
        })
        client.close()
    })
})

app.post('/getConfig', (req,res,next) => {
    //req.body.config = {}
    MongoClient.connect(url, (err, client) => {
        if(err){
            console.log(err)
        }
        assert.equal(null, err);
        var db = client.db(dbname)
        var result = findConfig(db, {}, (docs) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.send(docs);
        })
        client.close()
    })
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

  const findvector = function(db, config, callback) {
    // Get the documents collection
    const collection = db.collection('vector');
    // Find some documents
    //{"label": -1}
    collection.find(config).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      callback(docs);
    });
  }

  const findCluster = function(db, config, callback) {
    // Get the documents collection
    const collection = db.collection('scatter_plot_data');
    // Find some documents
    //{}
    collection.find().toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      callback(docs);
    });
  }

  const findConfig = function(db, config, callback) {
    // Get the documents collection
    const collection = db.collection('config');
    // Find some documents
    //{}
    collection.find().toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      callback(docs);
    });
  }

app.listen(3000, () => console.log('stu_vis server app listening on port 3000!'))

