import React from 'react'
// import ProdList from './components/ProdList'
// import ProdDetail from './components/ProdDetail'
// import data from './constants/data.json'
import axios from 'axios'
// import { AppContext } from './modules/cart';
import './App.css'

import { network } from './constants.json'
console.log('NETWORK', network)

// Routes:
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });

const routes = [];
for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.jsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  // console.log(normalizedPathName, pages[path])

  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader,
    action: pages[path]?.action,
    ErrorBoundary: pages[path]?.ErrorBoundary,
  });
}

// console.log('ROUTES', routes)

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);


// Global state-store:
// import { createState } from 'state-pool';
// const algoUsdPriceState = createState(0);
// import {store, useGlobalState} from 'state-pool';
// store.setState("algoUsdPrice", 0);

import { usePrices } from './hooks/usePrices'


// Multi-wallet stuff:
import { WalletProvider, useInitializeProviders, PROVIDER_ID } from '@txnlab/use-wallet'
import { DeflyWalletConnect } from '@blockshake/defly-connect'
import { PeraWalletConnect } from '@perawallet/connect'
import { DaffiWalletConnect } from '@daffiwallet/connect'



const App = () => {
  // console.log('useGlobalState', algoUsdPriceState)

  // multi-wallet:
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
      { id: PROVIDER_ID.EXODUS }
    ],
    nodeConfig: {
      network: 'testnet',
      nodeServer: network.node.server,// 'https://testnet-api.algonode.cloud',
      nodeToken: '',
      nodePort: network.node.port // '443'
    },
    debug: true
  })

  // const [ algoUsdPrice, setAlgoUsdPrice ] = React.useState(0)
  // const [ algoUsdPrice, setAlgoUsdPrice ] = useGlobalState("algoUsdPrice");
  // const [ algoUsdPrice, setAlgoUsdPrice ] = algoUsdPriceState.useState();

  const [ count, setCount ] = React.useState(0);
  const countRef = React.useRef(count);
  countRef.current = count;

  const [ prices, setPrices ] = usePrices();

  React.useEffect(() => {
    // Set up the algo price loader:
    //Implementing the setInterval method
    const interval = setInterval(() => {
      // console.log('blah')
      // setCount(countRef.current+1)
      // console.log(count)
      getAlgoPrice()
      // setAlgoUsdPrice()
    }, 60000);

    getAlgoPrice();

    //Clearing the interval
    return () => clearInterval(interval);

  }, [])

  // React.useEffect(() => {
  //   console.log(count)
  // }, [count])

  // Algorand USD price:
  const getAlgoPrice = async () => {
    const priceData = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=algorand&vs_currencies=usd')
    .then(resp => resp.data)

    // console.log('Algo PRICE:', priceData.algorand.usd)
    // setAlgoUsdPrice(priceData.algorand.usd)
    setPrices({algousd:priceData.algorand.usd})      
    
  }


  return (
    <WalletProvider value={providers}>
      <RouterProvider router={router} />
    </WalletProvider>
  )
};

export default App;

// function App() {


//   return (
//     <div>
//       blah
//     </div>
    
//   )
// }

// export default App
