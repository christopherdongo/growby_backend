import restify from "restify";
import { readFileSync } from "fs";
import path from "path";
import { ApolloServer, HeaderMap } from "@apollo/server";
import { resolvers } from "./graphql/resolvers";
import { prisma } from "./db/client";

export async function createServer() {
  const server = restify.createServer();

  // Middlewares de Restify
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser({ mapParams: false }));

  // Schema GraphQL
  const typeDefs = readFileSync(
    path.join(__dirname, "graphql", "schema.graphql"),
    "utf8"
  );

  // Apollo Server
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apollo.start();

  // Ruta GraphQL
  server.post("/graphql", async (req, res) => {
    const headerMap = new HeaderMap();
    for (const [key, value] of Object.entries(req.headers)) {
      if (typeof value === "string") {
        headerMap.set(key, value);
      } else if (Array.isArray(value)) {
        headerMap.set(key, value.join(","));
      }
    }

    const httpGraphQLResponse = await apollo.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        method: req.method || "POST",
        headers: headerMap,
        body: req.body,
        search: req.getQuery() || "",
      },
      context: async () => ({ prisma }),
    });

    if (httpGraphQLResponse.body.kind === "complete") {

  res.header("content-type", "application/json");
  res.send(httpGraphQLResponse.body.string);
    }

  });

  // Ruta de healthcheck
  server.get("/status", (_req, res, next) => {
    res.send({ status: "ok" });
    return next();
  });

  return server;
}
