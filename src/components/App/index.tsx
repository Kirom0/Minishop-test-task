import React from 'react';
import {Router} from '@reach/router';
import Header from '../Header';
import CartPage from '../../pages/CartPage';
import ShopPage from '../../pages/ShopPage';
import styles from './App.module.scss';


const App : React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Header/>
        <Router>
          <ShopPage path='/'/>
          <CartPage path='cart'/>
        </Router>
      </div>
    </>
  )
}

export default App;