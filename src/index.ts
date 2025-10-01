import { createServer } from "./server";
import dotenv from "dotenv";

dotenv.config();

async function start() {
  try {
    const server = await createServer();

    const port = process.env.PORT ? Number(process.env.PORT) : 4000;

    server.listen(port, () => {
      console.log(`✅ Server running at http://localhost:${port}`);
      console.log(`🚀 GraphQL endpoint at http://localhost:${port}/graphql`);
    });
  } catch (err) {
    console.error("❌ Error starting server:", err);
    process.exit(1);
  }
}

start();
