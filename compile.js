// VIRTUAL TRUCKER RICH PRESENCE LITE 1.0.0

const {
  compile
} = require('nexe')

compile({
  input: './index.js',
  build: false,
  name: 'release/VT-RPC-Lite',
  ico: 'assets/vtrpc.ico'
}).then(() => {
    console.log('success')
})