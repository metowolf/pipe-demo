const socks = require('@heroku/socksv5')

var srv = socks.createServer()
srv.listen(8080, '127.0.0.1', () => {
  console.log('SOCKS server listening on port 8080')
})

srv.useAuth(socks.auth.None())
