const { password } = require('pg/lib/defaults')

const swaggerAutogen = require('swagger-autogen')()
const doc = {
  info: {
      version: "1.0.0",
      title: "Tour API",
      description: "Documentation de <b>Back-End</b>."
  },
  host: "",
  basePath: "/",
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
   {
          "name": "User",
          "description": "Endpoints"
      },
     
  ],
  securityDefinitions: {
      api_key: {
          type: "apiKey",
          name: "api_key",
          in: "header"
      },
      petstore_auth: {
          type: "oauth2",
          authorizationUrl: "https://petstore.swagger.io/oauth/authorize",
          flow: "implicit",
          scopes: {
              read_pets: "read your pets",
              write_pets: "modify pets in your account"
          }
      }
  },
  definitions: {
    /*   User: {
                  $name: "Jhon Doe",
        $identificacion: "V-20000000",
        $email: "emailito@mail.com",
        phone:"+584141403794",
        address:"Av.Venezuela #3",
        password:"12345667890",
        image:"",
        status:true, 
        legal_name:"",
        commercial_name:"",
        front_page:"",
        opening_hours:"",
        token_access:"",
        rol:1
      },
      AddUser: {
          $name: "Jhon Doe",
          $age: 29,
          about: ""
      }, */
      User: {
        $name: "Jhon Doe",
$identificacion: "V-20000000",
$email: "emailito@mail.com",
phone:"+584141403794",
address:"Av.Venezuela #3",
password:"12345667890",
image:"",
status:true, 
legal_name:"",
commercial_name:"",
front_page:"",
opening_hours:"",
token_access:"",
rol:1
},
      AddUser: {
        $name: "Jhon Doe",
        $identificacion: "V-20000000",
        $email: "emailito@mail.com",
        phone:"+584141403794",
        address:"Av.Venezuela #3",
        password:"12345667890",
        image:"",
        status:true, 
        legal_name:"",
        commercial_name:"",
        front_page:"",
        opening_hours:"",
        token_access:"",
        rol:1,
        account_type:"",
        code_recovery:""
    },
      Login: {
        $email: "emailito@mail.com",
        $password: "Password"     
      },
      LoginSocial: {
        $email: "emailito@mail.com"             
      },
      CodeVerify: {
        $email: "emailito@mail.com",
        $code: "1234"            
      }



  }
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./users/routes.js']

swaggerAutogen(outputFile, endpointsFiles,doc)