
# xlx-vue-common-http-api

Sorry for my poor english~

## Why this project
axios is very powerful tools 
but there are some trouble i met when i use axios in my projec:
- i can not write axios('/path/to/server',data) everywhere， all apis should be placed on a right folder
- i dont know how to handle pathvariable parameters
- no config handler define
- no response handler define
- no error handler define
- ...

so, i try to extend axios in this project

### Axios Related files

#### /src/axios/AxiosConfig
axios config, offical documnet, For future reference

### Api Related files



#### /src/api/ApiConfig
the offical recommandation like this: 
```js
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```
problem：
- there are some differences between axios base config and axios.defaults
solution：
- abandon the offical recommandation, uniform config format
- redefine base url
- define packet for path/query/body
- define config handler
- define response handler
- define error handler

#### /src/api/Api
help people generate uniform api


#### /src/api/ApiRequest
just 4 things i want to do in this file
- invoke config handlers
- invoke axios
- invoke reponse handlers
- invoke error handlers


#### /src/handler
define 3 types handlers
- config handlers
- reponse handlers
- error handlers

#### /src/helper
some methods


#### /src/service

example for using this library


### How to use





