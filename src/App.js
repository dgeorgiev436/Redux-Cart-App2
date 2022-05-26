import {useEffect, Fragment} from "react"
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector, useDispatch} from "react-redux"
import {sendCartData, fetchCartData} from "./store/cart-slice"
import Notification from "./components/UI/Notifications"

let isInitial = true

function App() {
	const notification = useSelector(state => state.ui.notification)
	const dispatch = useDispatch()
	const isCartShown = useSelector(state => state.ui.cartIsShown)
	const cart = useSelector(state => state.cart)
	
// 	FETCH
	useEffect(() => {
		dispatch(fetchCartData())
		
	},[dispatch])
	
	
// 	SEND
	useEffect(() => {
		
		if(isInitial){
			isInitial = false;
			return
			
		}
		if(cart.changed){
			dispatch(sendCartData(cart))
		}
		
		
	}, [cart, dispatch])
	
	
	
	
  return (
	<Fragment>
		{notification && <Notification state={notification.state} title={notification.state} message={notification.message}></Notification> }
		<Layout>
			  {isCartShown && <Cart /> }
		  <Products />
		</Layout>
	</Fragment>
  );
}

export default App;
