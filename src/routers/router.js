const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require('path');

module.exports = router

var db = fs.readFileSync(path.resolve(__dirname,'../data/test.json')) ;

db = JSON.parse(db);

router.get('/66', (req,res) => { 
  res.end("andaras bien")
})

router.get('/ejs', (req,res) => { 
  res.render(path.resolve(__dirname, '../views/ejs'))
})


router.get('/@:id', (req,res) => { 
  var user = db.find((r) => r.id == req.params.id  )
  
  res.render(path.resolve(__dirname, '../views/template'), {user: user} )
})

router.post('/@:id', (req, res) => {
  let indexId;
  db = db.map( (r,i) => { 
    if(r.id == req.params.id) {
      r.comments.push(req.body)
      indexId = i;
    }
    return r;
  })
  console.log(req.body)
  //aca se reescribiria el archivo
  fs.writeFileSync(path.resolve(__dirname, '../data/test.json'), JSON.stringify(db, null, ' ')); 
    
  //var user = db.find((r) => r.id == req.params.id  )
  const user = db[indexId]
  
  res.render(path.resolve(__dirname, '../views/template'), {user: user} )
})


router.get('/pupi', (req,res) => { 
  const pupid = req.query.u
  
  let archivo = fs.readFileSync(path.resolve(__dirname,'../data/test.json'))
  
  archivo = JSON.parse(archivo)
  
  let ret =archivo.find(p => p.id == pupid) || archivo
 
  res.json(ret)
  
})