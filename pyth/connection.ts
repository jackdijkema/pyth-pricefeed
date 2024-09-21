import { PriceServiceConnection } from '@pythnetwork/price-service-client';

const PYTH_NETWORK_URL = 'https://hermes.pyth.network';

const connection = new PriceServiceConnection(PYTH_NETWORK_URL);

export default connection;
