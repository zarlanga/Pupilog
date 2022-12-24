const express = require('express');
const la66 = require('./src/routers/router.js')
const path = require('path');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');

//onda que todo esto lo puse al pedo(o no?), ver despues como desinstalarlos
const cors = require('cors');
//const bodyParser = require('body-parser');
//const morgan = require('morgan');
//const _ = require('lodash');



const app = express();


//el template handler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

//pa la data de las request (por ej post)
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//pa el file upload
app.use(cors());
//app.use(morgan('dev'));
app.use(fileUpload({
    createParentPath: true
}));

app.use(cookieParser());

app.use(express.static("./pajitas"))

app.use('/', la66 )

app.listen(3000, () => {
  console.log('server started');
});

/*
const db = require("./src/services/dbmeddler.js")
var test = db.joda
console.log(test)*/