# Link API Test

Teste Técnico da link API que consiste na construção de uma integração entre dois serviços web, [Bling](https://www.bling.com.br) e [Pipedrive](https://www.pipedrive.com/pt).

Com a inserção de negócios criados no Pipedrive, que tenham status como ganho, tanto no banco de dados quanto no Bling.
Feito com [NodeJS](https://nodejs.org/en/) e [MongoDB](https://www.mongodb.com/).

---
### Ferramentas

![Platform](https://img.shields.io/badge/Language-NodeJS-green.svg?style=flat)
![Platform](https://img.shields.io/badge/DB-MongoDB-darkgreen.svg?style=flat)
![Platform](https://img.shields.io/badge/VM-Docker-blue.svg?style=flat)

---
### Documentação
- Instale [npx](https://www.npmjs.com/package/npx)
- Entre na pasta do projeto /ApiDocs
- Execute os comandos:
  - **OBS:** se algum dos pacotes estiver faltando apenas pressione **"y"** para instalar e continuar
  
Se windows (pressione tab depois do config):
```shell
$ npx insomnia-documenter --config .\ApiDocumentation.json
$ npx serve
```

Se outro sistema operacional:
```shell
$ npx insomnia-documenter --config ApiDocumentation.json
$ npx serve
```

Agora acesse na web a url da documentação: http://localhost:5000

### Rodar o projeto
- Instale [npm](https://www.npmjs.com/get-npm) se não tiver
- Execute os comandos:
```shell
$ npm install
$ npm run dev // com nodemon
// ou
$ npm start // sem nodemon
```

- Ou rode [Docker](https://www.docker.com/get-started)

<h3>Importante ressaltar que o projeto apenas roda se o arquivo .env existir e estiver com todas as credenciais corretas!</h3>

Pronto!
