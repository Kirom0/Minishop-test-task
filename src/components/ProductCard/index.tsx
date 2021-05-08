import React from "react";
import { useDispatch } from "react-redux";
import { Product } from "../../interfaces/Product";
import { setAction } from "../../state/cart/actions";
import ProductCounter from "../ProductCounter";
import styles from "./ProductCard.module.scss";

interface ProductCardProps {
  product?: Product;
  count?: number;
}

const ProductCard : React.FC<ProductCardProps> = ({product, count = 0}) => {
  const decreaseCount = React.useCallback(() => {
    console.log('decreaseCount');
    const newCount = count - 1;
    if (product) dispatch(setAction({ product, count: newCount }));
  }, [count]);

  const increaseCount = React.useCallback(() => {
    console.log('increaseCount');
    const newCount = count < 0 ? 1 : count + 1;
    if (product) dispatch(setAction({ product, count: newCount }));
  }, [count]);

  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={styles.cardimg}>
        <img
          className={styles.img}
          src={product ? product.imgUrl : "https://wod-public-images.s3.us-east-2.amazonaws.com/6_403cfc46-d356-49a8-83cd-3b1555b34976.jpg"}
          alt={product.name}
        />
      </div>
      
      <div className={styles.cardbody}>
        <h3 className={styles.name}>{product ? product.name : 'PRODUCT NAME' }</h3>
        <span className={styles.price}>{`${product ? product.price : 16.79}$`}</span>
        <div className={styles.button_content}>
          {count <= 0 ?
            <button className={styles.addbutton} onClick={increaseCount}>ADD TO CARD</button> :
            <ProductCounter count={count} increaseCount={increaseCount} decreaseCount={decreaseCount}/>
          }
        </div>
      </div>
    </div>
  );
}

export default ProductCard;