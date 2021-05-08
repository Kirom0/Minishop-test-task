import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../interfaces/Product';
import { AppState } from '../../state';
import { setAction } from '../../state/cart/actions';
import { ICartState } from '../../state/cart/state';
import ProductCounter from '../ProductCounter';
import styles from './PreviewPurchases.module.scss';

interface PreviewPurchasesProps {
  onBuy: () => void;
}

const PreviewPurchases : React.FC<PreviewPurchasesProps> = ({onBuy}) => {
  const cartProducts = useSelector<AppState, ICartState>(state => state.cart);
  const dispatch = useDispatch();

  const getIncreaseCountHandler = (index) => () =>
    dispatch(setAction({
      product: cartProducts[index].product,
      count: cartProducts[index].count + 1
    }));
  
  const getDecreaseCountHandler = (index) => () => {
    if (cartProducts[index].count === 1) {
      const decision = confirm(`Do you want to delete "${cartProducts[index].product.name}" from your cart?`);
      if (!decision) return;
    }
    dispatch(setAction({
      product: cartProducts[index].product,
      count: cartProducts[index].count - 1
    }));
  }

  const amount = React.useMemo(() =>
    cartProducts.reduce(
      (sum, cur) => sum + cur.product.price * cur.count,
      0
    ), [cartProducts]
  );
  
  
  return (
    <>
      <section className={styles.container}>
        {
          cartProducts.length === 0 ?
          <span>You don't have any product in your cart yet.</span> :
          <>
            <ul>
            {
              cartProducts.map((cartProduct, index) =>
                <li key={cartProduct.product.id}>
                  <Item
                    product={cartProduct.product}
                    count={cartProduct.count}
                    increaseCount={getIncreaseCountHandler(index)}
                    decreaseCount={getDecreaseCountHandler(index)}
                  />
                </li>
              )
            }
            </ul>
            <div className={styles.footer}>
              <div className={styles.sum}>{`SUM: ${amount.toFixed(2)}$`}</div>
              <button className={styles.button} onClick={onBuy}>BUY</button>
            </div>
          </>
        }
      </section>


    </>
  )
}

interface ItemProps {
  decreaseCount: () => void;
  increaseCount: () => void;
  count: number;
  product: Product;
}

const Item : React.FC<ItemProps> = React.memo(({product, count, decreaseCount, increaseCount}) => {
  return (
    <div className={styles.item}>
      <div className={styles.item_name}>{product.name}</div>
      <div className={styles.item_count}>
        <ProductCounter
          count={count}
          increaseCount={increaseCount}
          decreaseCount={decreaseCount}
        />
      </div>
      <div className={styles.item_price}>{`${(product.price * count).toFixed(2)}$`}</div>
    </div>
  )
});

export default PreviewPurchases;