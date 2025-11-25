// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hoskinsbe:Queretaro22$!@cluster0.9wyhj.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// import the routing file to handle the default (index) route
var index = require('./server/routes/app');
const messagesRoutes = require('./server/routes/messages');
const contactsRoutes = require('./server/routes/contacts');
const documentsRoutes = require('./server/routes/documents');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ... 

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/cms')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...
app.use('/messages', messagesRoutes);
app.use('/contacts', contactsRoutes);
app.use('/documents', documentsRoutes);

app.use(express.static(path.join(__dirname, 'dist/cms/browser')));

// Tell express to map all other non-defined routes back to the index page
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
});



async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/cms', {
      useNewUrlParser: true,
    });

    console.log('Connected to database!');

    // List Collections
  //   const collections = await mongoose.connection.db
  // .listCollections()
  // .toArray();
  //   console.log("Collections:", collections.map(c => c.name));

    //List items in contacts collection
//     const docs = await mongoose.connection.db
//   .collection("messages")
//   .find({})
//   .toArray();
// console.log("Messages:", docs);

  } catch (err) {
    console.error('Connection failed: ' + err);
  }
}

// try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("cms").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }


connectDB();
// app.use(function(req,res,next) {
//     // res.render("index");
//      res.sendFile(path.join(__dirname, '../../cms/index.html'));
// });

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
