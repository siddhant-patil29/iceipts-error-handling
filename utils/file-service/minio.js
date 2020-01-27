
var Minio = require("minio");
const config = require('./../../config/serverConfig');
const minioConfig = config[config.activeEnv]["file-storage-client"];
var client = new Minio.Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: minioConfig.accessKey,
    secretKey: minioConfig.secretKey
});


module.exports = {
//ToDo This is a business login, needs to be moved in common-service
    /**
     * Utility function for encrypt password
     */
    createBucket(bucketName) {
        return new Promise(function(resolve, reject){
            client.makeBucket(bucketName, 'us-east-1', function(err) {
                if (err) return console.log(err)
            
                console.log('Bucket created successfully in "us-east-1".')
            
                var metaData = {
                    'Content-Type': 'application/octet-stream',
                    'X-Amz-Meta-Testing': 1234,
                    'example': 5678
                }
                resolve("success");
            });
        });
    },

    isBucketExists(bucketName){        
        return new Promise(function(resolve, reject){
            console.log("Is bucket exists called: ");
            client.bucketExists(bucketName ,function(err, exists) {
                console.log("err: ",err);
                console.log("success: ", exists);
                if (err) {
                    return reject(err);
                }
                if (exists) {
                    return resolve("success");
                }
                return reject(err);
            }, (success)=>{
                console.log("bucket doesnt exists: ", success);
                return reject(success);
            });
        });
    },

    // createBucket(bucketName){
    //     return new Promise(function(resolve, reject){
    //         return minioClient.makeBucket(bucketName, fileName,  function(err) {
    //             if (err) {
    //                 reject(err);
    //             }
    //             if (exists) {
    //                 resolve(exists);
    //             }
    //           })
    //     })
    // },

    insertFile(bucketName, file){
        let fileName = file.originalname;
        let buffer = file.buffer;
        console.log("insert file called : ");
        return new Promise(function(resolve, reject){
            client.putObject(bucketName, fileName, buffer, function(err, etag) {
                if (err) {
                    reject(err);
                }
                resolve(etag);
              })
        })
    },

    downloadFile(bucketName, fileName, response){
        let size=0;
        let data;
        
        client.getObject(bucketName, fileName, function(e, dataStream) {
            if (e) {
                return console.log(e);
            }
            dataStream.on('data', function(chunk) {
                console.log("chunk: ", chunk);
                size += chunk.length
                data += chunk;
            }).pipe(response);

            dataStream.on('end', ()=> {
                console.log("End. Total size = " + size);
                // console.log("data: ------", data);
                console.log("data: ", data);
            });
            dataStream.on('error', function(e) {
                console.log("errror----- ",e)
                reject(err);
            });
        });
    
    },

    deleteFile(bucketName, fileName){
        client.removeObject(bucketName, fileName, function(err) {
            if (err) {
              return console.log('Unable to remove object', err)
            }
            console.log('Removed the object')
        });
    }
}