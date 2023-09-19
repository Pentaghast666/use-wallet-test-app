/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
// Step 2: Create a ContextWrapper component that has to be the parent of every consumer.

import React from 'react';
import { useStorageReducer } from 'react-storage-hooks';

const initialState = { 
	cart:[],
	prices: {}
}

// export const AppContext = React.createContext(initialState);
export const AppContext = React.createContext(null);

export const ContextWrapper = (props) => {
	// const [ test, setTest ] = React.useState([])

	// const [ store, setStore ] = React.useState({
	// 	todos: ["Make the bed", "Take out the trash"],
	// 	items: []
	// });
	

	const [state, dispatch, writeError ] = useStorageReducer(
    localStorage,
    'cart-state',
    (state, action) => {
			let newState = state;
		
      switch (action.type) {
        case "CHANGE_COLOR":{
					newState = { ...state, color: action.payload };
					break;
				}
				
				case "ADD_CART_ITEM":{
					newState = { ...state, cart: state.cart.concat(action.payload) };
					break;
				}
				
				case "INC_CART_ITEM_QTY":{
					const newQty = (action.payload.pQty || 1) + 1;
					let cart = structuredClone(state.cart);

					cart = cart.map(item => ({...item, pQty: item.id==action.payload.id ? newQty : item.pQty || 1}))

					newState = { ...state, cart };
					break;
				}

				case "DEC_CART_ITEM_QTY":{
					const newQty = (action.payload.pQty || 1) - 1;

					// If less than 1 then no change:
					if (newQty < 1)
						return state

					let cart = structuredClone(state.cart);

					cart = cart.map(item => ({...item, pQty: item.id==action.payload.id ? newQty : item.pQty || 1}))

					newState = { ...state, cart };
					break;
				}

				case "DEL_CART_ITEM":{
					const newCart = state.cart.filter(item => item.id != action.payload.id)
					newState = { ...state, cart:newCart };
					break;
				}

				case "CLEAR_CART":{
					newState = { ...state, cart:[] };
					break;
				}


				/// *** PRICES UPDATE *** \\\
				case "PRICE_UPDATE":{
					newState = { ...state, prices:{...state.prices, ...action.payload} };
					break;
				}

        default:
          throw new Error();
			}
			// saveCartState(newState)
			return newState;
		},
		initialState
  );

	if (writeError)
		console.log('writeError', writeError)

	// const [cartState, saveCartState] = useStorageState("cart-state", initialState);

	// const [state, dispatch] = React.useReducer((state, action) => {
	// 	let newState = state;

  //   switch (action.type) {
  //     case "CHANGE_COLOR":
  //       newState = { ...state, color: action.payload };
	// 			break;
	// 		case "ADD_CART_ITEM":
	// 			newState =  { ...state, cart: state.cart.concat(action.payload) };
	// 			break;
  //     default:
  //       throw new Error();
  //   }
	// 	saveCartState(newState)
	// 	return newState;
  // }, cartState);


	// WORKING BEFORE SAVING STATE TO localStorage:
	// const [state, dispatch] = React.useReducer((state, action) => {
  //   switch (action.type) {
  //     case "CHANGE_COLOR":
  //       return { ...state, color: action.payload };
	// 		case "ADD_CART_ITEM":
	// 			return { ...state, cart: state.cart.concat(action.payload) };
  //     default:
  //       throw new Error();
  //   }
  // }, initialState);


	// NOT WORKING:
	// const [ actions ] = React.useState({
	// 	addTask: title => setStore({ ...store, todos: store.todos.concat(title) }),
	// 	addItem: item => {
	// 		console.log(store, item)
	// 		//setStore({ ...store, items: [...store.items, item] })
	// 		console.log('TEST', test)
	// 		setTest(test.concat(item))
	// 	},
	// });
	
	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{props.children}
		</AppContext.Provider>
	);
}