import CardInfo from 'card-info';
import { CardFields } from './index';

export const testOnlyDigits = (value: string) => /^\d*$/i.test(value);
export const testOnlyLettersWithDots = (value: string) => /^[a-z]*[a-z\s.]*$/i.test(value);
export const removeWhitespaces = (value: string) => value.replace(/[\s]/gi, '');
export const fixBankLogoPath = (value) => value.replace(/.*banks-logos/i, '/img/banks-logos');
export const fixBrandLogoPath = (value) => value.replace(/.*brands-logos/i, '/img/brands-logos').replace(/white/i, 'colored');


export function getCardNumberMaskedLine(number: string) {
  const _default = '#### #### #### ####';
  let res = '';
  for (let i = 0; i < _default.length; i++) {
    if (i < number.length)
      res += number[i];
    else
      res += _default[i];
  }
  return res;
}

export function integrateWhitespacesToCardNumber(number: string) {
  let res = '';
  for (let i = 0; i < number.length; i++) {
    if ((i + 1) % 4 === 0) {
      res += number[i] + ' ';
    } else {
      res += number[i]
    }
  }
  return res.trim();
}

export const validate = (values : CardFields) => {
  const errors = {} as Record<keyof CardFields, any>;

  const clearNumber = removeWhitespaces(values.cardNumber);
  if (!values.cardNumber) {
    errors.cardNumber = 'Required';
  } else if (!/^[0-9]{16}$/i.test(clearNumber)) {
    errors.cardNumber = 'The card number must consist of only 16 digits';
  } else if (!new CardInfo(clearNumber).bankName){
    errors.cardNumber = 'The card does not belong to any bank';
  }

  if (!values.cardName) {
    errors.cardName = 'Required';
  } else if (!/^[a-z]/i.test(values.cardName)) {
    errors.cardName = 'The card holder name must begin with letter';
  } else if (!/^[a-z]+[a-z\s.]+$/i.test(values.cardName)) {
    errors.cardName = 'Only the "a-z", " ", "." characters allowed';
  }

  let month = Number.parseInt(values.cardMonth);
  let year = Number.parseInt(values.cardYear);

  if (!values.cardMonth) {
    errors.cardMonth = 'Required';
  } else if (!/^[0-9]{2}$/i.test(values.cardMonth)) {
    errors.cardMonth = 'The card expires month must consist of only 2 digits';
  } else if (month === 0 || month > 12) {
    errors.cardMonth = 'Incorrect cardMonth value';
  }

  if (!values.cardYear) {
    errors.cardYear = 'Required';
  } else if (!/^[0-9]{2}$/i.test(values.cardYear)) {
    errors.cardYear = 'The card expires year must consist of only 2 digits';
  }

  year = year + Math.floor(month / 12);
  month = (month % 12) + 1;

  if (new Date(`${month}.01.${year}`) < new Date()) {
    errors.cardYear = 'The card has expired';
  }

  if (!values.cardCvv) {
    errors.cardCvv = 'Required';
  } else if (!/^[0-9]{3}$/i.test(values.cardCvv)) {
    errors.cardCvv = 'The CVV code must consist of only 3 digits';
  }

  return errors;
};

export function isColorLight(hexColor: string) {
  const red = Number.parseInt(hexColor.slice(1, 3), 16);
  const green = Number.parseInt(hexColor.slice(3, 5), 16);
  const blue = Number.parseInt(hexColor.slice(5, 6), 16);

  return 1 - ((0.299 * red + 0.587 * green + 0.114 * blue) / 255) < 0.5; // Магическая формула со Stack Overflow
}