const fs = require("fs")
const path = require('path');

var contador = 0
var db = fs.readFileSync(path.resolve(__dirname,'../data/test.json')) ;
db = JSON.parse(db);


function pappo (req,res) { 
  res.end("anduvo bien")
}

const logg =  (req, res, next) =>{
  console.log(++contador + " atata")
  const testo = `${contador} / ${ Date() } \n`
  fs.appendFileSync(path.resolve(__dirname, '../data/log.txt'), testo );
  next()
}

const fetchh = (req,res) => { 
  const pupid = req.query.u
  
  let archivo = fs.readFileSync(path.resolve(__dirname,'../data/test.json'))
  
  archivo = JSON.parse(archivo)
  
  let ret = archivo.find(p => p.id == pupid) || archivo
 
  res.json(ret)
  
}

const template =  (req,res) => { 
  var user = db.find((r) => r.id == req.params.id  )
  
  res.render(path.resolve(__dirname, '../views/template'), {user: user} )
}

const postComment = (req, res) => {
  let indexId;
  db = db.map( (r,i) => { 
    if(r.id == req.params.id) {
      r.comments.push(req.body)
      indexId = i;
    }
    return r;
  })
  
  //aca se reescribiria el archivo
  fs.writeFileSync(path.resolve(__dirname, '../data/test.json'), JSON.stringify(db, null, ' ')); 
    
  //var user = db.find((r) => r.id == req.params.id  )
  const user = db[indexId]
  
  res.render(path.resolve(__dirname, '../views/template'), {user: user} )
}

module.exports ={
  pappo,
  logg,
  fetchh,
  template,
  postComment
}