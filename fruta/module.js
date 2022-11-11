const ex = require("./module.js")
/*
console.log(ex.tuchota(2,3))
console.log(ex.culo)
console.log(ex.alala())
console.log(ex)*/

ex.pepe()
ex.conthens()

/*

esperar("primer esperar")
  .then( r => r + r)
  .then( d => console.log("1" + d))

console.log("1,5")
pepe()

esperar("segundo esperar")
  .then( r => {console.log("2" + r);
            return esperar(r + " tutu")}
       )
  .then( r => console.log("3" + r))

console.log("3,5")
ex.esperar("tercer esperar")
  .then( r => {console.log("4" + r);
            return ex.esperar(r + " tutu")}
       )
  .then (d => console.log("5" +d ) ) 
*/


function alala() {
  
  for (let i = 0; i<5;i++) console.log(i)
}


function esperar(str, bool) {
  return new Promise((res, rej) =>
    setTimeout( () => {
        if (!bool) res(str)
        else rej("reject")
      }, 2000))
}



async function pepe() {
    try {
      console.log("pepe log 1 ");
      let f = await esperar(" pepe esperar 1 ")
      console.log(f)
      let d = await esperar("pepe esperar 2", true)
      console.log("final del pepe" + f + d)
      } catch (err) {
        console.error("toomal")
        console.error(err)
      } finally {
        console.log("estovasiosientonces")
      }
  }

function conthens() {
  esperar("segundo esperar")
    .then( r => {console.log("2" + r);
              return esperar(r + " tutu")}
         )
    .then( r => console.log("3" + r))
}
console.log("loqueeee???")

exports.culo = "culo"
exports.tuchota = (a,b) => a+b
exports.alala = alala
exports.esperar = esperar
exports.pepe = pepe
exports.conthens = conthens