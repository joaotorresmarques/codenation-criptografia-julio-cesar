const fetch = require('node-fetch')
const fs = require('fs')

const decode = require('./modules/decode')
const sha1s = require('./modules/sha1')

const salvarJson = () => {
fetch('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=285c2072e7015979a414b2b1c4f0132be5598dfa')
  .then(response => response.text())
  .then(json => fs.writeFile('./util/answer.json', json, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('JSON salvo!')
    }
  }))
}

const editarJson = () => {
  fs.readFile('./util/answer.json', (err,data)=>{
    const datas = JSON.parse(data)
    const decifrado = decode(datas.cifrado,1)
    const sha1 = sha1s(decifrado)

    datas.decifrado = decifrado
    datas.resumo_criptografico = sha1
    console.log(datas)

    fs.writeFile('./util/answer.json', JSON.stringify(datas), (err)=>{
      console.log(err)
    })
})}

editarJson();


/*
  const obj = JSON.parse(json)
  const decifrado = decode(obj.cifrado,1)
  const sha1 = sha1s(cifrado)

  console.log(decifrado)
  */
