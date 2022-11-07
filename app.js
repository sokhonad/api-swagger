const express=require('express');
const app=express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const annonceRouter = require('./routes/annonce');

const annonceController = require('./controllers/annonce.controllers.js');

const  swaggerjsDoc  =  require ( 'swagger-jsdoc' ) ; 
const  swaggerUi  =  require ( 'swagger-ui-express' ) ; 
// const  nanoid  = require('nanoid');

const swaggerOptions={
	definition: {
		openapi: "3.0.0",
		info: {
		  title: "REST API Docs",
		  version: "1.1"
		},
		components: {
		  securitySchemas: {
			bearerAuth: {
			  type: "http",
			  scheme: "bearer",
			  bearerFormat: "JWT",
			},
		  },
		},
		security: [
		  {
			bearerAuth: [],
		  },
		],
	  },
	  apis: ["./routes/annonce.js"],
	};

app.use(annonceRouter);
app.use(bodyParser.urlencoded({
  extended: true
}));
// configure the app to use bodyParser()
app.use(bodyParser.json());
const swaggerDoc=swaggerjsDoc(swaggerOptions);
console.log(swaggerDoc);

app.use("/api",swaggerUi.serve,swaggerUi.setup(swaggerDoc));




mongoose.connect('mongodb://localhost/weptp1');
app.listen(3000,()=>console.log("le sever tourner sur port 3000"));