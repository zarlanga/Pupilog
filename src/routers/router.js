const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require('path');

module.exports = router

router.get('/66', (req,res) => { 
  res.end("andaras bien")
})

router.get('/pupi', (req,res) => { 
  const pupid = req.query.u
  
  let archivo = fs.readFileSync(path.resolve(__dirname,'../data/test.json'))
  archivo = JSON.parse(archivo)
  
  let ret =archivo.datos.find(p => p.id == pupid) || archivo
  
  console.log("norompiooohh")
  
  ret = JSON.stringify(ret)
  res.end(ret)
  
  
})