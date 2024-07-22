FrontEnd - (MiddleEnd) - BackEnd

- we need an intermediate layer between the client side and the microservices
- Using this Middle End, when client sends request we will be able to make decision that which microservice should actually respond to this request.
- we can do message validation, response transformation, rate limiting, 
- we try to prepare an API Gateway that acts as this middle end. 