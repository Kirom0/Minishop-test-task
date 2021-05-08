import React from 'react';
import {Link} from '@reach/router';
import styles from './Header.module.scss';
import HeaderCart from '../HeaderCart';
const Header : React.FC = () => {
  return (
    <header className={styles.container}>
      <nav className={styles.nav}>
        <Link to="/"><h1 className={styles.shoptitle}>Titon-Electronic-Shop</h1></Link>
        <Link to="cart"><HeaderCart/></Link>
      </nav>
    </header>
  )
}

export default Header;