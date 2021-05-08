import React from 'react';
import styles from './ProductCounter.module.scss';

interface ProductCounterProps {
  decreaseCount: () => void;
  increaseCount: () => void;
  count: number;
}

const ProductCounter : React.FC<ProductCounterProps> = ({count, decreaseCount, increaseCount}) => {
  return (
    <>
      <button className={styles.smallbutton} onClick={decreaseCount}>-</button>
      <span className={styles.count}>{count}</span>
      <button className={styles.smallbutton} onClick={increaseCount}>+</button>
    </>
  )
}

export default ProductCounter;