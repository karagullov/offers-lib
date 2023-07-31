// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/rpc-xdc-mainnet",
    createProxyMiddleware({
      target: "https://rpc.xinfin.network",
      changeOrigin: true,
    })
  );
  app.use(
    "/rpc-xdc-testnet",
    createProxyMiddleware({
      target: "https://erpc.apothem.network",
      changeOrigin: true,
    })
  );

  app.use(
    "/rpc-bsc-mainnet",
    createProxyMiddleware({
      target: "https://bsc-dataseed1.binance.org",
      changeOrigin: true,
    })
  );
  app.use(
    "/rpc-bsc-testnet",
    createProxyMiddleware({
      target: "https://data-seed-prebsc-1-s1.binance.org:8545",
      changeOrigin: true,
    })
  );
  app.use(
    "/rpc-polygon-testnet",
    createProxyMiddleware({
      target:
        "https://polygon-mumbai.g.alchemy.com/v2/mMrgoqqLUV77lZJ25jhA2KVm6xxVDUG4",
      changeOrigin: true,
    })
  );

  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://149.28.41.132",
      // target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
