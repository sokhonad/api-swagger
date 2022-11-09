const express=require('express');
const app=express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const annonceRouter = require('./routes/annonce');

const { resolvers } = require("./resolvers");
const { typeDefs } = require("./typeDefs");


const  swaggerjsDoc  =  require ( 'swagger-jsdoc' ) ; 
const  swaggerUi  =  require ( 'swagger-ui-express' ) ; 

const { ApolloServer, gql } =require("apollo-server-express");
const {
	ApolloServerPluginLandingPageGraphQLPlayground
  }  =require("apollo-server-core");

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



  const startServer = async () => {
	const server = new ApolloServer({
	  typeDefs,
	  resolvers,
	  plugins: [
		ApolloServerPluginLandingPageGraphQLPlayground(),
	  ],
	});
	await server.start();
	server.applyMiddleware({ app });
  
	await mongoose.connect("mongodb://localhost/grapqlcat", {
	  useNewUrlParser: true
	});
  
	app.listen({ port: 3000 }, () =>
	  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
	);
  };
  
  startServer();