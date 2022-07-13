// Note: this file is non standard, it's imported explicitly
// Reference: https://github.com/terser/terser
module.exports = {
    compress:{},
    mangle: {      
      reserved :['apiUrl','subscriberId','sessionKey', 'capture']
    },
    format: {
      comments: false,
    },
    safari10: true    
  }
  