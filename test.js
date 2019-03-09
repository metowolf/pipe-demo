const crypto = require('./crypto')

let message = Buffer.from("I'm METO, I love China!")
console.log('message:', message)

let enc = crypto.encrypt(message)
console.log('encrypt:', enc)

let dec = crypto.decrypt(enc)
console.log('decrypt:', dec)
