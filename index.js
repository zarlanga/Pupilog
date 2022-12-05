const express = require('express');
const la66 = require('./src/routers/router.js')
const path = require('path');
const app = express();


//el template handler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

//pa la data de las request (por ej post)
app.use(express.urlencoded());
app.use(express.json());


app.use(express.static("./pajitas"))

app.use('/', la66 )

app.listen(3000, () => {
  console.log('server started');
});

/*
const db = require("./src/services/dbmeddler.js")
var test = db.joda
console.log(test)*/