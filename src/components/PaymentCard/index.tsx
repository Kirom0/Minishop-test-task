import React from 'react';
import { useFormik } from 'formik';
import styles from './PaymentCard.module.scss';
import {
  validate,
  integrateWhitespacesToCardNumber,
  removeWhitespaces,
  testOnlyDigits,
  testOnlyLettersWithDots
} from './utils';
import { BankCard } from './BankCard';

export interface CardFields {
  cardNumber: string;
  cardName: string;
  cardMonth: string;
  cardYear: string;
  cardCvv: string;
}

interface PaymentCardProps {
  getCardData: (data: any) => void;
}

const PaymentCard : React.FC<PaymentCardProps> = ({getCardData}) => {
  const formik = useFormik<CardFields>({
    initialValues: {
      cardNumber: '',
      cardName: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
    },
    validate,
    onSubmit: values => {
      alert('Success' + JSON.stringify(values, null, 2));
    }
  });

  React.useEffect(() => getCardData(formik.submitForm), []);

  const cardNumberChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = removeWhitespaces(e.target.value);
    if (testOnlyDigits(value) && value.length <= 16) {
      e.target.value = integrateWhitespacesToCardNumber(value);
      formik.handleChange(e);
    }
  }
  const cardNameChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (testOnlyLettersWithDots(value) && value.length <= 20) {
      e.target.value = value.toUpperCase();
      formik.handleChange(e);
    }
  }
  const cardMonthYearChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (testOnlyDigits(value) && value.length <= 2) {
      formik.handleChange(e);
    }
  }
  const cardCvvChangeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (testOnlyDigits(value) && value.length <= 3) {
      formik.handleChange(e);
    }
  }
  
  return (
    <section className={styles.container}>
      <div>
        <BankCard number={formik.values.cardNumber} name={formik.values.cardName} month={formik.values.cardMonth} year={formik.values.cardYear}/>
        <div className={styles.fields}>
          <div className={styles.inputline}>
            <label
              className={formik.touched.cardNumber && formik.errors.cardNumber ? styles.invalid : ''}
              htmlFor='cardNumber'>Card Number</label>
            <input
              className={styles.cardNumber}
              type="text" id="cardNumber" name="cardNumber" autoComplete="off"
              onChange={cardNumberChangeHandler}
              onBlur={formik.handleBlur}
              value={formik.values.cardNumber}
            />
          </div>
          <div className={styles.inputline}>
            <label
              className={formik.touched.cardName && formik.errors.cardName ? styles.invalid : ''}
              htmlFor='cardName'>Card Holder</label>
            <input
              className={styles.cardName}
              style={{textTransform: 'uppercase'}}
              type="text" id="cardName" name="cardName" autoComplete="off"
              onChange={cardNameChangeHandler}
              onBlur={formik.handleBlur}
              value={formik.values.cardName}
            />
          </div>
          <div className={styles.inputflexline}>
            <div className={styles.expires}>
              <label
                className={(formik.touched.cardMonth || formik.touched.cardYear) && (formik.errors.cardMonth || formik.errors.cardYear) ? styles.invalid : ''}
                htmlFor='cardYear'>Expires</label>
              <input
                className={styles.cardMonth}
                type="text" id="cardMonth" name="cardMonth" autoComplete="off"
                placeholder="MM"
                onChange={cardMonthYearChangeHandler}
                onBlur={formik.handleBlur}
                value={formik.values.cardMonth}
              />&nbsp;/&nbsp;
              <input
                className={styles.cardYear}
                type="text" id="cardYear" name="cardYear" autoComplete="off"
                placeholder="YY"
                onChange={cardMonthYearChangeHandler}
                onBlur={formik.handleBlur}
                value={formik.values.cardYear}
              />
            </div>
            
            <div className={styles.cvv}>
              <label
                className={formik.touched.cardCvv && formik.errors.cardCvv ? styles.invalid : ''}
                htmlFor='cardCvv'>CVV</label>
              <input
                className={styles.cardCvv}
                type="text" id="cardCvv" name="cardCvv" autoComplete="off"
                onChange={cardCvvChangeHandler}
                onBlur={formik.handleBlur}
                value={formik.values.cardCvv}
              />
            </div>

            <input type="submit" hidden/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PaymentCard;