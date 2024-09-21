import connection from './connection.js';

let subscribers = new Set<WebSocket>();

export const PythWebSocketService = () => {
    const priceIds: string[] = [
        '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43', // BTC/USD price id
        '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace', // ETH/USD price id
    ];

    connection.subscribePriceFeedUpdates(priceIds, (priceFeed): void => {
        subscribers.forEach((subscriber) => {
            try {
                const priceData = priceFeed.getPriceNoOlderThan(60);
                subscriber.send(JSON.stringify(priceFeed));
            } catch (error) {
                console.error('Failed to send message to subscriber:', error);
            }
        });
    });

    const addSubscriber = (subscriber: WebSocket): void => {
        subscribers.add(subscriber);
    };

    const removeSubscriber = (subscriber: WebSocket): void => {
        subscribers.delete(subscriber);
    };

    return { addSubscriber, removeSubscriber };
};

export default PythWebSocketService;
