import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import {useSelector} from "react-redux"

const Cart = (props) => {
	const items = useSelector(state => state.cart.items)
	
	const context = items.map(item => {
		return <CartItem key={item.id}
	item={{ title: item.title, quantity: item.quantity, totalPrice: item.totalPrice, price: item.price, id: item.id }}
	/>
	})
	
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
       	{context}
      </ul>
    </Card>
  );
};

export default Cart;
