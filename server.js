const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 9000;
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
const Question = require('./models/questions');
const morgan = require('morgan');

//setting routes up
const practiceRoutes = require('./routes/practice');
app.use('/practice', practiceRoutes);

//middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//setting view engine
app.set('view engine', "ejs");
app.engine('ejs', ejsMate);
app.set("views", path.join(__dirname, "views"));

//setting up mongodb
try {
    mongoose.connect('mongodb://localhost:27017/proctor')
    console.log("DB Connected!");
} catch (err) {
    console.log("DB Connection Failed!");
};

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log('Server is listening at port', port);
});
