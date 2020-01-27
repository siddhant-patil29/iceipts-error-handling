var Express = require("express");

var BodyParser = require("body-parser");
var app = Express();

app.use(BodyParser.json({limit: "4mb"}));
const config = require('../config/serverConfig');
const clientName = config[config["activeEnv"]]['file-storage-client']['name'];
const client = require('./file-service/'+clientName);
module.exports = {

    // uploadFile: function( bucketName, fileName, buffer){
    uploadFile: function( bucketName, file){
        // Using fPutObject API upload your file to the bucket europetrip.
        console.log("file upload service: ");
        return new Promise( (resolve, reject)=>{
            client.isBucketExists(bucketName).then((result)=>{
                console.log("bucket exists: ", result);
                client.insertFile(bucketName, file).then((result)=>{
                    console.log("Insert file success: ", result)
                    resolve(result);
                },
                (err)=>{
                    console.log("Insert file err: ",err);
                    reject(err);
                })
            }).catch((err)=>{
                console.log("Err: ", err);
                client.createBucket(bucketName).then((result)=>{
                    return client.insertFile(bucketName, file).then((result)=>{                  
                        resolve(result);
                    },
                    (err)=>{
                        reject(err);
                    })
                }
                ,
                (err)=>{
                    reject(err);
                })
            })
        });
    },

    downloadFile : function(bucketName, file, response){
        return new Promise((resolve, reject)=>{
            console.log("Download file util called:");
            try{
                console.log("download file fileUploader: ", )
                return client.downloadFile(bucketName, file, response);
            }
            catch(e){
                console.log("exception catched : ", e); 
            }
            
            // client.downloadFile(bucketName, file)
            // client.downloadFile(bucketName, file).createReadStream().pipe(response).catch(err=>console.log(err));
            // client.downloadFile(bucketName, file, response).then((stream) =>{
            //     console.log("promise returned")
            //     if(!stream) {
            //         console.log("error: ---------", error);
            //         return reject(error);
            //     }
            //     console.log("stream output");
            //     resolve("success");
            //     // stream.pipe(response);
            //     // return resolve("success");
            //     // .pipe(fs.createWriteStream(localFilename))
            // }).catch(err=>{
            //     console.log("error : ",err);
            //     reject(err);
            // });
        })
        
    },
   
    createBucket: async function(bucketName) {
        return new Promise((resolve, reject)=>{
            console.log("create bucket called");
            try{
                console.log("create bucket util function called with bucketName ", bucketName);
                client.createBucket(bucketName);
                // .then((success)=>{
                //     console.log("success ", success);
                //     resolve(success)
                // }, (err)=>{
                //     console.log("error",err);
                //     reject(err);
                // });
            }
            catch(e){
                console.log("exception catched : ", e);
            }
        });
    },
}