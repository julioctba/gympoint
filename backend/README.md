Aplicação GymPoint:

Para executar está aplicação será necessário um banco de dados postgress, o nome da data base é "gympoint" neste caso usamos o docker para criar o ambiente ae foi utilizada a versão v10.16.1 do node.

Comando para criar base de dados no docker:
docker run --name gympoint -e POSTGRESS_PASSWORD=docker -p 5432:5432 -d postgres

Criar tabelas no banco:
yarn sequelize db:migrate

Para criar o usuário administrador existe uma seed:
src/database/seeds

Para baixar as dependências:
yarn

Para executar a aplicação:
yarn dev 