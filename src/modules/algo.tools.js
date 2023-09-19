import algosdk from 'algosdk';
import { network } from '../constants.json'

// AlgoNode testnet:
// const token = '';
// const server = 'https://testnet-api.algonode.network/';
// const port = 443;

// const indexerToken = '';
// const indexerServer = 'https://testnet-idx.algonode.cloud';
// const indexerPort = 443;

// Mainnet:
// const token = '';
// const server = 'https://mainnet-api.algonode.cloud';
// const port = 443;
// const indexerToken = '';
// const indexerServer = '	https://mainnet-idx.algonode.cloud';
// const indexerPort = 443;

// Algo Clients:
const algodClient = new algosdk.Algodv2(network.node.token, network.node.server, network.node.port);
const indexerClient = new algosdk.Indexer(network.indexer.token, network.indexer.server, network.indexer.port);


export {
  algodClient,
  indexerClient
}