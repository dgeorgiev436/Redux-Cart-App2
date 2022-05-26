import classes from './CartButton.module.css';
import {useDispatch, useSelector} from "react-redux"
import {uiActions} from "../../store/ui-slice"

const CartButton = (props) => {
	const totalQuantity = useSelector(state => state.cart.totalQuantity)
	const dispatch = useDispatch()
	
	const showCartHandler = () => {
		dispatch(uiActions.cartToggle())
	}
	
  return (  
    <button onClick={showCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
