const PROXY_CONFIG = [
  {
    context: ['/api/'],
    target: {
      host: 'extendz-springboot.herokuapp.com',
      protocol: 'https:',
      port: 443
    },
    secure: false,
    changeOrigin: true,
    logLevel: 'info'
  }
];
module.exports = PROXY_CONFIG;
