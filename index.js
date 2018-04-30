const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
let indexNum=1
//Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'nodemongoprojectdb';
//Use connect method to connect to the server
MongoClient.connect(url, (err,client)=>{
   assert.equal(null,err);
   console.log("Connected successfully to server");

   const db = client.db(dbName);
    insertDocuments(db,()=>{
       // deleteDocument(db, ()=> {
       //updateDocument(db,()=>{    
            findDocuments(db, ()=>{
                indexDocument(db,()=>{
                    client.close();
                }) ;            
            });  
       // });      
       // });
    });
   
}); 

const insertDocuments = (db,callback)=>{
    const collection = db.collection('documents');
    collection.insertMany([
        {index: indexNum++,name:'Kavitha',address:'111 abc st'},{index: indexNum++,name:'Kamal',address:'111 abc st'},
        {index: indexNum++,name:'Vishwa',address:'111 abc st'},{index: indexNum++,name:'Kavya',address:'111 abc st'}
    ], (err,result)=>{
        assert.equal(err,null);
        assert.equal(4,result.result.n);
        assert.equal(4,result.ops.length);
        console.log("Inserted 4 documents into the collection");
        callback(result);
    });
}

const findDocuments = (db,callback)=>{
    //Get the documents collection
    const collection = db.collection('documents');
    //Find some documents
    collection.find({index:3}).toArray((err,docs)=>{
        assert.equal(err,null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}

const updateDocument = (db,callback)=>{
    const collection = db.collection('documents');
    collection.updateOne({index:3}, {$set: {address:'123 xyz st'}},(err,result)=>{
        assert.equal(err,null);
        assert.equal(1,result.result.n);
        console.log("Updated a document");
        callback(result);
    })
}
const deleteDocument = (db,callback)=>{
    const collection = db.collection('documents');
    collection.deleteOne({index:4}, (err,result)=>{
        assert.equal(err, null);
        assert.equal(1,result.result.n);
        console.log("Removed a document")
        callback(result);
    });
}

const indexDocument = (db,callback)=>{
    const collection = db.collection('documents');
    collection.createIndex(
        {name:'Kavitha'}, null, (err,results)=>{
            console.log(results);
            callback();
        }
    )
}


