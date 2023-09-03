var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;

class MongoDBService {

    constructor() {
        // this.dbUrl = 'mongodb://localhost:27017';
        this.dbUrl = "mongodb://story:o0HLSzinzBsG4fmlzO6lOBW2kkwpg7HvTtstamJViRdygYUkCFvfHFAHZLqqmYHdY8S4XaHSvD9tACDbOmFUsw==@story.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@story@";
        this.db = null;
        this.gfs = null;
        this.uploadGridFS = null;
        this.collection=null;
    }

    async start() {
        try {
            await this.connect(this.dbUrl);
            // logger.info('connected to Mongodb.');  
            console.log('connected to Mongodb.');       
        }
        catch (err) {
            // errorlogger.error('Unable to connect to Mongodb. -' + err);
            console.log('Unable to connect to Mongodb. -' + err);
        }
    }

    async connect(url){
        var con = await mongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true });

        this.db = con.db('story');  
    }



    close(done) {
        var mongoDBService = this;
        if (mongoDBService.db) {
            mongoDBService.db.close(function (err, result) {
                mongoDBService.db = null;
            })
        }
    }
}

module.exports = new MongoDBService()