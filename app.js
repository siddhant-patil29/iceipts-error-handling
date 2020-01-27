/**
 *  This module is starting point of the server
 *  @module app
 *  @author Shubham.Gorde
 *  @version 1.0.0
 */
var createError = require('http-errors');
var express = require('express');
const expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var swaggerJSDoc = require('swagger-jsdoc');
const cors = require('cors');

var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');

var indexRouter = require('./routes/index');
var auth = require('./utils/auth');
const visitorRouter = require('./routes/visitors');
const rolesRouter = require('./routes/roles');
var usersRouter = require('./routes/users');
var receiptsRouter = require('./routes/receipts');
var wishlistRouter = require('./routes/wishlist');
var tagsRouter = require('./routes/tags');
var reimbursementRouter = require('./routes/reimbursements');
var notificationRouter = require('./routes/notifications');
var serviceRequestRouter = require('./routes/serviceRequests');
var subscriptionRouter = require('./routes/subscriptions');
var bidRouter = require('./routes/bids');
var feedbackRouter = require('./routes/feedbacks');
const warrantyRouter = require('./routes/warranties');
const transactionHistoryRouter = require('./routes/transactionHistories');
const customerRetailerAssociationRouter = require('./routes/customerRetailerAssociations');
var warrantyItemRouter = require('./routes/warrantyItems');


var debug = require('debug');
var config=require('./config/serverConfig');
config = config[config.activeEnv];

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: config.SWAGGER_URL,
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: 
  ['./routes/roles.js','./routes/users.js', './routes/receipts.js', './routes/wishlist.js','./routes/serviceRequests.js', './routes/tags.js',
  './routes/reimbursements.js','./routes/notifications.js', './routes/subscriptions.js', './routes/bids.js','./routes/feedbacks.js', './routes/warranties.js',
  './routes/warrantyItems.js', './routes/customerRetailerAssociations.js', './routes/transactionHistories.js']
  // pass all in array  
 };

 // initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(expressValidator());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.disable('etag');
app.use('/', indexRouter);
// app.use('/', auth);
app.use('/visitors', visitorRouter);
app.use('/roles',rolesRouter);

//pagination
app.use('/users', usersRouter);
app.use('/paginate',usersRouter);


app.use('/receipts', receiptsRouter);
app.use('/wishlist', wishlistRouter);
app.use('/service-requests', serviceRequestRouter);
app.use('/tags', tagsRouter);

app.use('/reimbursements',reimbursementRouter);
// app.use('/notifications', notificationRouter);

// app.use('/service-requests', serviceRequestRouter);
app.use('/subscriptions', subscriptionRouter);
app.use('/bids', bidRouter);
app.use('/feedbacks', feedbackRouter);
app.use('/warranties', warrantyRouter);
app.use('/warranty-items', warrantyItemRouter);
app.use('/transaction-history', transactionHistoryRouter);
app.use('/customer-retailer-association', customerRetailerAssociationRouter);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

process.on('uncaughtException', function (err) {
  
  console.log("Unhandled exception:  ", err);
  console.error(err.stack);
});

process.on('unhandledRejection', error => {
  // Won't execute
  console.log('unhandledRejection', error);
});


var portNumber = process.env.port || process.env.PORT || config.PORT || 3000;
app.set('port', portNumber);

console.log("portNumber ", portNumber);
var server = app.listen(app.get('port'), function (err,res) {
  if(err){
    debug("Unable to start server "+ config.PORT);
  }
  else{
    debug('Express server listening on port ' + server.address().port);
  }
});

// new swagger(app);
module.exports = app;
