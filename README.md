# Gringotts Wizarding Bank

Este é um projeto que utiliza a arquitetura limpa para garantir abstração, baixo acoplamento, extensibilidade e coesão, além de promover um design de API claro e manutenção de código limpo seguindo os princípios SOLID.

## Por que escolher arquitetura limpa?

### Abstração, acoplamento, extensibilidade e coesão
A arquitetura limpa foi escolhida para garantir uma separação clara de responsabilidades, promovendo uma maior abstração das camadas do sistema, baixo acoplamento entre os componentes, facilitando assim a extensibilidade e mantendo a coesão das diferentes partes da aplicação.

### Design de API
Ao adotar a arquitetura limpa, buscamos um design de API claro e intuitivo, facilitando a interação e integração com outras partes do sistema, bem como com possíveis clientes ou consumidores externos.

### Clean Code
A arquitetura limpa nos permite seguir práticas de desenvolvimento de código limpo, promovendo a legibilidade, manutenibilidade e testabilidade do código fonte.

### SOLID
Os princípios SOLID são fundamentais para garantir um design de software robusto e escalável. A arquitetura limpa é uma abordagem que naturalmente se alinha com esses princípios, tornando mais fácil a aplicação de cada um deles em nosso projeto.

## Como utilizar e rodar os scripts

Para executar os scripts disponíveis no projeto, você pode utilizar os seguintes comandos:

- `npm start`: Inicia o servidor da aplicação.
- `npm test`: Executa todos os testes da aplicação.
- `npm run test:unit`: Executa os testes unitários em modo de observação.
- `npm run test:integration`: Executa os testes de integração em modo de observação.
- `npm run test:staged`: Executa apenas os testes relacionados aos arquivos modificados.
- `npm run test:ci`: Executa os testes em modo de integração contínua, gerando relatórios de cobertura.

## Libs utilizadas

### DevDependencies

- **husky**: Permite configurar ganchos (hooks) do Git, como pré-commit e pré-push, para automatizar tarefas.
- **jest**: Framework de teste para JavaScript que oferece uma experiência de teste completa.
- **lint-staged**: Executa scripts em arquivos estagiados durante o processo de commit.
- **standard**: Define um estilo de código JavaScript consistente.
- **supertest**: Biblioteca de teste HTTP que fornece uma API fluente para fazer solicitações HTTP em testes.

### Dependencies

- **express**: Framework web para Node.js que oferece uma abstração simples para lidar com solicitações HTTP.
- **fast-glob**: Biblioteca para pesquisa de arquivos em JavaScript, com suporte a padrões glob.
- **validator**: Biblioteca para validação de dados em JavaScript.

## Observações sobre usecases e repositórios

Os usecases e repositórios incluídos neste projeto são meramente ilustrativos e foram criados para demonstrar a implementação da arquitetura de forma mais coesa. Eles não são necessários para a solução final, mas podem servir como ponto de partida para desenvolvimentos futuros.

## Como rodar o projeto

Para rodar o projeto, siga estes passos:

1. Clone o repositório para o seu ambiente local.
2. Certifique-se de ter o Node.js e o npm instalados.
3. Instale as dependências executando `npm install` no diretório raiz do projeto.
4. Após a instalação das dependências, você pode usar os comandos listados acima para iniciar o servidor, executar testes, etc.

Isso é tudo! Você está pronto para começar a trabalhar com o projeto. Se tiver alguma dúvida ou problema, consulte a documentação ou entre em contato com a equipe de desenvolvimento.
