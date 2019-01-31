const params = {
  server:{
     host: '0.0.0.0'
   , socket: '0.0.0.0'
   , port: 3004
   , get url(){ return 'http://' + this.host + ':' + this.port }
   , get socketUrl(){ return 'http://' + this.socket + ':' + this.port }
  },
}

module.exports = params

