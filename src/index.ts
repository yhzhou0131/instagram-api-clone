import { port } from '@/config/index.js';
import httpServer from './app.js';
import connectDB from './db/index.js';

const main = async () => {
  try {
    console.log('Connecting to mongodb.');
    await connectDB();
    console.log('Connected to mongodb.');

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: port }, resolve)
    );
    console.log(`🚀 Server ready at http://localhost:${port}/`);
  } catch {
    console.error('Cannot run the server.');
  }
};

main();
