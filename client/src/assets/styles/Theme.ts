import { css } from 'styled-components';

const light = {
  bg100: '#F7F7F7',
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#EAE7FF',
  gray100: '#EAE7FF',
  gray200: '#EAE4EB',
  gray300: '#D6D5DE',
  gray400: '#BAB9C6',
  gray500: '#A4A3AE',
  gray600: '#72717D',
  gray700: '#525D69',
  gray800: '#3F3E49',
  gray900: '#121214',
  red: '#ff7b7b',
  orange: '#ffa16c',
  yellow: '#faeb69',
  green: '#60d29b',
  blue: '#5484ff',
  pink: '#ff85dd',
  primary50: '#eae7ff',
  primary100: '#c2b9ff',
  primary300: '#8875ff',
  primary500: '#6e57ff',
  primary700: '#543de8',
  primary800: '#442fcb',
  primary900: '#2c18a8',
};

const dark = {
  ...light,
  bg100: '#1C1C1C',
  gray50: '#121214',
  gray100: '#202027',
  gray200: '#2c2c34',
  gray300: '#42424a',
  gray400: '#84838d',
  gray500: '#9897A1',
  gray600: '#b5b5bd',
  gray700: '#c8c8d3',
  gray800: '#dadae5',
  gray900: '#f9f9fd',
  red: '#ce4c4c',
  orange: '#dc7f4a',
  yellow: '#esd332',
  green: '#239c62',
  blue: '#2155dc',
  pink: '#dd48b3',
  primary50: '#25148f',
  primary100: '#3a28ad',
  primary300: '#4734c5',
  primary500: '#5e4ad9',
  primary700: '#7463d9',
  primary800: '#B8B0EA',
  primary900: '#E4E1F5',
};

const typography = {
  headline1: css`
    font-size: 96px;
    font-weight: 300;
    line-height: 112px;
  `,
  headline2: css`
    font-size: 96px;
    font-weight: 300;
    line-height: 72px;
  `,
  headline3: css`
    font-size: 48px;
    font-weight: 400;
    line-height: 56px;
  `,
  headline4: css`
    font-size: 34px;
    font-weight: 400;
    line-height: 42px;
  `,
  headline5: css`
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
  `,
  headline6: css`
    font-size: 20px;
    font-weight: 500;
    line-height: 32px;
  `,
  subtitle1: css`
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
  `,
  subtitle2: css`
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
  `,
  body1: css`
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  `,
  body2: css`
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  `,
  button: css`
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
  `,
  caption1: css`
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  `,
  caption2: css`
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  `,
  overline: css`
    font-size: 12px;
    font-weight: 400;
    line-height: 32px;
  `,
};

const Color = {
  dark,
  light,
};

const Theme = (theme: 'dark' | 'light') => {
  return {
    color: Color[theme],
    typography,
  };
};

export default Theme;
