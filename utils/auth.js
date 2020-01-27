var admin = require("firebase-admin");


console.log("--path--", require("../config/serviceAccontKey.json"));
var serviceAccount = require("../config/serviceAccontKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://iceipts-b3815.firebaseio.com"
});

function checkAuth(req, res, next) {
    if (req.headers.authtoken) {
      admin.auth().verifyIdToken(req.headers.authtoken)
        .then(() => {
          next()
        }).catch(() => {
          res.status(403).send('Unauthorized')
        });
    } else {
      res.status(403).send('Unauthorized')
  }
}

module.exports = checkAuth;