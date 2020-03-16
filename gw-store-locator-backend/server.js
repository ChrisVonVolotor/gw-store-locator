const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const storeRoutes = express.Router();
const PORT = 4000;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/stores', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

storeRoutes.route('/').get(function(req, res) {
    connection.db.collection("locations", function(err, collection){
        collection.find({}).toArray(function(err, data){
            res.json(data);
        })
    });
});



app.use('/locations', storeRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


