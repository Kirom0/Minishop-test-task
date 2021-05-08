import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../state';
import { ICartState } from '../../state/cart/state';
import styles from './HeaderCart.module.scss';

const HeaderCart : React.FC = () => {
  const cart = useSelector<AppState, ICartState>(state => state.cart);
  const amount = React.useMemo(() =>
    cart.reduce(
      (sum, cur) => sum + cur.product.price * cur.count,
      0
    ), [cart]
  );
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <img className={styles.img} src='img/shopping-cart.svg'/>
        <div className={styles.count}>{cart.length ? cart.length : ''}</div>
        {cart.length > 0 && <span className={styles.amount}>{`${amount.toFixed(2)}$`}</span>}
      </div>
    </div>
  );
}

export default HeaderCart;