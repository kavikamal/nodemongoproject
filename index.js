const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

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
                indexCollection(db,()=>{
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
        {name:'Kavitha',address:'111 abc st'},{name:'Kamal',address:'111 abc st'},
        {name:'Vishwa',address:'111 abc st'},{name:'Kavya',address:'111 abc st'}
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
    collection.find({name:'Kavitha'}).toArray((err,docs)=>{
        assert.equal(err,null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
}

const updateDocument = (db,callback)=>{
    const collection = db.collection('documents');
    collection.updateOne({name:'Vishwa'}, {$set: {address:'123 xyz st'}},(err,result)=>{
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

const indexCollection = (db,callback)=>{
    const collection = db.collection('documents');
    collection.createIndex(
        {name:1}, null, (err,results)=>{
            console.log(results);
            callback();
        }
    )
}


