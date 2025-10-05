// 1 - MÓDULOS IMPORTADOS
// Este módulo esportado permite realizar requisições HTTP para consultar um CEP na API ViaCEP.
const https = require('https');
// Este segundo módulo permite ler entradas do terminal, neste caso, o CEP a ser consultado.
const readline = require('readline');

// 2 - LÓGICA DO PROGRAMA
// Cria uma interface de leitura no terminal para entrada (stdin) e saída (stdout).
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Pergunta o CEP ao usuário e armazena na variável 'cep'.
rl.question('Digite o CEP: ', (cep) => {
  // Monta a URL da API do ViaCEP com o CEP digitado.
  const url = `https://viacep.com.br/ws/${cep}/json/`;

  // Faz uma requisição GET para a URL da API do ViaCEP.
  https.get(url, (res) => {
    // Cria uma variável 'data' para armazenar os dados recebidos da API.
    let data = '';

    // Recebe os dados em partes (chunks) e os concatena na variável 'data'.
    res.on('data', (chunk) => {
      data += chunk;
    });

// 3 - FINALIZAÇÃO DA REQUISIÇÃO
    // Quando terminar de receber, processa os dados, converte de JSON para exibir no console.
    res.on('end', () => {
      const endereco = JSON.parse(data);

      if (endereco.erro) {
        console.log('❌ CEP não encontrado.');
      } else {
        console.log(`\n📍 Endereço encontrado:
Logradouro: ${endereco.logradouro}
Bairro: ${endereco.bairro}
Cidade: ${endereco.localidade}
Estado: ${endereco.uf}`);
      }

      rl.close();
    });
  }).on('error', (err) => {
    // Exibe mensagem de erro caso a requisição falhe (Sem conexão, URL inválida ou API fora do ar).
    console.error('Erro ao consultar o CEP, tente novamente mais tarde:', err.message);
    rl.close();
  });
});