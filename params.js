const params = {
  server:{
     host: '192.168.99.100'
   , port: 3004
   , get url(){ return 'http://' + this.host + ':' + this.port }
  },
}

module.exports = params

