import React from 'react';
import { RouteComponentProps } from '@reach/router';
import PreviewPurchases from '../../components/PreviewPurchases';
import PaymentCard from '../../components/PaymentCard';

const CartPage : React.FC<RouteComponentProps> = () => {
  const BankCardData = React.useRef(()=>{});
  const onBuy = () => {
    BankCardData.current();
  };
  return (
    <>
      <PaymentCard
        getCardData={(data) => {BankCardData.current = data}}
      />
      <PreviewPurchases onBuy={onBuy}/>
    </>
  );
}

export default CartPage;