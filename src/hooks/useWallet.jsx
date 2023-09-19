/* eslint-disable react/prop-types */
import React from 'react'
import { PeraWalletConnect } from '@perawallet/connect'
// import WalletConnect from '@walletconnect/client'
// import {WalletConnect} from '../components/WalletProvider'



// type walletData = {
//   address: string | null;
//   connected: boolean;
//   connectWallet: () => void,
//   disconnectWallet: () => void,
//   wallet: any
// } | null;

// export type WalletContextData = {
//   walletData: walletData;
// } | null;

const PeraWallet = new PeraWalletConnect()

const WalletContext = React.createContext(null)

export const useWalletContext = () => {
  const walletContext = React.useContext(WalletContext);
  return React.useMemo(() => {
      return { ...walletContext?.walletData };
  }, [walletContext]);
};

export const useAddress = () => {
  const { address } = useWalletContext();
  return address;
};


export const WalletProvider = ({children}) => {
  const [ accountAddress, setAccountAddress ] = React.useState(null)
  // const isConnectedToPeraWallet = accountAddress != null

  React.useEffect(() => {
    // Re-connect an older Pera wallet session:
    // Reconnect to the session when the component is mounted
    PeraWallet.reconnectSession().then((accounts) => {
        // Setup the disconnect event listener
        PeraWallet.connector?.on('disconnect', handleDisconnectWalletClick)

        if (PeraWallet.isConnected && accounts.length) {
          console.log('Setting account Address')
          setAccountAddress(accounts[0])
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])


  const handleConnectWalletClick = () => {
    console.log('handleConnectWalletClick called')

    PeraWallet
      .connect()
      .then((newAccounts) => {
        // Setup the disconnect event listener
        PeraWallet.connector?.on('disconnect', handleDisconnectWalletClick)

        setAccountAddress(newAccounts[0])
        // setUiState(UI_STATES.HOME)
      })
      .catch((err) => {
        console.log('handleConnectWalletClick Catch', err)
      })
    // .reject((error) => {
    //   // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
    //   // For the async/await syntax you MUST use try/catch
    //   if (error?.data?.type !== 'CONNECT_MODAL_CLOSED') {
    //     // log the necessary errors
    //   }
    // });
  }

  const handleDisconnectWalletClick = () => {
    console.log('handleDisconnectWalletClick called')

    PeraWallet.disconnect()
    setAccountAddress(null)
  }

  const walletData = {
    address: accountAddress,
    connected: accountAddress != null,
    connectWallet: handleConnectWalletClick,
    disconnectWallet: handleDisconnectWalletClick,
    wallet: PeraWallet,
  }

  return (
    <WalletContext.Provider value={{ walletData }}>
      {children}
    </WalletContext.Provider>
  )
}
