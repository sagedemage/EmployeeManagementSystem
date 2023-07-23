# EmployeeManagementSystem
A project for learning about Spring with Spring Boot

## Dependencies
- Spring Boot Dev Tools - **DEVELOPER TOOLS**
- Spring Web - **WEB**
- Rest Repositories - **WEB**
- Thymeleaf - **TEMPLATE ENGINES**
- Spring Data JPA - **SQL**
- H2 Database - **SQL**
- MySQL Driver - **SQL**

## Commands for Utilizing the API
### Create
```
curl localhost:8080/employee/add -d name=Bob -d email=bob@email.com -d phone_number=1234562341
```

### Read
```
curl localhost:8080/employee/all
```

### Update
```
curl -X PATCH localhost:8080/employee/update -d id=52 -d name=Sam -d email=sam@email.com -d phone_number=2223334444
```

### Delete
```
curl -X DELETE localhost:8080/employee/delete -d id=53
```

## Resources
- [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
- [Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
- [Serving Web Content with Spring MVC](https://spring.io/guides/gs/serving-web-content/)
- [Accessing Data with JPA](https://spring.io/guides/gs/accessing-data-jpa/)
- [Accessing data with MySQL](https://spring.io/guides/gs/accessing-data-mysql/)
- [Accessing JPA Data with REST](https://spring.io/guides/gs/accessing-data-rest/)
