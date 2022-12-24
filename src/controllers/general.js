//const fileUpload = require('express-fileupload');
const fs = require("fs")
const path = require('path');


var db = fs.readFileSync(path.resolve(__dirname,'../data/test.json')) ;
db = JSON.parse(db);

var contador = 0;
var indexImg = fs.readdirSync(path.resolve(__dirname, '../../pajitas/imgs/') ).length

/*
TODO:
-express-fileupload
-ver como chequear que sea archivo de imagen
(preferentemente en el front?)
-ver como o donde poner el contador de imagenes
  const pe = fs.readdirSync(path.resolve(__dirname, '../../pajitas/imgs/') )
  console.log("+" + pe)
  console.log("-" + pe.length)


*/

function pappo (req,res) { 
  //res.cookie("test", [4,5],  { secure: true, httpOnly: true, sameSite: 'strict'})
  //console.log(req.cookies.test[1])
  //res.clearCookie("test")
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
  var editable = req.params.id == req.cookies.usuario
  
  res.render(path.resolve(__dirname, '../views/template'), {user: user, editable: editable} )
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
  
  //res.render(path.resolve(__dirname, '../views/template'), {user: user} )
  res.redirect("@"+req.params.id)
}

const createUserForm = (req, res) => {
  res.render(path.resolve(__dirname, '../views/createUser'))
}

const createUserPost= (req, res) => {
  /*tudu:
  -chequear que el usuario no exista previamente (eh nuevo no?)
      -(hacer el response para el caso negativo)
  -chequear que el archivo sea imagen
      -ver ut supra
  -cheuqear tamaño de imagen y comprimirlo si hace falta
*/
  const term = req.files.logo.name.slice(-4);
    
  const user = req.body;
  user.comments= [];
  user.items = [];
  user.logo = indexImg + term
  
  if(db.find( i => i.id == user.id)) {
    res.end("usuario existente, pruebe otro nombre de usuario")
  } else {
    
    req.files.logo.mv(`${path.resolve(__dirname, '../../pajitas/imgs/')}/${indexImg+term}`)
    
    
    db.push(user)
    
    fs.writeFileSync(path.resolve(__dirname, '../data/test.json'), JSON.stringify(db, null, ' ')); 
    
    indexImg++;
    res.cookie("usuario", user.id,  { maxAge: 400 * 24 * 60 * 60 * 1000, secure: true, httpOnly: true, sameSite: 'strict'})
    res.redirect("@"+user.id)
  }

}

const crearposteo = (req, res) => {
  //const posteo = req.body
  
  const term = req.files.urlfoto.name.slice(-4);
  db = db.map( (r,i) => { 
    if(r.id == req.cookies.usuario) {
      
      const posteo = {
        urlfoto: indexImg + term,
        testo: req.body.testo
      }
      r.items.push(posteo)
    }
    return r;
  })
  req.files.urlfoto.mv(`${path.resolve(__dirname, '../../pajitas/imgs/')}/${indexImg+term}`)
  indexImg++;
  fs.writeFileSync(path.resolve(__dirname, '../data/test.json'), JSON.stringify(db, null, ' ')); 
  
  res.redirect("@"+req.cookies.usuario)
}


module.exports ={
  pappo,
  logg,
  fetchh,
  template,
  postComment,
  createUserForm,
  createUserPost,
  crearposteo
}