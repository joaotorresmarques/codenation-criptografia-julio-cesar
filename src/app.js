const fetch = require('node-fetch')
const fs = require('fs')
const FormData = require('form-data')


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
    console.log(decifrado)
    console.log(sha1)

    fs.writeFile('./util/answer.json', JSON.stringify(datas), (err)=>{
      //console.log(err)
    })
})}

const enviarJson = () => {
  //const stream = fs.createReadStream('./util/answer.json')
  const formData = new FormData()
  formData.append('answer',fs.createReadStream('./util/answer.json'))

 fetch('https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=285c2072e7015979a414b2b1c4f0132be5598dfa',{
   method: 'post',
   body: formData
 }).then(res=> res.json()).then(json => console.log(json))
}

//salvarJson()
//editarJson()
//enviarJson()


