const crypto = require('crypto')
const algorithm = 'aes-256-gcm'
const password = crypto.scryptSync('demo', 'salt', 32)

const RESET = Buffer.alloc(0)

const _encrypt = (data, _nonce = null) => {
  let nonce = _nonce || crypto.randomBytes(16)
  let cipher = crypto.createCipheriv(algorithm, password, nonce)
  let buf = Buffer.concat([cipher.update(data), cipher.final()])
  let tag = cipher.getAuthTag()
  return { nonce, buf, tag }
}

const _decrypt = (data, tag, nonce) => {
  try {
    let decipher = crypto.createDecipheriv(algorithm, password, nonce)
    decipher.setAuthTag(tag)
    let buf = Buffer.concat([decipher.update(data), decipher.final()])
    return buf
  } catch (e) {
    return RESET
  }
}

module.exports.encrypt = data => {
  let payload = _encrypt(data)
  let nonce = payload.nonce
  return Buffer.concat([nonce, payload.buf, payload.tag])
}

module.exports.decrypt = data => {
  let nonce = data.slice(0, 16)
  let payload = data.slice(16, -16)
  let tag = data.slice(-16)
  return _decrypt(payload, tag, nonce)
}
