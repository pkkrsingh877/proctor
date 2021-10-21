const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

app.use(express.urlencoded({ extended: true }));

//setting view engine
app.set('view engine', "ejs");
app.set("views", path.join(__dirname, "views"));

//setting up mongodb
try {
    mongoose.connect('mongodb://localhost:27017/proctor')
    console.log("DB Connected!");
} catch (err) {
    console.log("DB Connection Failed!");
};

app.get('/', (req, res) => {
    res.send('No problems here!');
});

app.listen(port, () => {
    console.log('Server is listening at port', port);
});
