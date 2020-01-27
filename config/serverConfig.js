
module.exports = {
  "activeEnv":"production",
  "development": {
      "username": "root",
      "password": "shubham16",
      "database": "identitydb",
      "host": "localhost",
      "dialect": "mysql",
      "JWT_SECRET" : "iceipts",
      "JWT_SECRET_EXPIRY_SEC":100000,
      "JWT_TOKEN_ALGORITHM_TYPE":"HS256",
      "DIALECT_OPTIONS":{
        // encrypt: true
         multipleStatements: true,
         socketPath: '/cloudsql/${INSTANCE_CONNECTION_NAME}'
      },
      "redisConnection":{
        "host":"localhost",
        "port":6379,
        "option":{}
      },
      "googleAuth":{
        "clientId":"238688756120-r88ucfvl1o220bsoo88cfr0e2t483s9s.apps.googleusercontent.com",
        "clientSecret":"f3AXQbRMZ50F7FAipBGJrQFF"
      },
      "facebookAuth":{
        "appId":"2382720668478673",
        "appSecret":"0533d14ff3cc8c70f4e662af19faf371"
      },
      "file-storage-client":{
        "name":"minio",
        "accessKey":"Y2X9KE31G9TQ06500M53",
        "secretKey":"vlg50GDmqNKUxgQePeES3P4VPjYlnmPqKFM6MmX6"
      },
      "SWAGGER_URL":"localhost:3000"
  },

  
  "production": {
      "username": "root",
      "password": "iceipts123",
      "database": "identitydb",
      "host": '35.244.31.130',
      "dialect": "mysql",
      "JWT_SECRET" : "iceipts",
      "JWT_SECRET_EXPIRY_SEC":100000,
      "JWT_TOKEN_ALGORITHM_TYPE":"HS256",
      "INSTANCE_CONNECTION_NAME":"iceipts-256709:asia-south1:iceipts-db",
      "DIALECT_OPTIONS":{
        // encrypt: true
         multipleStatements: true,
         socketPath: '/cloudsql/iceipts-256709:asia-south1:iceipts-db'
      },
      "redisConnection":{
        "host":"localhost",
        "port":6379,
        "option":{}
      },
      "googleAuth":{
        "clientId":"238688756120-r88ucfvl1o220bsoo88cfr0e2t483s9s.apps.googleusercontent.com",
        "clientSecret":"f3AXQbRMZ50F7FAipBGJrQFF"
      },
      "facebookAuth":{
        "appId":"2382720668478673",
        "appSecret":"0533d14ff3cc8c70f4e662af19faf371"
      },
      "file-storage-client":{
        "name":"google-cloud-storage",
        "accessKey":"",
        "secretKey":""
      },
      "SWAGGER_URL":"https://iceipts-256709.appspot.com"
    },
  test: {
      dialect: "sqlite",
      storage: ":memory:"
    },
};