const crypto = require('crypto')

const sha1 = (valor) => {
  valore = crypto.createHash("sha1").update(valor).digest("hex")
  return valore
}

module.exports = sha1