 import {createSlice} from "@reduxjs/toolkit"
import {uiActions} from "./ui-slice"

const initialState = {
	totalQuantity: 0,
	items: [],
	changed: false
}

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action) {
			const newItem = action
			state.totalQuantity++
			state.changed = true;
			const existingItem = state.items.find(item => newItem.payload.id === item.id)
				if(!existingItem){
					state.items.push({
						title: newItem.payload.title,
						price: newItem.payload.price,
						quantity: 1,
						description: newItem.payload.description,
						id: newItem.payload.id,
						totalPrice: newItem.payload.price
					})
				}else{
					existingItem.quantity++
					existingItem.totalPrice = existingItem.price * existingItem.quantity
				}
		},
		removeItem(state, action){
			state.totalQuantity--;
			state.changed = true;
			const id = action.payload
			const foundItem = state.items.find(item => item.id === id)
			if(foundItem.quantity > 1){
				foundItem.quantity--;
				foundItem.totalPrice = foundItem.price * foundItem.quantity;
			}else{
				const newArray = state.items.filter(item => item.id !== foundItem.id)
				state.items = [...newArray]
			}
		},
		replaceCart(state,action) {
			state.totalQuantity = action.payload.totalQuantity
			state.items = action.payload.items
		}
	}
})


export const sendCartData = (cart) => {
	return async (dispatch) => {
		dispatch(uiActions.showNotification({
			status: "Pending",
			title: "Sending",
			message: "Sending data. Please wait."
		}))
		
		const sendData = async() => {
			const response = await fetch("https://practicefoodapp-default-rtdb.firebaseio.com/basket.json", {
				method: "PUT",
				body: JSON.stringify({totalQuantity: cart.totalQuantity, items: cart.items})
			})
			
			if(!response.ok){
				throw new Error("Something went wrong")
			}
		}
		
		try{
			await sendData()
			dispatch(uiActions.showNotification({
				status: "Success",
				title: "Data sent",
				message: "Succesfully sent the data to the database"
			}))
		}catch(err){
			dispatch(uiActions.showNotification({
				status: "Error",
				title: "sent failed",
				message: "Something went wrong while trying to send data"
			}))
		}
	}
}

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async() => {
			dispatch(uiActions.showNotification({
				status: "Pending",
				title: "Sending",
				message: "Sending data. Please wait."
			}))
			
			const response = await fetch("https://practicefoodapp-default-rtdb.firebaseio.com/basket.json");
			
			if(!response.ok){
				throw new Error("Something went wrong");
			}
			
			const data = response.json();
			
			return data;
			
		}
		
		try{
			const data = await fetchData();
			
			dispatch(cartActions.replaceCart(
				{
					totalQuantity: data.totalQuantity,
					items: data.items || []
				}
			))
			
			dispatch(uiActions.showNotification({
				status: "Success",
				title: "Data sent",
				message: "Succesfully sent the data to the database"
			}))
		}catch(err){
			dispatch(uiActions.showNotification({
				status: "Error",
				title: "sent failed",
				message: "Something went wrong while trying to send data"
			}))
		}
	}
}




export const cartActions = cartSlice.actions;
export default cartSlice.reducer