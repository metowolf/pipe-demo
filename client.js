const net = require('net')
const Frap = require('frap')
const crypto = require('./crypto')

let server = net.createServer()
server.listen(1080, '127.0.0.1')

server.on('connection', local => {

  remote = net.connect(8838, '127.0.0.1')

  let frap = new Frap(remote)

  local.on('data', data => {
    data = crypto.encrypt(data)
    frap.write(data)
  })

  frap.on('data', data => {
    data = crypto.decrypt(data)
    local.write(data)
  })

  frap.on('error', () => {})
  local.on('error', () => {})

})
