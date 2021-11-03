import isProd from "./isProd";

// TODO: remove hard coding
export const OPENSEA_URL = isProd
  ? "https://opensea.io/assets/matic/"
  : "https://testnets.opensea.io/assets/mumbai/";

export const GM_CAM_CONTRACT_ADDRESS = isProd
  ? ""
  : "0x1D07cCef68E10eE4D48687CAb7B96e16F7a2cc8f";

export const FORWARDER_CONTRACT_ADDRESS = isProd
  ? ""
  : "0x2982263a9756006F45957082cADD1499E31eDde8";

export const RPC_PROVIDER = isProd
  ? ""
  : "https://polygon-mumbai.infura.io/v3/31cab49b254143188fc112a0c332ad86";

export const L1_RPC_PROVIDER = isProd
  ? ""
  : "https://mainnet.infura.io/v3/31cab49b254143188fc112a0c332ad86";

export const GRAPH_URL = isProd
  ? "https://api.thegraph.com/subgraphs/name/internetcamera/gm-cam"
  : "https://api.thegraph.com/subgraphs/name/internetcamera/gm-cam";

export const IPFS_URL: string = "https://ipfs.internet.camera";
export const FORWARDER_URL: string = "https://tx.internet.camera/api/forward";
