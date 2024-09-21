import { FastifyInstance, FastifyPluginCallback, FastifyRequest } from 'fastify';
import PythWebSocketService from '../../pyth/PythWebsocketService.js';

const PriceFeedRoutes = async (fastify: FastifyInstance) => {
    const pythWebSocket = PythWebSocketService();

    fastify.get('/ws', { websocket: true }, (connection: any, req: FastifyRequest) => {
        try {
            console.log('Client connected to WebSocket');

            pythWebSocket.addSubscriber(connection);

            connection.on('message', (message: string) => {
                console.log('Received message:', message);
            });

            connection.on('error', (error: Error) => {
                console.error('WebSocket error:', error);
            });

            connection.on('close', () => {
                try {
                    pythWebSocket.removeSubscriber(connection);
                    console.log('Client disconnected from WebSocket');
                } catch (error) {
                    console.error('Error removing subscriber:', error);
                }
            });
        } catch (error) {
            console.error('Error in WebSocket connection:', error);
        }
    });
};
export default PriceFeedRoutes;
