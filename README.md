Código do teste da Squadra para a MRV,
feito em java com o framework SpringBoot, com o banco de dados sendo hospedado no postgresql
# Como Executar 
##  Pré-requisitos
- Java JDK 11+ instalado
- Maven instalado
- PostgreSQL e o PgAdmin instalado e rodando
- IDE (IntelliJ, Eclipse, VS Code) recomendado

##  Configuração do Banco de Dados
1. Crie o banco de dados no PgAdmin
2. Execute o script arquivo.sql localizado nesse repositório para colocar elementos no banco de dados
3. Edite src/main/resources/application.properties:

```
spring.datasource.url=jdbc:postgresql://localhost:5432/nome_do_banco
spring.datasource.username=usuario
spring.datasource.password=senha
spring.datasource.driver-class-name=org.postgresql.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```
4. Abra o vsCode
5. instale às extensões padrões do springboot
6. Clique em rodar e acesse http://localhost:8080/leads
