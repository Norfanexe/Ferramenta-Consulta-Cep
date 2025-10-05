const https = require('https');

https.get('https://viacep.com.br/ws/01001000/json/', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log(JSON.parse(data));
  });
}).on('error', (err) => {
  console.error('Erro: ', err.message);
});