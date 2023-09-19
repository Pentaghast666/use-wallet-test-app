import React from 'react'
import { AppContext } from '../modules/store';

export const usePrices = () => {
  const { state, dispatch } = React.useContext(AppContext);
  // const walletContext = React.useContext(WalletContext);

  return React.useMemo(() => {
      return [{ ...state.prices }, 
        // Method up update the price:
        (newState) => {
          dispatch({type:'PRICE_UPDATE', payload:{...newState}})
        }
      ];
  }, [state]);
};