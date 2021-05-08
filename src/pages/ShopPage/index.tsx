import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Product } from '../../interfaces/Product';
import ProductCard from '../../components/ProductCard';
import styles from './ShopPage.module.scss';
import Loader from '../../components/Loader';
import { useSelector } from 'react-redux';
import { AppState } from '../../state';
import { ICartState } from '../../state/cart/state';

const fetchProduts = async () => {
  const products : Product[] = [
    {
      id: '1',
      name: 'Item #1',
      price: 12.44,
      imgUrl: 'https://wod-public-images.s3.us-east-2.amazonaws.com/6_f3524870-58b3-4b82-a92d-34b1e8b62b3d.jpg',
    }, {
      id: '2',
      name: 'Item #2',
      price: 44.09,
      imgUrl: 'https://wod-public-images.s3.us-east-2.amazonaws.com/6_e74451b7-875e-474a-8dbf-1b736a95f1a0.jpg',
    }, {
      id: '3',
      name: 'Item #3',
      price: 6,
      imgUrl: 'https://wod-public-images.s3.us-east-2.amazonaws.com/6_fa367a6a-7f6b-4581-ba1f-2d2255b515ff.jpg',
    }, {
      id: '4',
      name: 'Item #4',
      price: 9.89,
      imgUrl: 'https://wod-public-images.s3.us-east-2.amazonaws.com/6_2acb2229-37c2-4203-b696-6bef07796110.jpg',
    }, {
      id: '5',
      name: 'Item #5',
      price: 1000,
      imgUrl: 'https://wod-public-images.s3.us-east-2.amazonaws.com/6_ddfbead6-124f-42ce-bfd2-6443bf72c664.jpg',
    }, {
      id: '6',
      name: 'Item #6',
      price: 243.15,
      imgUrl: 'https://wod-public-images.s3.us-east-2.amazonaws.com/6_9552b1a6-ad8c-4285-8a68-a8ff4d1f7be3.jpg',
    }
  ];
  return new Promise<Product[]>((resolve) => {
    setTimeout(() => resolve(products), 1000);
  });
}

const ShopPage : React.FC<RouteComponentProps> = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const cartProducts = useSelector<AppState, ICartState>(state => state.cart);
  React.useEffect(() => {
    fetchProduts().then(products => setProducts(products));
  }
  , []);
  return (
    <section className={styles.container}>
      {
        products.length === 0 ?
        <Loader centered={true}/> : (
          <ul>
            <div className={styles.productgrid}>
              {products.map((product) =>
                <li key={product.id}>
                  {
                    cartProducts.some(cp => cp.product.id === product.id) ?
                    <ProductCard
                      product={product}
                      count={cartProducts.reduce((res, cur) => cur.product.id === product.id ? cur.count : res, 0)}
                    /> :
                    <ProductCard product={product}/>
                  }
                </li>)}
            </div>
          </ul>
        )
      }
    </section>
  ); 
}

export default ShopPage;