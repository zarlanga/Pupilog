const express = require('express');
const la66 = require('./src/routers/router.js')

const app = express();

app.use(express.static("./pajitas"))

//app.get('/', (req, res) => {
//  res.send('Hello Express app!')
//});
/*app.use('/', (req, res) => {
  console.log("culo")
  then()
})*/

app.use('/', la66 )

app.listen(3000, () => {
  console.log('server started');
});

/*
const db = require("./src/services/dbmeddler.js")
var test = db.joda
console.log(test)*/