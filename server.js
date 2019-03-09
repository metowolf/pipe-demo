const net = require('net')
const Frap = require('frap')
const crypto = require('./crypto')

let server = net.createServer()
server.listen(8838, '0.0.0.0')

server.on('connection', local => {

  let frap = new Frap(local)

  remote = net.connect(8080, '127.0.0.1')
  frap.on('data', data => {
    data = crypto.decrypt(data)
    remote.write(data)
  })

  remote.on('data', data => {
    data = crypto.encrypt(data)
    frap.write(data)
  })

  frap.on('error', () => {})
  remote.on('error', () => {})

})
