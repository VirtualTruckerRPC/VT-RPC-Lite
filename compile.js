// VIRTUAL TRUCKER RICH PRESENCE LITE 1.1.0

const {
  compile
} = require('nexe')

compile({
  input: './index.js',
  build: false,
  name: 'release/VTRPC-Lite',
  ico: 'assets/vtrpc.ico'
}).then(() => {
    console.log('success')
})