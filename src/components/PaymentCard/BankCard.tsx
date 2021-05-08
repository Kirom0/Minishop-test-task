import React from 'react';
import CardInfo from 'card-info';
import styles from './PaymentCard.module.scss';
import { getCardNumberMaskedLine, isColorLight, removeWhitespaces } from './utils';
import clsx from 'clsx';

interface BankCardProps {
  name: string;
  number: string;
  month: string;
  year: string;
}

const brands = {
  '2': './img/brands-logos/mir-colored.svg',
  '4': './img/brands-logos/visa-colored.svg',
  '5': './img/brands-logos/master-card-colored.svg',
}

export const BankCard : React.FC<BankCardProps> = ({name, number, month, year}) => {
  const cardInfo = React.useMemo(() => new CardInfo(removeWhitespaces(number), {
    banksLogosPath: './img/banks-logos/',
    brandsLogosPath: './img/brands-logos/',
    brandLogoPolicy: 'colored',
  }), [number.slice(0, 7)]);
  
  const brandLogo = brands[number[0]] || '/img/credit-card.svg';
  return (
    <div className={styles.card} style={{backgroundColor: cardInfo.backgroundColor, color: isColorLight(cardInfo.backgroundColor) ? 'black' : 'white'}}>
      {
        cardInfo.bankName ? (
          <div className={clsx(styles.card_logo, styles.two)}>
            <img className={styles.card_logo__img} src={cardInfo.bankLogo} alt="Bank Logo" />
            <img className={styles.card_logo__img} src={cardInfo.brandLogo} alt="Brand Logo"/>
          </div>
        ) :
        (
          <div className={clsx(styles.card_logo, styles.one)}>
            <img className={styles.card_logo__img} src={brandLogo} alt="Credit Card"/>
          </div>
        )
      }
      
      <div className={styles.card_numberline}>
        <span className={styles.card_numberline__number}>{getCardNumberMaskedLine(number)}</span>
      </div>
      <div className={styles.card_footer}>
        <div>
          <div className={styles.card_footer__title}>Card Holder</div>
          <div className={styles.card_footer__value}>{name ? name : 'NAME LASTNAME'}</div>
        </div>
        <div>
          <div className={styles.card_footer__title}>Expires</div>
          <div className={styles.card_footer__value}>{month ? month : 'MM'}&nbsp;/&nbsp;{year ? year : 'YY'}</div>
        </div>
      </div>
    </div>
  )
}