# Histórico de desenvolvimento

## 2024-06-06

Ajustado documentação para ser feita de forma manual usando decorators do swagger para facilitar o desenvolvimento e conseguir documentar da melhor forma os endpoints da api. Ao não usar o plugin de CLI eu consigo passar as propriedades com explicações e exemplos para cada parte, além de omitir entidades que não são públicas.

Foi adicionado middleware de autenticação para proteger as rotas de forma global, ainda não está completo, no momento não é feito validação de usuário nem de tokens, apenas autoriza ou rejeita de forma randômica as requisições.

## 2024-06-08

Adicionado feature de cadastro de usuário e rota de login. Iniciando o desenvolvimento da feature de autenticação e autorização.

## 2024-06-09

Adiciona autenticação via cookies e jwt com controle de seção usando redis. E todas rotas estão sendo protegidas pelo guard de autenticação. Usuário é autenticado e autorizado com sucesso, podendo manter a sessão ativa por 1 hora (a ser configurado melhor) e caso o token expire, o usuário é deslogado e precisa logar novamente.

Foi adicionado forma para que um usuário possa ser deslogado da aplicação caso alguma alteração neste usuário seja feita, como por exemplo, alteração de senha.

Adicionado configuração para execução do sonarqube localmente. Ainda não é feito validação de qualidade de código, apenas execução do sonarqube. Proximo passo é adicionar validação de qualidade de código e cobertura de testes.
