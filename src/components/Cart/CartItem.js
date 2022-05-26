import classes from './CartItem.module.css';
import {useDispatch} from "react-redux"
import {cartActions} from "../../store/cart-slice"

const CartItem = (props) => {
	const dispatch = useDispatch();
  const { title, quantity, totalPrice, price, id } = props.item;
	
	const addProductHandler = () => {
		dispatch(cartActions.addItem({title, quantity, totalPrice, price, id}))
	}

	const removeProductHandler = () => {
		dispatch(cartActions.removeItem(id))
	}
	
  return (
	  <li key={Math.random()} className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeProductHandler}>-</button>
          <button onClick={addProductHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
