const SUFFIX = process.argv.indexOf('--env') === -1 ? '' :
      '-' + process.argv[process.argv.indexOf('--env')+1]

module.exports = {
  apps : [{
    name: 'matias_nurnberg' + SUFFIX,
    script: 'src/index.js',
    instaces: 2,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: '80'
    },
    env: {
      NODE_ENV: 'production',
      PORT: '80'
    }
    
  },]

};
