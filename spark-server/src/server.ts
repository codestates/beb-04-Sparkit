import express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { sequelize } from "./models";
import "reflect-metadata";
import { resolvers, typeDefs } from "./graphql/schema";
import Web3 from "web3";
export const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
import dotenv from "dotenv";
dotenv.config();

const SPARK_IT_SERVER_PORT = 4000;
const app = express();
// app.use((req, res) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
// });
const httpServer = http.createServer(app);
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// const corsOptions = {
//   origin: ["http://localhost:3000", "https://studio.apollographql.com"],
//   credentials: true,
// };

async function initApolloServer() {
  await apolloServer.start();
  // apollo serverμ express μ°λ
  apolloServer.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: SPARK_IT_SERVER_PORT }, resolve)
  );
  console.log(
    `π Server ready at http://localhost:${SPARK_IT_SERVER_PORT}${apolloServer.graphqlPath}`
  );
  //DB μ±ν¬
  await sequelize
    .sync({ force: false }) // force:true λ‘ λ³κ²½μ μλ² μ¬μμ ν  λλ§λ€ νμ΄λΈ μ­μ 
    .then(() => {
      console.log("seq connection success");
    })
    .catch((e: Error) => {
      console.log("seq ERROR: ", e);
    });
}

void initApolloServer();
