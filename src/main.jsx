import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App2.jsx'
import './index.css'
import { ContextWrapper } from './modules/store';

import { WalletProvider } from './hooks/useWallet'

import { Buffer } from 'buffer'
window.Buffer = Buffer

// GraphQl stuff:
import { ApolloProvider, ApolloClient, InMemoryCache, gql } from "@apollo/client";

const graphQlClient = new ApolloClient({
  // uri: 'http://localhost:3100/graphql',
  uri: '/graphql',
  cache: new InMemoryCache()
});



// graphQlClient
//   .query({
//     query: gql`
//     query Orders {
//       orders {
//           id
//           account
//       }
//       order(hash: "TXHASH2") {
//           id
//           account
//       }
//     }
//     `,
//   })
//   .then((result) => console.log('GRAPHQL CLIENT RESULT', result));


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextWrapper>
      <WalletProvider>
        <ApolloProvider client={graphQlClient}>
          <App />
        </ApolloProvider>
      </WalletProvider>
    </ContextWrapper>
  </React.StrictMode>,
)
