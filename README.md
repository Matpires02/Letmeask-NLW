# Letmeask-NLW

Desenvolvido um site com um chat para mandar perguntas a serem respondidas. Possui a visão do admin e de usuário.

Para acessar esse projeto e ver como ficou clique [aqui](https://letmeask-fd7cc.web.app)

### Admin
* Pode remover uma pergunta
* Pode marcar uma pergunta como respondida
* Pode destacar uma pergunta
* Pode encerrar a sala

### Usuário
* Pode favoritar uma pergunta, somente se estiver logado
* Pode Criar uma nova pergunta, apenas se estiver logado
* Usuários não logados somente poderão ver as perguntas de outras pessoas

### Para execução local
Para executar localmente esse projeto é necessário de configurar variáveis de ambiente, que devem estar dispostas em um arquivo na pasta raiz do projeto com o nome __.env.local__. Dentro dele há as informações de conexão com o banco de dados realtime do firebase. Após ter feito uma conta, criado um projeto e criado um app do projeto voce terá as seguintes informações de conexão: 
* apiKey
* authDomain
* databaseURL
* projectId
* storageBucket
* messagingSenderId
* appId

Assim dentro do arquivo .env.local vc deverá criar as seguintes variáveis e seus conteúdos serão as informações de conexão já obtidas, com os seguintes nomes:
* REACT_APP_API_KEY = 'sua apikey'
* REACT_APP_AUTH_DOMAIN = 'seu authDomain'
* REACT_APP_DATABASE_URL = 'sua databaseURL'
* REACT_APP_PROJECT_ID = 'seu projectId'
* REACT_APP_STORED_BUCKET = 'seu storageBucket'
* REACT_APP_MESSAGING_SENDER_ID = 'seu messagingSenderId'
* REACT_APP_APP_ID = 'seu appId'

No Realtime Database do seu projeto é possivel definir regras para leitura e escrita, e para funcionar devidamente deve-se colocar como está em __database.rule.json__ é so copiar e substituir lá.

Para iniciar localmente execute os seguintes comandos
> npm install (somente da primeira vez) /n
> yarn start

O projeto vai estar disponivel em: localhost:3000
