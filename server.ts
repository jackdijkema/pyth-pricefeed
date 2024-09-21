import fastify from 'fastify';
import PriceFeedRoutes from './src/routes/feed.routes.js';
import websocketPlugin from '@fastify/websocket';

const server = fastify({ logger: true });

server.register(websocketPlugin);

server.register(PriceFeedRoutes);

server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
