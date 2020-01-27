
const {Storage} = require('@google-cloud/storage');
// const storage = new Storage();
const storage = new  Storage({
    projectId: 'iceipts-256709',
    keyFilename: './config/keyfile.json'
  })
 // const storage = new Storage({keyFilename: "key.json"});
module.exports = {
        createBucket: async function(bucketName) {
            // Creates the new bucket
            console.log("create bucket wrapper function: ", bucketName);
            await storage.createBucket(bucketName);
            console.log("bucket created?")
            // bucket.create().then(function(data) {
            //     const bucket = data[0];
            //     const apiResponse = data[1];
            // });
        },
        
        isBucketExists(bucketName){
            const bucket = storage.bucket(bucketName);

            console.log("isBucketExists called: ", bucketName);

            console.log("gcp config set: ", storage);
            return new Promise(function(resolve, reject){
                bucket.exists().then(function(data) {
                    const exists = data[0];
                    resolve('success')
                }, function(err){
                    reject("error"+err)
                });
            })   
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
            console.log("insert file called : ");
            return new Promise(function(resolve, reject){
                //     minioClient.putObject(bucketName, fileName, buffer, function(err, etag) {
                //         if (err) {
                //             reject(err);
                //         }
                //         resolve(etag);
                //       })
                // })
                // bucketName.upload(file.originalName, options, function(err, file) {
                //     // Your bucket now contains:
                //     // - "new-image.png" (with the contents of `local-image.png')
                
                //     // `file` is an instance of a File object that refers to your new file.
                // });

                // fs.createReadStream('/Users/stephen/site/index.html')
                // .pipe(file.createWriteStream({ gzip: true }))
                // .on('error', function(err) {})
                // .on('finish', function() {
                //     // The file upload is complete.
                // });
                const bucket = storage.bucket(bucketName);
                const fileToUpload = bucket.file(file.originalname);
    
                const stream = fileToUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
                });
            
                stream.on('error', (err) => {
                    file.cloudStorageError = err;
                    reject(err);
                });
            
                stream.on('finish', () => {
                file.cloudStorageObject = file.originalname;
            
                
                // resolve(file.makePublic()
                //     .then(() => {
                //     file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
                //     next();
                //     })
                // );
                // });
            
                
                resolve("success");
            });
            stream.end(file.buffer);
            });
        },

        downloadFile(bucketName, fileName,res){
            console.log("download file : GCP wrapper called: ", bucketName, fileName);
            const bucket = storage.bucket(bucketName);

            const remoteFile = bucket.file(fileName);

            try{
                let data;
                let size=0;
                var fileStream = remoteFile.createReadStream()
                fileStream.on('error', function(err) {
                    console.log("gcp file download error: ", err);
                });
                fileStream.on('data', function(data) {
                    console.log("response: ", data);
                    size += chunk.length
                    data += chunk;
                  // Server connected and responded with the specified status and
                    //headers.
                 }).pipe(res);
                 fileStream.on('end', function() {
                    console.log("finished fetching all data: ");
                  // The file is fully downloaded.
                });
                
            }
            catch(e){
                console.log("connecting to gcp failed " ,e);
            }
        },
    
        deleteFile(bucketName, fileName){
            minioClient.removeObject(bucketName, fileName, function(err) {
                if (err) {
                  return console.log('Unable to remove object', err)
                }
                console.log('Removed the object')
              });
        }
    }